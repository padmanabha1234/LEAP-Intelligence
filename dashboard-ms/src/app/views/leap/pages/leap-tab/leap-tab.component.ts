import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { RbacService } from 'src/app/core/services/rbac-service.service';
import { WrapperService } from 'src/app/core/services/wrapper.service';
import { config } from '../../config/leap_config';
import { LeapAvailibilityComponent } from './reports/leap-availibility/leap-availibility.component';
import { LeapOeeComponent } from './reports/leap-oee/leap-oee.component';
import { LeapPerformanceComponent } from './reports/leap-performance/leap-performance.component';
import { QualityComponent } from './reports/quality/quality.component';
import moment from 'moment';
import { values } from 'lodash';
import { CommonService } from 'src/app/core/services/common/common.service';

@Component({
  selector: 'app-leap-tab',
  templateUrl: './leap-tab.component.html',
  styleUrls: ['./leap-tab.component.scss']
})
export class LeapTabComponent implements OnInit {
  maxDate: any;
  minDate: any;
  bigNumberReports: any = {};
  minYear: any;
  maxYear: any;
  minMonth: any;
  maxMonth: any;
  academicYear: any = [];
  months: any = [];
  filters: any;
  reportsToBeShown: any = [];
  rbacDetails: any;
  reportsData: any = [];
  startDate: any;
  endDate: any;
  defaultSelectedDays: any;
  hasTimeSeriesFilters: boolean = true;
  hasCommonFilters: boolean = true;
  flag: boolean = true;
  matLabel = 'Availability';
  @ViewChild('leapOEE') leapOEE: LeapOeeComponent;
  @ViewChild('leapAvailibilty') leapAvailibilty: LeapAvailibilityComponent;
  @ViewChild('leapPerformance') leapPerformance: LeapPerformanceComponent;
  @ViewChild('leapQuality') leapQuality: QualityComponent;
  machineStatuses = [{
    id: 'Machine1',
    shift: 'Day',
    status: true,
    message: 'High end time'
  },
  {
    id: 'Machine2',
    shift: 'Day',
    status: true,
    message: 'High end time'
  }];
  machineStatus = this.machineStatuses[0];

  constructor(private _wrapperService: WrapperService, private _rbacService: RbacService, private _commonService: CommonService) {
    this._rbacService.getRbacDetails().subscribe((rbacDetails: any) => {
      this.rbacDetails = rbacDetails;
    })
  }

  public condition1 = false;
public condition2 = false;
  async ngOnInit(): Promise<void> {
    // let query = ''
    // this._commonService.getReportDataNew(query).subscribe((data: any) => {
    //   console.log(data)
    // })
    // this.renderReports();
    // setTimeout(() => {
    //   this.flag = false;
    //   setTimeout(() => {
    //     this.condition1 = true;
    //     setTimeout(() => {
    //       this.condition1 = false;
    //       this.condition2 = true;
    //     }, 1000);
    //   }, 5000);
    // }, 2000);
    
  }

  



