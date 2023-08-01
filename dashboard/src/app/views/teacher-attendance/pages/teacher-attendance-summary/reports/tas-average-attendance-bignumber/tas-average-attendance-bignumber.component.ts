import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonService } from 'src/app/core/services/common/common.service';
import { RbacService } from 'src/app/core/services/rbac-service.service';
import { WrapperService } from 'src/app/core/services/wrapper.service';
import { buildQuery, parseRbacFilter, parseTimeSeriesQuery } from 'src/app/utilities/QueryBuilder';
import { config } from '../../../../config/teacher_attendance_config';
import { TeacherAttendanceSummaryComponent } from '../../teacher-attendance-summary.component';
import { ReportDrilldownService } from 'src/app/core/services/report-drilldown/report-drilldown.service';
import { BarchartBenchmarkService } from 'src/app/core/services/barchart-benchmark/barchart-benchmark.service';

@Component({
  selector: 'app-tas-average-attendance-bignumber',
  templateUrl: './tas-average-attendance-bignumber.component.html',
  styleUrls: ['./tas-average-attendance-bignumber.component.scss']
})
export class TasAverageAttendanceBignumberComponent implements OnInit, OnDestroy {

  reportName: string = 'tas_average_attendance_bignumber';
  filters: any = [];
  levels: any;
  tableReportData: any;
  bigNumberReportData: any = {
    reportName: "Average % Teachers Present"
  };
  currentReportName: string = "Average % Teachers Present";
  minDate: any;
  maxDate: any;
  compareDateRange: any = 30;
  filterIndex: any;
  rbacDetails: any;
  title = 'Attendance Summary %';
  @Input() startDate: any;
  @Input() endDate: any;
  drillDownSubscription: any;
  drillDownLevel: any;


  constructor(private readonly _commonService: CommonService,
    private csv: TeacherAttendanceSummaryComponent, 
    private readonly _wrapperService: WrapperService, 
    private _rbacService: RbacService, 
    private readonly _reportDrilldownService: ReportDrilldownService,
    private readonly _benchmarkService: BarchartBenchmarkService
    ) {
    
  }
  ngOnInit(): void {
    this.drillDownSubscription = this._rbacService.getRbacDetails().subscribe((rbacDetails: any) => {
      this.rbacDetails = rbacDetails;
    })
    this._reportDrilldownService.drilldownData.subscribe(data => {
      if(data && data?.linkedReports?.includes(this.reportName) && data.hierarchyLevel) {
        this.drillDownLevel = data.hierarchyLevel
        this.drilldownData(data);
      }
    })
    // this.getReportData();
  }

  getReportData(startDate = undefined, endDate = undefined): void {
    this.startDate = startDate;
    this.endDate = endDate;
    let reportConfig = config
    let { timeSeriesQueries, queries, levels, label, defaultLevel, filters, options } = reportConfig[this.reportName];
    let onLoadQuery;
    if (this.rbacDetails?.role) {
      filters.every((filter: any) => {
        if (Number(this.rbacDetails?.role) === Number(filter.hierarchyLevel)) {
          timeSeriesQueries = { ...filter?.timeSeriesQueries }
          Object.keys(timeSeriesQueries).forEach((key) => {
            timeSeriesQueries[key] = this.parseRbacFilter(timeSeriesQueries[key])
          });
          return false
        }
        return true
      })
    }

    Object.keys(timeSeriesQueries).forEach((key: any) => {
      if (key.toLowerCase().includes('comparison')) {
        let endDate = new Date();
        let days = endDate.getDate() - this.compareDateRange;
        let startDate = new Date();
        startDate.setDate(days)
        onLoadQuery = parseTimeSeriesQuery(timeSeriesQueries[key], startDate.toISOString().split('T')[0], endDate.toISOString().split('T')[0])
      }
      else if (this.startDate !== undefined && this.endDate !== undefined && Object.keys(timeSeriesQueries).length > 0) {
        onLoadQuery = parseTimeSeriesQuery(timeSeriesQueries[key], this.startDate, this.endDate)
      }
      else {
        onLoadQuery = queries[key]
      }
      let query = buildQuery(onLoadQuery, defaultLevel, this.levels, this.filters, this.startDate, this.endDate, key, this.compareDateRange);

      if (query && key === 'bigNumber') {
        this.getBigNumberReportData(query, options, 'averagePercentage');
      }
      else if (query && key === 'bigNumberComparison') {
        this.getBigNumberReportData(query, options, 'differencePercentage')
      }
    })
  }

  parseRbacFilter(query: string) {
    let newQuery = query;

    let startIndex = newQuery?.indexOf('{');
    let endIndex = newQuery?.indexOf('}');

    while (startIndex > -1 && endIndex > -1) {
      if (newQuery && startIndex > -1) {
        let propertyName = newQuery.substring(startIndex + 1, endIndex);
        let re = new RegExp(`{${propertyName}}`, "g");
   
        Object.keys(this.rbacDetails).forEach((key: any) => {
          if (propertyName === key + '_id') {
            newQuery = newQuery.replace(re, '\'' + this.rbacDetails[key] + '\'');
          }
        });
      }
      startIndex = newQuery?.indexOf('{');
      endIndex = newQuery?.indexOf('}');
    }
    return newQuery
  }

