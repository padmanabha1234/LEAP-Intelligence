import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { filter } from 'lodash';
@Component({
  selector: 'app-sb-bar-chart',
  templateUrl: './sb-bar-chart.component.html',
  styleUrls: ['./sb-bar-chart.component.scss']
})
export class SbBarChartComponent implements OnInit, OnChanges {

  @Input() data: any;
  @Input() config: any;

  filterData: any;
  currentPage = 0;
  pageSize = 30;

  ngOnInit() {
    this.filterData = { values: this.data.values.slice(0, this.pageSize) };
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.filterData = { values: this.data.values.slice(0, this.pageSize) };
  }

  onPageChange(event) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
  
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.data.values.length);
      this.filterData = { values: this.data.values.slice(startIndex, endIndex) };
  
    if (event.pageIndex === 0) {
      this.currentPage = 0;
    } else if (event.pageIndex === Math.ceil(this.data.values.length / this.pageSize) - 1) {
      this.currentPage = Math.ceil(this.data.values.length / this.pageSize) - 1;
    }
  }
  
}