  async ngAfterViewInit(): Promise<void> {
    // if (this.hasCommonFilters) {
    //   this.filters = await this._wrapperService.constructCommonFilters(config.filters, this.matLabel);
    //   await this.leapAvailibilty?.getReportData({ filterValues: this.filters.map((filter) => { return { ...filter, columnName: filter.valueProp, filterType: filter.id } }), timeSeriesValues: { startDate: this.startDate, endDate: this.endDate } });
    //   await this.leapPerformance?.getReportData({ filterValues: this.filters.map((filter) => { return { ...filter, columnName: filter.valueProp, filterType: filter.id } }), timeSeriesValues: { startDate: this.startDate, endDate: this.endDate } });
    //   await this.leapQuality?.getReportData({ filterValues: this.filters.map((filter) => { return { ...filter, columnName: filter.valueProp, filterType: filter.id } }), timeSeriesValues: { startDate: this.startDate, endDate: this.endDate } });
    //   setTimeout(() => {
    //      this.leapOEE?.getReportData({ filterValues: this.filters.map((filter) => { return { ...filter, columnName: filter.valueProp, filterType: filter.id } }), timeSeriesValues: { startDate: this.startDate, endDate: this.endDate } });
    //   }, 200);
    // } 
    this.filters = await this._wrapperService.constructCommonFilters(config.filters, this.matLabel);

    if (this.startDate === undefined && this.endDate === undefined && this.hasTimeSeriesFilters) {
      this.endDate = moment().format('YYYY-MM-DD');;
      this.startDate = moment(this.endDate).subtract(7, 'days').format('YYYY-MM-DD');;
      const filters = this.filters.map((filter) => {
        return { ...filter, columnName: filter.valueProp, filterType: filter.id };
      });

      await this.leapAvailibilty?.getReportData({
        filterValues: filters,
        timeSeriesValues: { startDate: this.startDate, endDate: this.endDate }
      });
      await this.leapPerformance?.getReportData({
        filterValues: filters,
        timeSeriesValues: { startDate: this.startDate, endDate: this.endDate }
      });
      await this.leapQuality?.getReportData({
        filterValues: filters,
        timeSeriesValues: { startDate: this.startDate, endDate: this.endDate }
      });
     setTimeout( async () => {
       this.leapOEE?.getReportData({
        filterValues: filters,
        timeSeriesValues: { startDate: this.startDate, endDate: this.endDate }
      });
     }, 200);
    }

  }

  checkReport(key: string, reportType: string): Boolean {
    let reportConfig = config;
    let flag = false;
    reportConfig[key]?.filters?.forEach((filter: any) => {
      if (Number(filter.hierarchyLevel) === Number(this.rbacDetails?.role) && Object.keys(filter?.actions?.queries).includes(reportType)) {
        flag = true
      }
    })
    return flag
  }

  csvDownload(csvData: any) {
    if (csvData) {
      this.reportsData.push(csvData)
    }
  }

  async filtersUpdated(filters: any) {
    this.reportsData = [];
    await this.leapAvailibilty?.getReportData({ filterValues: filters.map((filter) => { return { ...filter, columnName: filter.valueProp, filterType: filter.id } }), timeSeriesValues: { startDate: this.startDate, endDate: this.endDate } });
    await this.leapPerformance?.getReportData({ filterValues: filters.map((filter) => { return { ...filter, columnName: filter.valueProp, filterType: filter.id } }), timeSeriesValues: { startDate: this.startDate, endDate: this.endDate } });
    await this.leapQuality?.getReportData({ filterValues: filters.map((filter) => { return { ...filter, columnName: filter.valueProp, filterType: filter.id } }), timeSeriesValues: { startDate: this.startDate, endDate: this.endDate } });

    //this.machineStatus = this.machineStatuses.find(status => status.id === filters[0].value)

  setTimeout(() => {
     this.leapOEE?.getReportData({ filterValues: filters.map((filter) => { return { ...filter, columnName: filter.valueProp, filterType: filter.id } }), timeSeriesValues: { startDate: this.startDate, endDate: this.endDate } });

  }, 200);
  }

  async timeSeriesUpdated(event: any): Promise<void> {
    this.startDate = moment(event.startDate).format('YYYY-MM-DD');
    this.endDate = moment(event.endDate).format('YYYY-MM-DD');
    if (event?.startDate !== null && event?.endDate !== null) {
      this.reportsData = [];
      const filters = this.filters.map((filter) => {
        return { ...filter, columnName: filter.valueProp, filterType: filter.id };
      });
      await this.leapAvailibilty?.getReportData({
        filterValues: filters,
        timeSeriesValues: { startDate: this.startDate, endDate: this.endDate },
      });
      await this.leapPerformance?.getReportData({
        filterValues: filters,
        timeSeriesValues: { startDate: this.startDate, endDate: this.endDate },
      });
      await this.leapQuality?.getReportData({
        filterValues: filters,
        timeSeriesValues: { startDate: this.startDate, endDate: this.endDate },
      });
     setTimeout(() => {
      this.leapOEE?.getReportData({
        filterValues: filters,
        timeSeriesValues: { startDate: this.startDate, endDate: this.endDate },
      });
     }, 200);
    }
  }




}
