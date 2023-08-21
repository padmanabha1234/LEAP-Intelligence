import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { RbacService } from 'src/app/core/services/rbac-service.service';
import { WrapperService } from 'src/app/core/services/wrapper.service';
import { config } from '../../config/nishtha_config';
import { CourseWiseStatusComponent } from './reports/course-wise-status/course-wise-status.component';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-course-wise-status-tab',
    templateUrl: './course-wise-status-tab.component.html',
    styleUrls: ['./course-wise-status-tab.component.scss']
})
export class CourseWiseStatusTabComponent implements OnInit, AfterViewInit {

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
    hasTimeSeriesFilters: boolean = false;
    hasCommonFilters: boolean = true;
    matLavel = 'Course Wise Status'
    NVSK: boolean = true;
    @ViewChild('courseWiseStatus') courseWiseStatus: CourseWiseStatusComponent;

    constructor(private _wrapperService: WrapperService, private _rbacService: RbacService) {
        this._rbacService.getRbacDetails().subscribe((rbacDetails: any) => {
            this.rbacDetails = rbacDetails;
        })
        if (environment.config === 'VSK') {
            this.NVSK = false;
        }
    }

    async ngOnInit(): Promise<void> {
        // this.renderReports();
    }

    async ngAfterViewInit(): Promise<void> {
        if (this.hasCommonFilters && this.NVSK) {
            this.filters = await this._wrapperService.constructCommonFilters(config.filters, this.matLavel);
            this.courseWiseStatus?.getReportData({ filterValues: this.filters.map((filter) => { return { ...filter, columnName: filter.valueProp, filterType: filter.id } }) });
        }
        if (!this.NVSK) {
            this.courseWiseStatus?.getReportData({ filterValues: [] });
        }
        if (this.startDate === undefined && this.endDate === undefined && this.hasTimeSeriesFilters) {
            let endDate = new Date();
            let days = endDate.getDate() - this.defaultSelectedDays;
            let startDate = new Date();
            startDate.setDate(days);
            this.courseWiseStatus?.getReportData({ timeSeriesValues: { startDate: startDate?.toISOString().split('T')[0], endDate: endDate?.toISOString().split('T')[0] } });
        }
    }

    checkReport(key: string, reportType: string, alterReportType?: string): Boolean {
        let reportConfig = config;
        let flag = false;
        reportConfig[key]?.filters?.forEach((filter: any) => {
            if (Number(filter.hierarchyLevel) === Number(this.rbacDetails?.role) && (Object.keys(filter?.actions?.queries).includes(reportType) || Object.keys(filter?.actions?.queries).includes(alterReportType))) {
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
        this.courseWiseStatus?.getReportData({ filterValues: filters.map((filter) => { return { ...filter, columnName: filter.valueProp, filterType: filter.id } }) });
    }

    timeSeriesUpdated(event: any): void {
        this.startDate = event?.startDate?.toDate().toISOString().split('T')[0]
        this.endDate = event?.endDate?.toDate().toISOString().split('T')[0]
        if (event?.startDate !== null && event?.endDate !== null) {
            this.reportsData = [];
            this.courseWiseStatus?.getReportData({ timeSeriesValues: { startDate: this.startDate, endDate: this.endDate } });
        }
    }
}
