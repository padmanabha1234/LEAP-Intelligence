import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { RbacService } from 'src/app/core/services/rbac-service.service';
import { WrapperService } from 'src/app/core/services/wrapper.service';
import { config } from '../../config/nas_config';
import { DistrictWisePerformanceComponent } from './reports/district-wise-performance/district-wise-performance.component';
import { NasBignumberMetricsComponent } from './reports/nas-bignumber-metrics/nas-bignumber-metrics.component';

@Component({
    selector: 'app-district-wise-performance-tab',
    templateUrl: './district-wise-performance-tab.component.html',
    styleUrls: ['./district-wise-performance-tab.component.scss']
})
export class DistrictWisePerformanceTabComponent implements OnInit, AfterViewInit {

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
    tabLabel: any = 'District Wise Performance';
    bigNumberMetrics: any = [];

    @ViewChild('districtWisePerformance') districtWisePerformance: DistrictWisePerformanceComponent;
    @ViewChild('nasMetrics') nasMetrics: NasBignumberMetricsComponent;

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
            // this.filters.map((a) => {
            //     let allObj = {
            //         "value": "all",
            //         "label": "All"
            //     }
            //     var index = a.options.findIndex(x => x.value == "all");
            //     if (index === -1) {
            //         a.options.push(allObj)
            //         a.options.map((item, i) => {
            //             if (item.value === "all") {
            //                 a.options.splice(i, 1);
            //                 a.options.unshift(item);
            //             }
            //         })
            //         a.value = "all"
            //     }
            // })
            this.districtWisePerformance?.getReportData({ filterValues: this.filters.map((filter) => { return { ...filter, columnName: filter.valueProp, filterType: filter.id } }) });
            this.nasMetrics?.getReportData({ filterValues: this.filters.map((filter) => { return { ...filter, columnName: filter.valueProp, filterType: filter.id } }) });
        }
        if (this.startDate === undefined && this.endDate === undefined && this.hasTimeSeriesFilters) {
            let endDate = new Date();
            let days = endDate.getDate() - this.defaultSelectedDays;
            let startDate = new Date();
            startDate.setDate(days);
            this.districtWisePerformance?.getReportData({ timeSeriesValues: { startDate: startDate?.toISOString().split('T')[0], endDate: endDate?.toISOString().split('T')[0] } });
            this.nasMetrics?.getReportData({ timeSeriesValues: { startDate: startDate?.toISOString().split('T')[0], endDate: endDate?.toISOString().split('T')[0] } });
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
        this.districtWisePerformance?.getReportData({ filterValues: filters.map((filter) => { return { ...filter, columnName: filter.valueProp, filterType: filter.id } }) });
        this.nasMetrics?.getReportData({ filterValues: filters.map((filter) => { return { ...filter, columnName: filter.valueProp, filterType: filter.id } }) });
    }

    timeSeriesUpdated(event: any): void {
        this.startDate = event?.startDate?.toDate().toISOString().split('T')[0]
        this.endDate = event?.endDate?.toDate().toISOString().split('T')[0]
        if (event?.startDate !== null && event?.endDate !== null) {
            this.reportsData = [];
            this.districtWisePerformance?.getReportData({ timeSeriesValues: { startDate: this.startDate, endDate: this.endDate } });
            this.nasMetrics?.getReportData({ timeSeriesValues: { startDate: this.startDate, endDate: this.endDate } });
        }
    }

    importBigNumberMetrics(bigNumberMetric: any) {
        this.bigNumberMetrics[bigNumberMetric.ind] = bigNumberMetric.data
    }
}
