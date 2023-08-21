import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { getBarDatasetConfig, getChartJSConfig } from 'src/app/core/config/ChartjsConfig';
import { CommonService } from 'src/app/core/services/common/common.service';
import { RbacService } from 'src/app/core/services/rbac-service.service';
import { WrapperService } from 'src/app/core/services/wrapper.service';
import { formatNumberForReport } from 'src/app/utilities/NumberFomatter';
import { buildQuery, parseFilterToQuery, parseRbacFilter, parseTimeSeriesQuery } from 'src/app/utilities/QueryBuilder';
import { config } from '../../../../config/teacher_attendance_config';
import { ReportDrilldownService } from 'src/app/core/services/report-drilldown/report-drilldown.service';
import { CriteriaService } from 'src/app/core/services/criteria.service';
import { filter, isNull, omitBy } from 'lodash';
import { BarchartBenchmarkService } from 'src/app/core/services/barchart-benchmark/barchart-benchmark.service';
@Component({
  selector: 'app-tas-average-attendance-barchart',
  templateUrl: './tas-average-attendance-barchart.component.html',
  styleUrls: ['./tas-average-attendance-barchart.component.scss']
})
export class TasAverageAttendanceBarchartComponent implements OnInit, OnDestroy {

  title: any;
  chartHeight: any;
  marginTop: any;
  config;
  data;
  fileName: string = "% Teachers Present";
  reportName: string = 'tas_average_attendance_barchart';
  filters: any = [];
  levels: any;
  tableReportData: any;
  minDate: any;
  maxDate: any;
  filterIndex: any;
  currentHierarchyLevel: any = 1;
  rbacDetails: any;
  pageSize: any;
  backUpData: any = [];
  criteriaApplied: boolean = false;
  drillDownSubscription: any;
  benchmarkSubscription: any;
  benchmarkValues: any;
  drillDownLevel: any;
  drillDownDetails: any;

  @Output() exportDates = new EventEmitter<any>();
  @Input() startDate: any;
  @Input() endDate: any;

  constructor(
    private readonly _commonService: CommonService,
    private readonly _wrapperService: WrapperService,
    private _rbacService: RbacService,
    private readonly _reportDrilldownService: ReportDrilldownService,
    private readonly _criteriaService: CriteriaService,
    private readonly _benchmarkService: BarchartBenchmarkService
  ) {
    this._rbacService.getRbacDetails().subscribe((rbacDetails: any) => {
      this.rbacDetails = rbacDetails;
    })

  }

  ngOnInit(): void {
    this.drillDownSubscription = this._reportDrilldownService.drilldownData.subscribe(data => {
      if (data && data.linkedReports?.includes(this.reportName) && data.hierarchyLevel) {
        this.drillDownLevel = data.hierarchyLevel
        this.drilldownData(data);
        this._criteriaService.emit('reset')
        this.criteriaApplied = false;
      }
    })
    this._criteriaService.criteriaObject.subscribe((data) => {
      if (data && data?.linkedReports?.includes(this.reportName)) {
        // this.applyCriteria(data)
        if (!this.criteriaApplied) {
          this.backUpData = this.tableReportData?.values
        }
        this.criteriaApplied = true
        this.tableReportData = this._criteriaService.applyCriteria(data, this.backUpData, this.tableReportData)
      }
    })
    this.benchmarkSubscription = this._benchmarkService.benchmarkValues.subscribe((values: any) => {
      let { options: { barChart: { benchmarkConfig } } } = config[this.reportName];
      if (values && Object.keys(values).includes(benchmarkConfig?.linkedReport)) {
        this.benchmarkValues = values;
        // this.includeBenchmarkConfig()
      }
    })
    // this.getReportData();
  }