  async getBigNumberReportData(query: string, options: any, indicator: string): Promise<void> {
    let { bigNumber } = options ?? {};
    let { valueSuffix, property } = bigNumber ?? {};
  
    if (indicator === 'averagePercentage') {
      this.bigNumberReportData = {
        ...this.bigNumberReportData,
        valueSuffix: valueSuffix,
        
      }
      await this._commonService.getReportDataNew(query).subscribe((res: any) => {
     
        if (res) {
          let rows = res;
          this.bigNumberReportData = {
            ...this.bigNumberReportData,
            averagePercentage: rows[0]?.[property]
          }
          let benchmarkValues;
          this._benchmarkService.getValues().subscribe((obj: any) => {
            let level = this.drillDownLevel ? this.drillDownLevel : this.rbacDetails.role
            if(obj && Object.keys(obj).includes(this.reportName) && rows[0]?.[property]) {
              benchmarkValues = {
                ...obj,
                [this.reportName]: {
                  ...obj[this.reportName],
                  [level]: rows[0]?.[property]
                }
              }
            }
            else if (obj && rows[0]?.[property]){
              benchmarkValues = {
                ...obj,
                [this.reportName]: {
                  [level]: rows[0]?.[property]
                }
              }
            }
            else if(rows[0]?.[property]) {
              benchmarkValues = {
                [this.reportName]: {
                  [level]: rows[0]?.[property]
                }
              }
            }
          })
          if(benchmarkValues) {
            this._benchmarkService.emit(benchmarkValues)
          }
          
        }
      })
    }
    else if (indicator === 'differencePercentage') {
      await this._commonService.getReportDataNew(query).subscribe((res: any) => {
        if (res) {
          let rows = res;
          this.bigNumberReportData = {
            ...this.bigNumberReportData,
            differencePercentage: rows[0]?.[property]
          }
        }
      })
    }
    
  }

  async drilldownData(event: any) {
   
    let { hierarchyLevel, id } = event ?? {}
    let drillDownDetails;

    switch (Number(hierarchyLevel)) {
      case 1:
        drillDownDetails = {
          ...this.rbacDetails,
          state: id
        }
        this.bigNumberReportData={...this.bigNumberReportData,
          reportName:this.currentReportName
        
        }
        break;
      case 2:
        drillDownDetails = {
          ...this.rbacDetails,
          district: id
        }
        this.bigNumberReportData={...this.bigNumberReportData,
          reportName:this.currentReportName+ ` for ${event?.district_name || event[event.district]} District`
        
        }
        break;
      case 3:
        drillDownDetails = {
          ...this.rbacDetails,
          block: id
        }
        this.bigNumberReportData={...this.bigNumberReportData,
          reportName:this.currentReportName+ ` for ${event?.block_name || event[event.block]} Block`
        
        }
        break;
      case 4:
        drillDownDetails = {
          ...this.rbacDetails,
          cluster: id
        }
        this.bigNumberReportData={...this.bigNumberReportData,
          reportName:this.currentReportName+ ` for ${event?.cluster_name || event[event.cluster]} Cluster`
        
        }
        break;

    }
    

    let reportConfig = config;

    let { timeSeriesQueries, queries, levels,label, defaultLevel, filters, options } = reportConfig[this.reportName];
    let onLoadQuery;
    if (this.rbacDetails?.role) {
      filters.every((filter: any) => {
        if (Number(hierarchyLevel) === Number(filter.hierarchyLevel)) {
          queries = {...filter?.actions?.queries}
          timeSeriesQueries = {...filter?.timeSeriesQueries}
          Object.keys(queries).forEach((key) => {
            queries[key] = parseRbacFilter(queries[key], drillDownDetails)
            timeSeriesQueries[key] = parseRbacFilter(timeSeriesQueries[key], drillDownDetails)
          });
          return false
        }
        return true
      })
    } else {
      this._wrapperService.constructFilters(this.filters, filters);
    }

    Object.keys(queries).forEach((key: any) => {
      if (this.startDate !== undefined && this.endDate !== undefined && Object.keys(timeSeriesQueries).length > 0) {
        onLoadQuery = parseTimeSeriesQuery(timeSeriesQueries[key], this.startDate, this.endDate)
      }
      else {
        onLoadQuery = queries[key]
      }
      let query = buildQuery(onLoadQuery, defaultLevel, this.levels, this.filters, this.startDate, this.endDate, key, undefined);

      if (query && key === 'bigNumber') {
        this.getBigNumberReportData(query, options, 'averagePercentage');
      }
    });
  }

  ngOnDestroy(): void {
    this.drillDownSubscription.unsubscribe()
  }

}
