import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonService } from 'src/app/core/services/common/common.service';
import { RbacService } from 'src/app/core/services/rbac-service.service';
import { WrapperService } from 'src/app/core/services/wrapper.service';
import { buildQuery, parseTimeSeriesQuery, parseFilterToQuery, parseQueryParam } from 'src/app/utilities/QueryBuilder';
import { config } from 'src/app/views/teacher-statistics/config/teacher_statistics_config';

@Component({
  selector: 'app-ts-total-teachers',
  templateUrl: './ts-total-teachers.component.html',
  styleUrls: ['./ts-total-teachers.component.scss']
})
export class TsTotalTeachersComponent implements OnInit, OnChanges {
  reportName: string = 'ts_stat_total_teachers';
  filters: any = [];
  levels: any;
  tableReportData: any;
  bigNumberReportData: any = {
    reportName: "Total Teachers"
  };
  minYear: any;
  maxYear: any;
  compareDateRange: any = 30;
  filterIndex: any;
  rbacDetails: any;
  selectedYear :string
  @Output() bigNumberReport = new EventEmitter<any>();
  @Output() exportMinmaxYear = new EventEmitter<any>();
  @Input() startDate: any;
  @Input() endDate: any;


  constructor(private readonly _commonService: CommonService, private readonly _wrapperService: WrapperService, private _rbacService: RbacService) {
    this._rbacService.getRbacDetails().subscribe((rbacDetails: any) => {
      this.rbacDetails = rbacDetails;
    })
  }


  ngOnInit(): void {
    this.getReportData();
  }
  ngOnChanges() {
    
    this.getReportData()
  }




  getReportData(value?:string): void {
    this.selectedYear = value
    let reportConfig = config   


    let { queries, levels, defaultLevel, filters, options } = reportConfig[this.reportName];
    let onLoadQuery;

    if (this.rbacDetails?.role) {
      filters.every((filter: any) => {
        if (Number(this.rbacDetails?.role) === Number(filter.hierarchyLevel)) {
          queries = filter?.actions?.queries
          Object.keys(queries).forEach((key) => {
            queries[key] = this.parseRbacFilter(queries[key])
          });
          return false
        }
        return true
      })
    }

    Object.keys(queries).forEach((key: any) => {
      if (key.toLowerCase().includes('comparison')) {
        let currentYear = new Date().getFullYear()
        let lastYear = currentYear -1;
        onLoadQuery = parseQueryParam(queries[key], {'lastYear': lastYear})
      }
      else {
        onLoadQuery = queries[key]
      }

      let query = buildQuery(onLoadQuery, defaultLevel, this.levels, this.filters, this.startDate, this.endDate, key, this.compareDateRange);

      if (this.selectedYear !== undefined) {
        let params = { columnName: "academic_year", value: this.selectedYear };
        query = parseFilterToQuery(query, params)
      }
      
      if (query && key === 'table') {
        this.getTableReportData(query, options);
      }
      else if (query && key === 'bigNumber') {
        this.getBigNumberReportData(query, options, 'averagePercentage');
      }
      else if (query && key === 'bigNumberComparison') {
        this.getBigNumberReportData(query, options, 'differencePercentage')
      }

    })
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

  getTableReportData(query, options): void {
    this._commonService.getReportDataNew(query).subscribe((res: any) => {
      let rows = res;
      rows.forEach(row => {
        if (this.minYear !== undefined && this.maxYear !== undefined) {
          if (row['min_year'] < this.minYear) {
            this.minYear = row['min_year']
          }
          if (row['max_year'] > this.maxYear) {
            this.maxYear = row['max_year']
          }
        }
        else {
          this.minYear = row['min_year']
          this.maxYear = row['max_year']
        }
      }); 
      let { table: { columns } } = options;
      this.tableReportData = {
        data: rows.map(row => {
          columns.forEach((col: any) => {
            let cellValue = row[col.property];
              if (cellValue === null || cellValue === undefined) {
                cellValue = "N/A";
              }
              row = {
                ...row,
                [col.property]: { value: cellValue }
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
      this.exportMinmaxYear.emit({
        minYear: this.minYear,
        maxYear: this.maxYear
      })
    });
  }

  async getBigNumberReportData(query: string, options: any, indicator: string): Promise<void> {
    let { bigNumber } = options ?? {};
    let { valueSuffix, property } = bigNumber ?? {};
    if (indicator === 'averagePercentage') {
      this.bigNumberReportData = {
        ...this.bigNumberReportData,
        valueSuffix: valueSuffix
      }
      await this._commonService.getReportDataNew(query).subscribe((res: any) => {
        if (res) {
          let rows = res;
          rows.forEach(row => {
            if (this.minYear !== undefined && this.maxYear !== undefined) {
              if (row['min_year'] < this.minYear) {
                this.minYear = row['min_year']
              }
              if (row['max_year'] > this.maxYear) {
                this.maxYear = row['max_year']
              }
            }
            else {
              this.minYear = row['min_year']
              this.maxYear = row['max_year']
            }
          });
          this.bigNumberReportData = {
            ...this.bigNumberReportData,
            averagePercentage: rows[0]?.[property],
          }
          this.bigNumberReport.emit({
            data: this.bigNumberReportData,
            reportName: this.reportName
          })
          this.exportMinmaxYear.emit({
            minYear: this.minYear,
            maxYear: this.maxYear
          })
        }
      })
    }
    else if (indicator === 'differencePercentage') {
      await this._commonService.getReportDataNew(query).subscribe((res: any) => {
        if (res) {
          let rows = res;
          rows.forEach(row => {
            if (this.minYear !== undefined && this.maxYear !== undefined) {
              if (row['min_year'] < this.minYear) {
                this.minYear = row['min_year']
              }
              if (row['max_year'] > this.maxYear) {
                this.maxYear = row['max_year']
              }
            }
            else {
              this.minYear = row['min_year']
              this.maxYear = row['max_year']
            }
          });
          this.bigNumberReportData = {
            ...this.bigNumberReportData,
            differencePercentage: rows[0]?.[property]
          }
          this.bigNumberReport.emit({
            data: this.bigNumberReportData,
            reportName:this.reportName
          })
          this.exportMinmaxYear.emit({
            minYear: this.minYear,
            maxYear: this.maxYear
          })
        }
      })
    }

  }
}