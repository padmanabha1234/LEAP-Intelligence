import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonService } from 'src/app/core/services/common/common.service';
import { RbacService } from 'src/app/core/services/rbac-service.service';
import { WrapperService } from 'src/app/core/services/wrapper.service';
import { buildQuery, parseTimeSeriesQuery, parseFilterToQuery } from 'src/app/utilities/QueryBuilder';
import { config } from 'src/app/views/teacher-statistics/config/teacher_statistics_config';

@Component({
  selector: 'app-ts-rank-in-average-pupil-teacher-ratio',
  templateUrl: './ts-rank-in-average-pupil-teacher-ratio.component.html',
  styleUrls: ['./ts-rank-in-average-pupil-teacher-ratio.component.scss']
})
export class TsRankInAveragePupilTeacherRatioComponent implements OnInit {
  reportName: string = 'ts_stat_rank_in_average_pupil_teacher_ratio';
  filters: any = [];
  levels: any;
  tableReportData: any;
  bigNumberReportData: any = {
    reportName: "Rank in Average Pupil-Teacher Ratio"
  };
  minYear: any;
  maxYear: any;
  compareDateRange: any = 30;
  filterIndex: any;
  rbacDetails: any;
  startDate: any;
  endDate: any;
  selectedYear: any;

  @Output() exportMinmaxYear = new EventEmitter<any>();

  constructor(private readonly _commonService: CommonService, private readonly _wrapperService: WrapperService, private _rbacService: RbacService) {
    this._rbacService.getRbacDetails().subscribe((rbacDetails: any) => {
      this.rbacDetails = rbacDetails;
    })
  }

  ngOnInit(): void {
    this.getReportData();
  }

  getReportData(value?: string): void {
    this.selectedYear = value;
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
      onLoadQuery = queries[key]

      let query = buildQuery(onLoadQuery, defaultLevel, this.levels, this.filters, this.startDate, this.endDate, key, this.compareDateRange);

      if (this.selectedYear !== undefined) {
        let params = { columnName: "academic_year", value: this.selectedYear };
        query = parseFilterToQuery(query, params)
      }

      if (query && key === 'table') {
        this.getTableReportData(query, options);
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
}
