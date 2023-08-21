import {Component, OnInit} from '@angular/core';
import {config} from "./config/school_assessment_config";
import {buildQuery, parseFilterToQuery, parseTimeSeriesQuery} from "../../utilities/QueryBuilder";
import {RbacService} from "../../core/services/rbac-service.service";
import {CommonService} from "../../core/services/common/common.service";
import {DataService} from "../../core/services/data.service";
import {WrapperService} from "../../core/services/wrapper.service";

@Component({
    selector: 'app-student-assessment',
    templateUrl: './student-assessment.component.html',
    styleUrls: ['./student-assessment.component.scss']
})
export class StudentAssessmentComponent implements OnInit {
    tabIndex;
    // creating card map for all levels
    cardMap = {
        1: {
            avg_score: {type: 'number', reportName: "Average Student Assessment Scores", value: null},
            district_map: {type: 'map', value: null},
            district_avg_score: {type: 'table', title: '', value: null},
            grade: {type: 'barChart', title: '', value: null},
            subject: {type: 'barChart', title: '', value: null},
            lo_avg_score: {type: 'table', title: '', value: null},
        },
        2: {
            avg_score: {type: 'number', reportName: "Average Student Assessment Scores", value: null},
            district_avg_score: {type: 'table', title: '', value: null},
            grade: {type: 'barChart', title: '', value: null},
            subject: {type: 'barChart', title: '', value: null},
            lo_avg_score: {type: 'table', title: '', value: null},
        },
        3: {
            avg_score: {type: 'number', reportName: "Average Student Assessment Scores", value: null},
            district_avg_score: {type: 'table', title: '', value: null},
            grade: {type: 'barChart', title: '', value: null},
            subject: {type: 'barChart', title: '', value: null},
            lo_avg_score: {type: 'table', title: '', value: null},
        },
        4: {
            avg_score: {type: 'number', reportName: "Average Student Assessment Scores", value: null},
            district_avg_score: {type: 'table', title: '', value: null},
            grade: {type: 'barChart', title: '', value: null},
            subject: {type: 'barChart', title: '', value: null},
            lo_avg_score: {type: 'table', title: '', value: null},
        },
        5: {
            avg_score: {type: 'number', reportName: "Average Student Assessment Scores", value: null},
            grade: {type: 'barChart', title: '', value: null},
            subject: {type: 'barChart', title: '', value: null},
            lo_avg_score: {type: 'table', title: '', value: null},
        }
    };
    cards = []
    rbacDetails: any;
    filters: any = [];
    levels: any;
    tableReportData: any;
    reportName = {
        1: 'config',
        2: 'district_config',
        3: 'block_config',
        4: 'cluster_config',
        5: 'school_config',
    }
    reportData: any = {
        reportName: "District Wise Performance"
    };

    constructor(private _rbacService: RbacService, private _commonService: CommonService,
                private readonly _dataService: DataService, private _wrapperService: WrapperService) {
        this._rbacService.getRbacDetails().subscribe((rbacDetails: any) => {
            this.rbacDetails = rbacDetails;
        })
    }

    async ngOnInit(): Promise<void> {
        this.getReportData({filterValues: [], timeSeriesValues: []});
        this.filters = await this._wrapperService.constructCommonFilters(config.filters)
    }

