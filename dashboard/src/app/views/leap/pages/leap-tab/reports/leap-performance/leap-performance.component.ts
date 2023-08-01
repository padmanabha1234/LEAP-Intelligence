import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonService } from 'src/app/core/services/common/common.service';
import { DataService } from 'src/app/core/services/data.service';
import { RbacService } from 'src/app/core/services/rbac-service.service';
import { WrapperService } from 'src/app/core/services/wrapper.service';
import { buildQuery, parseFilterToQuery, parseRbacFilter, parseTimeSeriesQuery } from 'src/app/utilities/QueryBuilder';
import { config } from '../../../../config/leap_config';
import { LeapTabComponent } from '../../leap-tab.component';
import { OeeService } from 'src/app/core/services/oee.service';


@Component({
  selector: 'app-leap-performance',
  templateUrl: './leap-performance.component.html',
  styleUrls: ['./leap-performance.component.scss']
})
export class LeapPerformanceComponent implements OnInit {

  gaugeData:any;
  reportName: string = 'leap_performance';
  filters: any = [];
  levels: any;
  reportData: any = {
    reportName: "leap_performance"
  };
  title: string = 'Performance'
  selectedYear: any;
  selectedMonth: any;
  startDate: any;
  endDate: any;
  config: any;
  compareDateRange: any = 30;
  filterIndex: any;
  rbacDetails: any;
  description :any = 'This measures the speed at which the Work Center runs as a percentage of its designed speed. It takes into account anything that causes the manufacturing process to run at less than the maximum possible speed (when it is running), including both slow cycles and small stops. The formula for performance is: (Ideal Cycle Time / Total Pieces)';
  @Output() exportReportData = new EventEmitter<any>();

  constructor(private oeeService:OeeService,private readonly _dataService: DataService,private csv:LeapTabComponent, private readonly _wrapperService: WrapperService, private _rbacService: RbacService) {
    this._rbacService.getRbacDetails().subscribe((rbacDetails: any) => {
      this.rbacDetails = rbacDetails;

    })
  }

  ngOnInit(): void {
  }

  getReportData(values: { filterValues: any, timeSeriesValues: any }): void {
    let { filterValues, timeSeriesValues } = values ?? {};
    this.startDate = timeSeriesValues?.startDate;
    this.endDate = timeSeriesValues?.endDate;
    let reportConfig = config;
  
    let { timeSeriesQueries, queries, levels, defaultLevel, filters, options } = reportConfig[this.reportName];
    let onLoadQuery;
    let currentLevel;
  
    if (this.rbacDetails?.role) {
      filters.every((filter: any) => {
        if (Number(this.rbacDetails?.role) === Number(filter.hierarchyLevel)) {
          queries = { ...filter?.actions?.queries };
          currentLevel = filter?.actions?.level;
          this.reportData = {
            ...this.reportData,
            reportName: `% ${currentLevel[0].toUpperCase() + currentLevel.substring(1)}s which conducted meeting`
          };
          Object.keys(queries).forEach((key) => {
            queries[key] = parseRbacFilter(queries[key], this.rbacDetails);
          });
          return false;
        }
        return true;
      });
    }
  
    Object.keys(queries).forEach(async (key: any) => {
      if (key.toLowerCase().includes('comparison')) {
        let endDate = new Date();
        let days = endDate.getDate() - this.compareDateRange;
        let startDate = new Date();
        startDate.setDate(days);
        onLoadQuery = parseTimeSeriesQuery(queries[key], startDate.toISOString().split('T')[0], endDate.toISOString().split('T')[0]);
      }
      else {
        onLoadQuery = queries[key];
      }
      let query = buildQuery(onLoadQuery, defaultLevel, this.levels, this.filters, this.startDate, this.endDate, key, this.compareDateRange);
  
      filterValues.forEach((filterParams: any) => {
        query = parseFilterToQuery(query, filterParams);
      });
  
      if (query && key === 'table') {
        this.reportData = await this._dataService.getTableReportData(query, options);
        if (this.reportData?.data?.length > 0) {
          let reportsData = { reportData: this.reportData.data, reportType: 'table', reportName: this.title };
          this.exportReportData.emit(reportsData);
        }
      }
      else if (query && key === 'bigNumber') {
        let querys= await parseTimeSeriesQuery(query,this.startDate,this.endDate)
        this.reportData = await this._dataService.getBigNumberReportData(querys, options, 'averagePercentage', this.reportData);
        await this.oeeService.setperformance(this.reportData.averagePercentage);
        let gaugeData = {
          percentage: this.reportData.averagePercentage,
          options: {
            title: this.description,
          },
        };
        this.gaugeData = gaugeData;
      }
      else if (query && key === 'bigNumberComparison') {
        this.reportData = await this._dataService.getBigNumberReportData(query, options, 'differencePercentage', this.reportData);
      }
      else if (query && key === 'barChart') {
        let { reportData, config } = await this._dataService.getBarChartReportData(query, options, filters, defaultLevel);
        this.reportData = reportData;
        this.config = { ...config, options: { ...config.options, height: '200' } };
        if (this.reportData?.values?.length > 0) {
          let reportsData = { reportData: this.reportData.values, reportType: 'dashletBar', reportName: this.title };
          // this.csvDownload(reportsData);
        }
      }
    });
  }

  

}
