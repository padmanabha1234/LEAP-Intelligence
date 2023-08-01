import { Component, OnInit, ViewChild } from '@angular/core';
import { RbacService } from 'src/app/core/services/rbac-service.service';
import { WrapperService } from 'src/app/core/services/wrapper.service';
import {config} from '../../config/quiz_config';
import { ParticipationStatusComponent } from './reports/participation-status/participation-status.component';

@Component({
  selector: 'app-participation-status-tab',
  templateUrl: './participation-status-tab.component.html',
  styleUrls: ['./participation-status-tab.component.scss']
})
export class ParticipationStatusTabComponent implements OnInit {

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
  hasTimeSeriesFilters: boolean = false;
  hasCommonFilters: boolean = true;
  tabLabel: any = 'Participation Status';
  bigNumberMetrics: any = [];

@ViewChild('participationstatus') participationstatus: ParticipationStatusComponent;
      
constructor(private _wrapperService: WrapperService, private _rbacService: RbacService) {
  this._rbacService.getRbacDetails().subscribe((rbacDetails: any) => {
      this.rbacDetails = rbacDetails;
  })
  }

  async ngOnInit(): Promise<void> {
  // this.renderReports();
  }

  async ngAfterViewInit(): Promise<void> {
  if (this.hasCommonFilters) {
      this.filters = await this._wrapperService.constructCommonFilters(config.filters, this.tabLabel);
      this.participationstatus?.getReportData({ filterValues: this.filters.map((filter) => { return { ...filter, columnName: filter.valueProp, filterType: filter.id} }) });
      }
  if (this.startDate === undefined && this.endDate === undefined && this.hasTimeSeriesFilters) {
      let endDate = new Date();
      let days = endDate.getDate() - this.defaultSelectedDays;
      let startDate = new Date();
      startDate.setDate(days);
      this.participationstatus?.getReportData({ timeSeriesValues: { startDate: startDate?.toISOString().split('T')[0], endDate: endDate?.toISOString().split('T')[0] } });
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

  filtersUpdated(filters: any) {
  this.reportsData = [];
  this.participationstatus?.getReportData({ filterValues: filters.map((filter) => { return { ...filter, columnName: filter.valueProp, filterType: filter.id} }) });
      }

  timeSeriesUpdated(event: any): void {
  this.startDate = event?.startDate?.toDate().toISOString().split('T')[0]
  this.endDate = event?.endDate?.toDate().toISOString().split('T')[0]
  if (event?.startDate !== null && event?.endDate !== null) {
      this.reportsData = [];
      this.participationstatus?.getReportData({timeSeriesValues: {startDate: this.startDate, endDate: this.endDate}});
      }
  }

  importBigNumberMetrics(bigNumberMetric: any) {
      this.bigNumberMetrics[bigNumberMetric.ind] = bigNumberMetric.data
  }

}
