import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonService } from 'src/app/core/services/common/common.service';
import { DataService } from 'src/app/core/services/data.service';
import { RbacService } from 'src/app/core/services/rbac-service.service';
import { WrapperService } from 'src/app/core/services/wrapper.service';
import { buildQuery, parseFilterToQuery, parseRbacFilter, parseTimeSeriesQuery } from 'src/app/utilities/QueryBuilder';
import { config } from '../../../../config/student_assessments';

@Component({
  selector: 'app-map-view-student-assessment',
  templateUrl: './map-view-student-assessment.component.html',
  styleUrls: ['./map-view-student-assessment.component.scss']
})
export class MapViewStudentAssessmentComponent implements OnInit {

  reportName: string = 'map_view_of_student_assessments';
  filters: any = [];
  levels: any;
  reportData: any = {
    reportName: "Map View of Student Assessments "
  };
  title: string = 'Map View of Student Assessments '
  selectedYear: any;
  selectedMonth: any;
  startDate: any;
  endDate: any;
  config: any;
  compareDateRange: any = 30;
  filterIndex: any;
  rbacDetails: any;
  drillDownLevel: any;
  drillDown: any;
  filterValues: any;

  @Output() exportReportData = new EventEmitter<any>();

  constructor(private readonly _dataService: DataService, private readonly _wrapperService: WrapperService, private _rbacService: RbacService) {
    this._rbacService.getRbacDetails().subscribe((rbacDetails: any) => {
      this.rbacDetails = rbacDetails;
    })
  }

  ngOnInit(): void {
  }

  async drilldownData(event: any) {
    this.drillDown = true
    let { level, id } = event ?? {}
    let drillDownDetails;

    switch (Number(level)) {
      case 1:
        drillDownDetails = {
          ...this.rbacDetails,
          role: Number(this.rbacDetails.role) + 1,
          district: id
        }
        break;
      case 2:
        drillDownDetails = {
          ...this.rbacDetails,
          role: Number(this.rbacDetails.role) + 1,
          block: id
        }
        break;
      case 3:
        drillDownDetails = {
          ...this.rbacDetails,
          role: Number(this.rbacDetails.role) + 1,
          cluster: id
        }
        break;
    }

    let reportConfig = config
    let { timeSeriesQueries, queries, levels, defaultLevel, filters, options } = reportConfig[this.reportName];
    filters.every((filter: any) => {
      if ((Number(level) + 1) === Number(filter.hierarchyLevel)) {
        queries = { ...filter?.actions?.queries }
        queries['map'] = parseRbacFilter(queries['map'], drillDownDetails)
        return false
      }
      return true
    })
    let drillDownQuery = queries['map'];
    if (this.filterValues?.length > 0) {
      this.filterValues.filter((filter: any) => {
        return filter.filterType !== 'metric'
      })

      this.filterValues.forEach((filterParams: any) => {
        drillDownQuery = parseFilterToQuery(drillDownQuery, filterParams)
      });
    }
    this.reportData = await this._dataService.getMapReportData(drillDownQuery, options, undefined)
    if (this.reportData?.data?.length > 0) {
      let reportsData = { reportData: this.reportData.data, reportType: 'map', reportName: this.title }
      this.exportReportData.emit(reportsData)
    }
    this.drillDownLevel = level + 1
  }

  getReportData(values: any): void {
    this.drillDownLevel = undefined;
    let { filterValues, timeSeriesValues } = values ?? {};
    this.filterValues = [...filterValues]
    this.startDate = timeSeriesValues?.startDate;
    this.endDate = timeSeriesValues?.endDate;
    let reportConfig = config

    let { timeSeriesQueries, queries, levels, defaultLevel, filters, options } = reportConfig[this.reportName];
    let onLoadQuery;
    let currentLevel;

    if (this.rbacDetails?.role !== null && this.rbacDetails.role !== undefined) {
      filters.every((filter: any) => {
        if (Number(this.rbacDetails?.role) === Number(filter.hierarchyLevel)) {
          queries = { ...filter?.actions?.queries }
          currentLevel = filter?.actions?.level;
          this.reportData = {
            ...this.reportData,
            reportName: `% ${currentLevel[0].toUpperCase() + currentLevel.substring(1)}s which conducted meeting`
          }
          Object.keys(queries).forEach((key) => {
            queries[key] = parseRbacFilter(queries[key], this.rbacDetails)
          });
          return false
        }
        return true
      })
    }

    Object.keys(queries).forEach(async (key: any) => {
      if (key.toLowerCase().includes('comparison')) {
        let endDate = new Date();
        let days = endDate.getDate() - this.compareDateRange;
        let startDate = new Date();
        startDate.setDate(days)
        onLoadQuery = parseTimeSeriesQuery(queries[key], startDate.toISOString().split('T')[0], endDate.toISOString().split('T')[0])
      }
      else {
        onLoadQuery = queries[key]
      }
      let query = buildQuery(onLoadQuery, defaultLevel, this.levels, this.filters, this.startDate, this.endDate, key, this.compareDateRange);

      let metricFilter = [...filterValues].filter((filter: any) => {
        return filter.filterType === 'metric'
      })

      filterValues = [...filterValues].filter((filter: any) => {
        return filter.filterType !== 'metric'
      })

      filterValues.forEach((filterParams: any) => {
        query = parseFilterToQuery(query, filterParams)
      });

      if (query && key === 'table') {
        this.reportData = await this._dataService.getTableReportData(query, options);
        if (this.reportData?.data?.length > 0) {
          let reportsData = { reportData: this.reportData.data, reportType: 'table', reportName: this.title }
          this.exportReportData.emit(reportsData)
        }
      }
      else if (query && key === 'bigNumber') {
        this.reportData = await this._dataService.getBigNumberReportData(query, options, 'averagePercentage', this.reportData);
      }
      else if (query && key === 'bigNumberComparison') {
        this.reportData = await this._dataService.getBigNumberReportData(query, options, 'differencePercentage', this.reportData);
      }
      else if (query && key === 'barChart') {
        let { reportData, config } = await this._dataService.getBarChartReportData(query, options, filters, defaultLevel);
        this.reportData = reportData
        this.config = config;
        if (this.reportData?.values?.length > 0) {
          let reportsData = { reportData: this.reportData.values, reportType: 'dashletBar', reportName: this.title }
          this.exportReportData.emit(reportsData)
        }
      }
      else if (query && key === 'map') {
        this.reportData = await this._dataService.getMapReportData(query, options, metricFilter)
        if (this.reportData?.data?.length > 0) {

          let reportsData = { reportData: this.reportData.data, reportType: 'map', reportName: this.title }
          this.exportReportData.emit(reportsData)
        }
      }
    })
  }

}