  async getReportData(startDate = undefined, endDate = undefined): Promise<void> {
    this.startDate = startDate;
    this.endDate = endDate;
    this._criteriaService.emit('reset')
    this.criteriaApplied = false

    if (this.drillDownDetails !== undefined) {
      this.drilldownData({ hierarchyLevel: this.drillDownLevel });
    }
    else {
      let reportConfig = config


      let { timeSeriesQueries, queries, levels, defaultLevel, filters, options } = reportConfig[this.reportName];
      let onLoadQuery;

      if (this.rbacDetails?.role) {
        filters.every((filter: any) => {
          if (Number(this.rbacDetails?.role) === Number(filter.hierarchyLevel)) {
            queries = { ...filter?.actions?.queries }
            timeSeriesQueries = { ...filter?.timeSeriesQueries }
            Object.keys(queries).forEach((key) => {
              timeSeriesQueries[key] = parseRbacFilter(timeSeriesQueries[key], this.rbacDetails)
            });
            return false
          }
          return true
        })
      }


      Object.keys(queries).forEach((key: any) => {
        if (this.startDate !== undefined && this.endDate !== undefined && Object.keys(timeSeriesQueries).length > 0) {
          onLoadQuery = parseTimeSeriesQuery(timeSeriesQueries[key], this.startDate, this.endDate)
        }
        let query = buildQuery(onLoadQuery, defaultLevel, this.levels, this.filters, this.startDate, this.endDate, key);

        if (query && key === 'barChart') {
          this.getBarChartReportData(query, options, filters, defaultLevel);
        }


      })
    }
  }

  getBarChartReportData(query, options, filters, defaultLevel): void {

    let { barChart: { yAxis, xAxis, isMultibar, metricLabelProp, metricValueProp, tooltipMetrics, benchmarkConfig } } = options;
    this._commonService.getReportDataNew(query).subscribe((res: any) => {
      let rows = res;
      // if(isMultibar){
      //   rows = multibarGroupBy(rows, xAxis.label, metricLabelProp, metricValueProp);
      // }

      this.tableReportData = {

        values: filter(rows, (row) => row.district_name !== null && row.district_name !== 'undefined' && !isNull(row.district_name) && row.district_name !== '')
      }
      this.config = this.getConfig()
      let subscription = this._benchmarkService.benchmarkValues.subscribe((values) => {
        if (values && Object.keys(values).includes(benchmarkConfig?.linkedReport) && this.benchmarkValues?.index && values.index == this.benchmarkValues.index) {
          setTimeout(() => {
            subscription.unsubscribe()
          }, 100);
          this.config = this.getConfig()
        }
      })
      if (this.tableReportData?.values?.length > 0) {
        let reportsData = { reportData: this.tableReportData.values, reportType: 'dashletBar', reportName: this.fileName }
        // this.csv.csvDownload(reportsData)
      }
    });
  }

  getYaxisTitle(filters: any): string {
    let title: string;
    filters.forEach((filter: any) => {
      if (Number(filter.hierarchyLevel) === this.currentHierarchyLevel - 1) {
        title = filter?.actions?.level;
      }
    });
    return title;
  }

  includeBenchmarkConfig() {

  }

