import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import moment from 'moment';
import { CommonService } from 'src/app/core/services/common/common.service';
import { DataService } from 'src/app/core/services/data.service';
import { RbacService } from 'src/app/core/services/rbac-service.service';
import { ReportDrilldownService } from 'src/app/core/services/report-drilldown/report-drilldown.service';
import { WrapperService } from 'src/app/core/services/wrapper.service';
import { buildQuery, parseFilterToQuery, parseRbacFilter, parseTimeSeriesQuery } from 'src/app/utilities/QueryBuilder';
import { config } from 'src/app/views/teacher-attendance/config/teacher_attendance_config';

@Component({
  selector: 'app-teacher-attendance-map',
  templateUrl: './teacher-attendance-map.component.html',
  styleUrls: ['./teacher-attendance-map.component.scss']
})
export class TeacherAttendanceMapComponent implements OnInit, OnDestroy {
  reportName: string = 'tas_average_attendance_map';
  filters: any = [];
  levels: any;
  reportData: any = {
    reportName: "Teacher Attendance Map"
  };
  title: string = 'Teacher Attendance Map'
  selectedYear: any;
  selectedMonth: any;
  startDate: any;
  endDate: any;
  config: any;
  compareDateRange: any = 7;
  filterIndex: any;
  rbacDetails: any;
  drillDownLevel: any;
  drillDown: any;
  bigNumberReports: any = {};
  maxDate: any;
  minDate: any;
  reportsData: any[] = []
  //added for full school report download
  // title = "Download School Report"
  schoolReportsData: any[] = [];
  pagereportName = "teachers_present"
  defaultSelectedDays: any = 7;
  drillDownSubscription: any

  //


  @Output() exportReportData = new EventEmitter<any>();

  constructor(private readonly _dataService: DataService,
    private readonly _wrapperService: WrapperService,
    private _rbacService: RbacService,
    private readonly _commonService: CommonService,
    private readonly _drillDownService: ReportDrilldownService
  ) {
    this._rbacService.getRbacDetails().subscribe((rbacDetails: any) => {
      this.rbacDetails = rbacDetails;
    })
  }

  ngOnInit(): void {
    this.drillDownSubscription = this._drillDownService.drilldownData.subscribe((data) => {
      if(data && data !== 'reset') {
        this.drilldownData({
          ...data
        })
      }
    })
  }

