import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { RbacService } from 'src/app/core/services/rbac-service.service';
import { WrapperService } from 'src/app/core/services/wrapper.service';
import { config } from '../../config/diksha_config';
import { EtbCoverageStatusComponentBignumber } from './reports/etb-coverage-status-bignumber/etb-coverage-status-bignumber.component';
import { EtbCoverageStatusComponent } from './reports/etb-coverage-status/etb-coverage-status.component';
import { environment } from 'src/environments/environment';
import { EtbCoverageStatusNvskComponent } from './reports/etb-coverage-status-nvsk/etb-coverage-status-nvsk.component';

@Component({
    selector: 'app-etb-coverage-status-tab',
    templateUrl: './etb-coverage-status-tab.component.html',
    styleUrls: ['./etb-coverage-status-tab.component.scss']
})
export class EtbCoverageStatusTabComponent implements OnInit, AfterViewInit {

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
    NVSK: boolean = true;
    matLabel:any = "ETB Coverage Status"
    @ViewChild('etbCoverageStatusBignumber') etbCoverageStatusBignumber: EtbCoverageStatusComponentBignumber;
    @ViewChild('etbCoverageStatus') etbCoverageStatus: EtbCoverageStatusComponent;
    @ViewChild('etbCoverageStatusNVSK') etbCoverageStatusNVSK: EtbCoverageStatusNvskComponent;
    
    @Input() bigNumberMetrics: any = [];

    constructor(private _wrapperService: WrapperService, private _rbacService: RbacService) {
        this._rbacService.getRbacDetails().subscribe((rbacDetails: any) => {
            this.rbacDetails = rbacDetails;
        })
        if(environment.config === 'VSK') {
            this.NVSK = false
        }
    }

    async ngOnInit(): Promise<void> {
        // this.renderReports();
    }

    async ngAfterViewInit(): Promise<void> {
        if (this.hasCommonFilters && !this.NVSK) {
            this.filters = await this._wrapperService.constructCommonFilters(config.filters, this.matLabel);
            this.etbCoverageStatusBignumber?.getReportData({ filterValues: this.filters.map((filter) => { return { ...filter, columnName: filter.valueProp, filterType: filter.id } }) });
            this.etbCoverageStatus?.getReportData({ filterValues: this.filters.map((filter) => { return { ...filter, columnName: filter.valueProp, filterType: filter.id } }) });
        }
        if (this.NVSK) {
            this.etbCoverageStatusBignumber?.getReportData({ filterValues: []});
            this.etbCoverageStatusNVSK?.getReportData({ filterValues: []});
        }
        if (this.startDate === undefined && this.endDate === undefined && this.hasTimeSeriesFilters) {
            let endDate = new Date();
            let days = endDate.getDate() - this.defaultSelectedDays;
            let startDate = new Date();
            startDate.setDate(days);
            this.etbCoverageStatusBignumber?.getReportData({ timeSeriesValues: { startDate: startDate?.toISOString().split('T')[0], endDate: endDate?.toISOString().split('T')[0] } });
            this.etbCoverageStatus?.getReportData({ timeSeriesValues: { startDate: startDate?.toISOString().split('T')[0], endDate: endDate?.toISOString().split('T')[0] } });
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
        this.etbCoverageStatusBignumber?.getReportData({ filterValues: filters.map((filter) => { return { ...filter, columnName: filter.valueProp, filterType: filter.id } }) });
        this.etbCoverageStatus?.getReportData({ filterValues: filters.map((filter) => { return { ...filter, columnName: filter.valueProp, filterType: filter.id } }) });
    }

    timeSeriesUpdated(event: any): void {
        this.startDate = event?.startDate?.toDate().toISOString().split('T')[0]
        this.endDate = event?.endDate?.toDate().toISOString().split('T')[0]
        if (event?.startDate !== null && event?.endDate !== null) {
            this.reportsData = [];
            this.etbCoverageStatusBignumber?.getReportData({ timeSeriesValues: { startDate: this.startDate, endDate: this.endDate } });
            this.etbCoverageStatus?.getReportData({ timeSeriesValues: { startDate: this.startDate, endDate: this.endDate } });
        }
    }
    importBigNumberMetrics(bigNumberMetric: any) {
        this.bigNumberMetrics[bigNumberMetric.ind] = bigNumberMetric.data
    }

}