  getConfig() {
    let { filters, defaultLevel, options } = config[this.reportName];
    let { barChart: { yAxis, xAxis, isMultibar, metricLabelProp, metricValueProp, tooltipMetrics, benchmarkConfig } } = options;
    let annotations = []
    let colors = ['green', 'blue', 'orange', 'red']
    let objLevel = {
      1: "State average",
      2: "District average",
      3: "Block average",
      4: "Cluster average"
    }
    let reportValues = this.benchmarkValues?.[benchmarkConfig?.linkedReport]
    let currentLevel = this.drillDownLevel ? this.drillDownLevel : this.rbacDetails.role;
    if (reportValues) {
      annotations = Object.keys(reportValues).filter(level => level <= currentLevel).map((level: any, index) => {
        return {
          drawTime: 'afterDraw',
          id: 'benchmark-' + (index + 1),
          type: 'line',
          mode: 'horizontal',
          scaleID: 'y-axis-0',
          value: reportValues[level],
          borderColor: colors[index],
          borderWidth: 2,
          label: {
            content: objLevel[level] + ' - ' + reportValues[level],
            xAdjust: (135 * level) - (350),
            enabled: true,
            backgroundColor: colors[index],
            color: 'white'
          }
        }
      })

    }


    let tooltipObject
    this.tableReportData.values.forEach((row) => {
      let tooltip = this._wrapperService.constructTooltip(tooltipMetrics, row, metricValueProp, 'barChart')

      tooltipObject = {
        ...tooltipObject,
        [row.level.trim()]: tooltip
      }
    });
    // let benchmarkValues = 
    let barChartConfig = getChartJSConfig({
      labelExpr: xAxis.value,
      datasets: getBarDatasetConfig(
        [{
          dataExpr: metricValueProp, label: metricLabelProp
        }]),

      options: {
        animation: {
          onComplete: function () {
            let chartInstance = this.chart;
            let ctx = chartInstance.ctx;
            ctx.font = '#000';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'bottom';

            this.data.datasets.forEach(function (dataset, i) {
              const meta = chartInstance.controller.getDatasetMeta(i);
              meta.data.forEach(function (bar, index) {
                const data = dataset.data[index];
                ctx.fillText(data, bar._model.x, bar._model.y - 5);
              });
            });
          }
        },
        height: '120',
        tooltips: {
          callbacks: {
            label: (tooltipItem, data) => {
              return tooltipObject[tooltipItem.label.trim()]
            }
          }
        },
        scales: {
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: yAxis.title !== 'level' ? yAxis.title : this.getYaxisTitle(filters) ? this.getYaxisTitle(filters) : defaultLevel
            }
          }],
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: xAxis.title
            },
            ticks: {
              fontSize: 12,
              callback: function (value, index, values) {
                let newValue = value?.split('_')?.map((word: any) => word[0]?.toUpperCase() + word?.substring(1))?.join(' ')
                if (screen.width <= 768) {
                  return newValue?.substr(0, 8) + '...';
                } else {
                  return newValue;
                }
              }
            }
          }]
        },
        annotation: {
          drawTime: 'afterDatasetsDraw',
          events: ['click'],
          dblClickSpeed: 350,
          annotations: annotations
        }

      }
    });
    return barChartConfig
  }

  async drilldownData(event: any) {
    let { hierarchyLevel, id } = event ?? {}
    let drillDownDetails;

    switch (Number(hierarchyLevel)) {
      case 1:
        drillDownDetails = {
          ...this.rbacDetails,
          state: id ? id : this.drillDownDetails.state
        }
        break;
      case 2:
        drillDownDetails = {
          ...this.rbacDetails,
          district: id ? id : this.drillDownDetails.district
        }
        break;
      case 3:
        drillDownDetails = {
          ...this.rbacDetails,
          block: id ? id : this.drillDownDetails.block
        }
        break;
      case 4:
        drillDownDetails = {
          ...this.rbacDetails,
          cluster: id ? id : this.drillDownDetails.cluster
        }
        break;
    }
    this.drillDownDetails = { ...drillDownDetails }

    let reportConfig = config;

    let { timeSeriesQueries, queries, levels, label, defaultLevel, filters, options } = reportConfig[this.reportName];
    let onLoadQuery;
    if (this.rbacDetails?.role) {
      filters.every((filter: any) => {
        if (Number(hierarchyLevel) === Number(filter.hierarchyLevel)) {
          queries = { ...filter?.actions?.queries }
          timeSeriesQueries = { ...filter?.timeSeriesQueries }
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

      if (query && key === 'barChart') {
        this.getBarChartReportData(query, options, filters, defaultLevel);
      }
    });
  }


  ngOnDestroy(): void {
    this.drillDownSubscription.unsubscribe()
    this._benchmarkService.emit(null)
    this.benchmarkSubscription.unsubscribe()
  }


}