    getReportData(values: any): void {
        console.log('values', values);
        let {filterValues, timeSeriesValues} = values ?? {filterValues: [], timeSeriesValues: []};
        let reportConfig = config;

        console.log('this.rbacDetails?.role', this.rbacDetails?.role, reportConfig);
        let {
            queries,
            levels,
            label,
            defaultLevel,
            filters,
            options
        } = reportConfig[this.reportName[this.rbacDetails.role]];
        let onLoadQuery;
        console.log('this.rbacDetails?.role', this.rbacDetails?.role, filters, this.reportName[this.rbacDetails.role]);
        if (this.rbacDetails?.role) {
            filters.every((filter: any) => {
                if (Number(this.rbacDetails?.role) === Number(filter.hierarchyLevel)) {
                    queries = {...filter?.actions?.queries}
                    // timeSeriesQueries = { ...filter?.timeSeriesQueries }
                    Object.keys(queries).forEach((key) => {
                        queries[key] = this.parseRbacFilter(queries[key])
                        // timeSeriesQueries[key] = this.parseRbacFilter(timeSeriesQueries[key])
                    });
                    return false
                }
                return true
            })
        } else {
            // this._wrapperService.constructFilters(this.filters, filters);
        }

        Object.keys(queries).forEach(async (key: any) => {
            if (key.toLowerCase().includes('comparison')) {
                let endDate = new Date();
                let days = endDate.getDate();
                let startDate = new Date();
                startDate.setDate(days)
                onLoadQuery = parseTimeSeriesQuery(queries[key], startDate.toISOString().split('T')[0], endDate.toISOString().split('T')[0])
            } else {
                onLoadQuery = queries[key]
            }
            let query = buildQuery(onLoadQuery, defaultLevel, this.levels, [], '', '', key, '');
            filterValues.forEach((filterParams: any) => {
                query = parseFilterToQuery(query, filterParams)
            });

            let metricFilter = [...filterValues].filter((filter: any) => {
                return filter.filterType === 'metric'
            })

            filterValues = [...filterValues].filter((filter: any) => {
                return filter.filterType !== 'metric'
            })

            if (this.cardMap[this.rbacDetails.role] && this.cardMap[this.rbacDetails.role][key]) {
                const card = this.cardMap[this.rbacDetails.role][key];
                if (query && card.type === 'number') {
                    this._commonService.getReportDataNew(query).subscribe(
                        data => {
                            this.createCard(card, data);
                        }
                    )
                } else if (query && card.type === 'table') {
                    this.getTableReportData(query, options, card);
                } else if (query && card.type === 'map') {
                    metricFilter = [
                        {
                            "label": "District Wise Performance",
                            "name": "Metric",
                            "labelProp": "category_name",
                            "valueProp": "category_name",
                            "id": "metric",
                            "query": "select category_name from dimensions.categorypgi",
                            "options": [
                                {
                                    "value": "Outcome",
                                    "label": "Outcome"
                                },
                                {
                                    "value": "Effective Classroom Transaction",
                                    "label": "Effective Classroom Transaction"
                                },
                                {
                                    "value": "Infrastructure, Facilities, Student Entitlements",
                                    "label": "Infrastructure, Facilities, Student Entitlements"
                                },
                                {
                                    "value": "School Safety and Child Protection",
                                    "label": "School Safety and Child Protection"
                                },
                                {
                                    "value": "Digital Learning",
                                    "label": "Digital Learning"
                                },
                                {
                                    "value": "Governance Processes",
                                    "label": "Governance Processes"
                                },
                                {
                                    "value": "Overall",
                                    "label": "Overall"
                                }
                            ],
                            "value": "Outcome",
                            "columnName": "category_name",
                            "filterType": "metric"
                        }
                    ]
                    this._dataService.getMapReportData(query, options, metricFilter)
                        .then(data => {
                                this.createCard(card, data);
                            }
                        ).catch(err => {
                    });

                } else if (query && card.type === 'barChart') {
                    // todo use bar table
                }
            }

        })
    }

    createCard(card, data) {
        if (data && data.length) {
            card.value = {reportName: card.reportName, averagePercentage: data[0]['compliance_percentage']};
        } else if (card.type === 'table' || card.type === 'map') {
            card.value = data;
        }
        this.cards = Object.values(this.cardMap[this.rbacDetails.role]);
    }

    parseRbacFilter(query: string) {
        let newQuery = query;
        let startIndex = newQuery?.indexOf('{');
        let endIndex = newQuery?.indexOf('}');

        if (newQuery && startIndex > -1) {
            let propertyName = query.substring(startIndex + 1, endIndex);
            let re = new RegExp(`{${propertyName}}`, "g");
            Object.keys(this.rbacDetails).forEach((key: any) => {
                if (propertyName === key + '_id') {
                    newQuery = newQuery.replace(re, '\'' + this.rbacDetails[key] + '\'');
                }
            });
        }
        return newQuery
    }

    onTabChanged($event) {
    }

    getTableReportData(query, options, card): void {
        this._commonService.getReportDataNew(query).subscribe((res: any) => {
            let rows = res;
            let {table: {columns}} = options;
            this.tableReportData = {
                data: rows.map(row => {
                    /*if (this.minDate !== undefined && this.maxDate !== undefined) {
                        if (row['min_date'] < this.minDate) {
                            this.minDate = row['min_date']
                        }
                        if (row['max_date'] > this.maxDate) {
                            this.maxDate = row['max_date']
                        }
                    }
                    else {
                        this.minDate = row['min_date']
                        this.maxDate = row['max_date']
                    }*/
                    columns.forEach((col: any) => {
                        if (row[col.property]) {
                            row = {
                                ...row,
                                [col.property]: {value: row[col.property]}
                            }
                        }
                    });
                    return row
                }),
                columns: columns.filter(col => {
                    if (rows[0] && col.property in rows[0]) {
                        return col;
                    }
                })
            }
            this.createCard(card, this.tableReportData);
            if (this.tableReportData?.data?.length > 0) {
                // let reportsData = { reportData: this.tableReportData.data, reportType: 'table', reportName: this.title }
                // this.csv.csvDownload(reportsData)
            }
        });
    }

    filtersUpdated(data) {
        console.log('=============>', data);
        this.getReportData({ filterValues: this.filters.map((filter) => { return { ...filter, columnName: filter.valueProp, filterType: filter.id } }) });
    }

}