  async drilldownData(details: any) {
    this.drillDown = true
    let { hierarchyLevel, id } = details ?? {}
    let drillDownDetails;

    switch (Number(hierarchyLevel)) {
      case 2:
        drillDownDetails = {
          ...this.rbacDetails,
          role: Number(this.rbacDetails.role) + 1,
          district: id
        }
        break;
      case 3:
        drillDownDetails = {
          ...this.rbacDetails,
          role: Number(this.rbacDetails.role) + 1,
          block: id
        }
        break;
      case 4:
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
      if ((Number(hierarchyLevel)) === Number(filter.hierarchyLevel)) {
        queries = { ...filter?.timeSeriesQueries }
        queries['map'] = parseRbacFilter(queries['map'], drillDownDetails)
        return false
      }
      return true
    })
    let drillDownQuery;
    if (this.startDate === undefined && this.endDate === undefined) {
      let endDate = new Date();
      let days = endDate.getDate() - this.compareDateRange;
      let startDate = new Date();
      startDate.setDate(days)
      drillDownQuery = parseTimeSeriesQuery(queries['map'], startDate.toISOString().split('T')[0], endDate.toISOString().split('T')[0])
    }
    else {
      drillDownQuery = parseTimeSeriesQuery(queries['map'], this.startDate, this.endDate)
    }
    this.reportData = await this._dataService.getMapReportData(drillDownQuery, options, undefined)
    if (this.reportData?.data?.length > 0) {
      let reportsData = { reportData: this.reportData.data, reportType: 'map', reportName: this.title }
      this.exportReportData.emit(reportsData)
    }
    this.drillDownLevel = hierarchyLevel
  }

  getReportData(values: any): void {
    this.drillDownLevel = undefined;
    let { filterValues, timeSeriesValues } = values ?? { filterValues: [], timeSeriesValues: [] };
    if (filterValues === undefined) {
      filterValues = []
    }
    this.startDate = timeSeriesValues?.startDate;
    this.endDate = timeSeriesValues?.endDate;
    let reportConfig = config

    let { timeSeriesQueries, queries, levels, defaultLevel, filters, options } = reportConfig[this.reportName];
    let onLoadQuery;
    let currentLevel;

    if (this.rbacDetails?.role) {
      filters.every((filter: any) => {
        if (Number(this.rbacDetails?.role) === Number(filter.hierarchyLevel)) {
          queries = { ...filter?.timeSeriesQueries }
          console.log(queries)
          Object.keys(queries).forEach((key) => {
            queries[key] = parseRbacFilter(queries[key], this.rbacDetails)
          });
          return false
        }
        return true
      })
    }

    Object.keys(queries).forEach(async (key: any) => {
      if (this.startDate === undefined && this.endDate === undefined) {
        let endDate = new Date();
        let days = endDate.getDate() - this.compareDateRange;
        let startDate = new Date();
        startDate.setDate(days)
        onLoadQuery = parseTimeSeriesQuery(queries[key], startDate.toISOString().split('T')[0], endDate.toISOString().split('T')[0])
      }
      else if (this.startDate !== undefined && this.endDate !== undefined) {
        onLoadQuery = parseTimeSeriesQuery(queries[key], this.startDate, this.endDate)
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

  getSchoolReportData() {
    let query = `select    school_id,    school_name,    round((sum(criteria_met) * 100) / count(school_id)) as percent_school_met_criteria  FROM    (      select        water.academicyear_id as academicyear_id,        water.school_id as school_id,        water.sum as has_water,        toilet.sum as has_toilet,        library.sum as has_library,        handwash.sum as has_handwash,        solar_panel.sum as has_solarpanel,        playground.sum as has_playground,        case when (          water.sum :: int + toilet.sum :: int + library.sum :: int + handwash.sum :: int + solar_panel.sum :: int + playground.sum :: int        ) = 6 then 1 else 0 end as criteria_met,        school.school_name,        district_name,        district_id,        block_name,        cluster_name      from        datasets.school_infra_drinkingwater_b2jvnmboswx_bmldvwj7 as water        inner join datasets.school_infra_toilet_fmpgclnmwwbzcr5rphco as toilet on toilet.school_id = water.school_id        and toilet.academicyear_id = water.academicyear_id        inner join datasets.school_infra_library_chvsch9qvw9nex0nbw0k as library on library.school_id = water.school_id        and library.academicyear_id = water.academicyear_id        inner join datasets.school_infra_handwash_fmz7a3fty2nob28om1ga as handwash on handwash.school_id = water.school_id        and handwash.academicyear_id = water.academicyear_id        inner join datasets.school_infra_solarpanel_l2n5fmpnv2xsbhroqhwd as solar_panel on solar_panel.school_id = water.school_id        and solar_panel.academicyear_id = water.academicyear_id        inner join datasets.school_infra_playground_intsfgr8xgrsbhroqh8a as playground on playground.school_id = water.school_id        and playground.academicyear_id = water.academicyear_id        inner join dimensions.school on school.school_id = water.school_id    ) as intermediate_table where academicyear_id = '2021-2022'  group by    school_name,    school_id limit 10`;
    this._commonService.getReportDataNew(query).subscribe((res: any) => {
      let d = { reportData: res, reportType: 'map', reportName: "teacher_present_school_wise" };
      this.schoolReportsData.push(d);
    })
  }

  timeSeriesUpdated(event: any): void {
    // this.startDate = event?.startDate?.toDate().toISOString().split('T')[0]
    // this.endDate = event?.endDate?.toDate().toISOString().split('T')[0]
    this.startDate = moment(event.startDate).format('YYYY-MM-DD');
    this.endDate = moment(event.endDate).format('YYYY-MM-DD');
    if (event?.startDate !== null && event?.endDate !== null) {
      this.reportsData = []
      this.getReportData({ timeSeriesValues: { startDate: this.startDate, endDate: this.endDate } });
    }
  }
  ngOnDestroy(): void {
    this._drillDownService.emit('reset')
    this.drillDownSubscription.unsubscribe()
  }
}
