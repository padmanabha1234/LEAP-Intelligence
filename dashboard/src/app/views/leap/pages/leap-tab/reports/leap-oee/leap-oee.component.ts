import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonService } from 'src/app/core/services/common/common.service';
import { DataService } from 'src/app/core/services/data.service';
import { RbacService } from 'src/app/core/services/rbac-service.service';
import { WrapperService } from 'src/app/core/services/wrapper.service';
import { buildQuery, parseFilterToQuery, parseRbacFilter, parseTimeSeriesQuery } from 'src/app/utilities/QueryBuilder';
import { config } from '../../../../config/leap_config';
import { LeapTabComponent } from '../../leap-tab.component';
import { OeeService } from 'src/app/core/services/oee.service';

@Component({
  selector: 'app-leap-oee',
  templateUrl: './leap-oee.component.html',
  styleUrls: ['./leap-oee.component.scss']
})
export class LeapOeeComponent implements OnInit {

  gaugeData :any;
  reportName: string = 'leap_OEE_bignumber';
  filters: any = [];
  levels: any;
  reportData: any = {
    reportName: "leap_OEE_bignumber"
  };
  title: string = 'Overall Equipment Efficiency'
  selectedYear: any;
  selectedMonth: any;
  startDate: any;
  endDate: any;
  config: any;
  compareDateRange: any = 30;
  filterIndex: any;
  rbacDetails: any;
  description :any ='This is a standard that measures the percentage of manufacturing time that is truly productive. It was developed to help manufacturers better understand how efficiently their operations are running and where there may be opportunities for improvement. It is calculated as product of Availability, Performance and Quality';
  @Output() exportReportData = new EventEmitter<any>();

  constructor(private oeeService:OeeService,private readonly _dataService: DataService,private csv:LeapTabComponent, private readonly _wrapperService: WrapperService, private _rbacService: RbacService) {
    this._rbacService.getRbacDetails().subscribe((rbacDetails: any) => {
      this.rbacDetails = rbacDetails;
    })
  }

  ngOnInit(): void {
  }

  getReportData(values: { filterValues: any, timeSeriesValues: any }): void {
    setTimeout(async () => {
      let data =  await this.oeeService.getOEE();
      let gaugedata = {
       percentage: data.toFixed(2),
       options: {
         title: this.description,
       },
     };
     this.gaugeData = gaugedata;   
    }, 700);
   
  
  }

  renderBulb(): boolean {
    return this.gaugeData && Number(this.gaugeData.percentage) < 54;
  }


}
