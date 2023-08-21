import { AfterViewChecked, AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { MatSort, SortDirection } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { TableHeatMapDirective } from 'src/app/shared/directives/table-heat-map/table-heat-map.directive';
import { MatPaginator } from '@angular/material/paginator';
import { ReportDrilldownService } from 'src/app/core/services/report-drilldown/report-drilldown.service';
import { RbacService } from 'src/app/core/services/rbac-service.service';

@Component({
  selector: 'app-material-heat-chart-drilldown-table',
  templateUrl: './material-heat-chart-drilldown-table.component.html',
  styleUrls: ['./material-heat-chart-drilldown-table.component.scss']
})
export class MaterialHeatChartDrilldownTableComponent implements OnInit, OnChanges, AfterViewInit, AfterViewChecked {
  columnProperties: any[] = [];
  dataSource!: MatTableDataSource<any>;
  matSortActive = "";
  matSortDirection: SortDirection = "asc";
  columns: any;
  rbacLevel: any;

  @Input() title: any;
  @Input() tableData: any;
  @Output() drillDownFilter: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild(MatTable) table!: MatTable<any>;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(TableHeatMapDirective) tableHeatMap!: TableHeatMapDirective;

  constructor(private readonly _reportDrilldownService: ReportDrilldownService, private readonly _rbacService: RbacService) {
    this._rbacService.getRbacDetails().subscribe((rbacDetails: any) => {
      this.rbacLevel = rbacDetails.role;
    })
   }

  ngOnInit(): void {
    // this.dataSource.paginator = this.paginator;
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;


  ngAfterViewInit() {
    this.constructTable();
  }

  ngOnChanges(): void {
    this.constructTable();
  }

  ngAfterViewChecked(): void {
    if (this.table) {
      this.table.updateStickyColumnStyles();
    }
  }



  constructTable(): void {
    if (this.tableData && this.sort) {
      setTimeout(() => {
        this.tableData.data.forEach((data:any) => {
          if (data?.percentage?.value) {
            data.percentage.value = data.percentage.value.concat('%');
          }
        });
        
        this.dataSource = new MatTableDataSource(this.tableData.data);
        this.dataSource.paginator = this.paginator;
        this.sort.sortChange.subscribe(v => console.log(v));
        this.dataSource.sortingDataAccessor = (item, property) => {
          switch (property) {
            default: return item[property].value;
          }
        };
        this.dataSource.sort = this.sort;
        let stickyColumns = [];

        this.columns = this.tableData.columns.map((column: any) => { 
          if (window.innerWidth <= 480) {
            if (stickyColumns.length === 0) {
              stickyColumns.push(true);
              column.sticky = true;
            } else {
              column.sticky = false;
            }
          }

          return column;
        });
        //this.columnProperties = [...['id'], ...this.tableData.columns.map((column: any) => column.property)];
        this.columnProperties = this.tableData.columns.map((column: any) => column.property);
        this.matSortActive = this.tableData.sortByProperty;
        this.matSortDirection = this.tableData.sortDirection;
      });
    }
  }

  contentChanged(): void {
    if (this.tableHeatMap) {
      //this.tableHeatMap.colorTheTable();
    }
  }

  onClickCell(column: any, element: any): void {
    if (column && column.action && this.rbacLevel && column.action?.allowedLevels?.includes(this.rbacLevel)) {
      let data = {
        action: column.action
      };

      column.action.dataProps.forEach((prop: any) => {
        let propName = prop.alias ? prop.alias : prop.prop;
        data[propName] = element[prop.prop]?.value ? element[prop.prop]?.value : element[prop.prop];
      });

      data = {
        ...data,
        ...column.action.extraInfo
      };

      this._reportDrilldownService.emit(data);
    }
  }
}
