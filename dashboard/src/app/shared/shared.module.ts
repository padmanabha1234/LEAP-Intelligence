import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TooltipModule } from 'ngx-bootstrap/tooltip';


import { MultiBarChartComponent } from './components/charts/multi-bar-chart/multi-bar-chart.component';
import { DashboardCardComponent } from './components/cards/dashboard-card/dashboard-card.component';
import { RouterModule } from '@angular/router';
import { MetricCardComponent } from './components/cards/metric-card/metric-card.component';
import { MapMyIndiaComponent } from './components/maps/map-my-india/map-my-india.component';
import { TableHeatMapDirective, TableHeatMapCellDirective, TableHeatMapColumnDirective } from './directives/table-heat-map/table-heat-map.directive';
import { MaterialHeatChartTableComponent } from './components/tables/material-heat-chart-table/material-heat-chart-table.component';
import { GaugeChartComponent } from './components/charts/gauge-chart/gauge-chart.component';
import { GaugeComponent } from './components/charts/gauge/gauge.component';
import { ScatterChartComponent } from './components/scatter-chart/scatter-chart.component';
import { FilterPanelComponent } from './components/filter-panel/filter-panel.component';
import { StackedBarComponent } from './components/charts/stacked-bar/stacked-bar.component';
import { PieChartComponent } from './components/charts/pie-chart/pie-chart.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LeafletMapComponent } from './components/maps/leaflet-map/leaflet-map.component';
import { BarChartComponent } from './components/charts/bar-chart/bar-chart.component';
import { MaterialButtonGroupComponent } from './components/buttons/material-button-group/material-button-group.component';
import { LevelNMetricFilterPanelComponent } from './components/level-n-metric-filter-panel/level-n-metric-filter-panel.component';
import { FullScreenDirective } from './directives/full-screen.directive';
import { MultiSelectComponent } from './components/core-components/multi-select/multi-select.component';
import { LineChartComponent } from './components/core-components/line-chart/line-chart.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { BubblesComponent } from './components/core-components/bubbles/bubbles.component';
import { ProgressCircleComponent } from './components/core-components/progress-circle/progress-circle.component';
import { NgApexchartsModule } from "ng-apexcharts";
import { DownloadButtonComponent } from './components/buttons/download-button/download-button.component';
import { TimeSeriesFilterPanelComponent } from './components/time-series-filter-panel/time-series-filter-panel.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { BigNumberComponent } from './components/big-number/big-number.component';
import { RbacDialogComponent } from './components/rbac-dialog/rbac-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { PopupOptionsComponent } from './components/buttons/popup-options/popup-options.component';
import { BreadcrumbComponentComponent } from './components/breadcrumb-component/breadcrumb-component.component';
import { SbBarChartComponent } from './components/charts/sb-bar-chart/sb-bar-chart.component';
import { DashletModule, DataService } from '@project-sunbird/sb-dashlet';
import { MaterialHeatChartDrilldownTableComponent } from './components/tables/material-heat-chart-drilldown-table/material-heat-chart-drilldown-table.component';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core'; // Add this line
import { MatIconModule } from '@angular/material/icon';
import { CriteriaComponent } from './components/criteria/criteria.component';
import { SearchFilterPipe } from './pipes/searchFilter/search-filter.pipe';

const IMPORTS: any[] = [
  ReactiveFormsModule,
  MatDialogModule,
  MatFormFieldModule,
  MatTableModule,
  MatSortModule,
  MatTooltipModule,
  NgSelectModule,
  FormsModule,
  TranslocoModule,
  NgxSpinnerModule,
  MatButtonModule,
  MatPaginatorModule,
  TooltipModule.forRoot(),
  NgCircleProgressModule.forRoot(),
  NgApexchartsModule,
  TooltipModule.forRoot(),
  NgxDaterangepickerMd.forRoot(),
  DashletModule.forRoot({
    dataService: DataService
  }),
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatIconModule

];

const DECLARATIONS = [
  RbacDialogComponent,
  MultiBarChartComponent,
  DashboardCardComponent,
  MetricCardComponent,
  MaterialHeatChartTableComponent,
  MapMyIndiaComponent,
  TableHeatMapDirective,
  TableHeatMapCellDirective,
  TableHeatMapColumnDirective,
  GaugeChartComponent,
  GaugeComponent,
  ScatterChartComponent,
  FilterPanelComponent,
  StackedBarComponent,
  PieChartComponent,
  LeafletMapComponent,
  BarChartComponent,
  MaterialButtonGroupComponent,
  LevelNMetricFilterPanelComponent,
  FullScreenDirective,
  MultiSelectComponent,
  LineChartComponent,
  BubblesComponent,
  ProgressCircleComponent,
  DownloadButtonComponent,
  TimeSeriesFilterPanelComponent,
  BigNumberComponent,
  PopupOptionsComponent,
  BreadcrumbComponentComponent,
  SbBarChartComponent,
  CriteriaComponent,
  MaterialHeatChartDrilldownTableComponent,
  SearchFilterPipe
];

@NgModule({
  declarations: [
    DECLARATIONS,
    BreadcrumbComponentComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    // DaterangepickerModule,
    IMPORTS
  ],
  exports: [
    IMPORTS,
    DECLARATIONS,
    // DaterangepickerModule

  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ]
})
export class SharedModule { }
