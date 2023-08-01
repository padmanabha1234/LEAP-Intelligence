import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoryWiseTotalSchoolsComponent } from './reports/category-wise-total-schools/category-wise-total-schools.component';
import { EnrolmentWiseSchoolsComponent } from './reports/enrolment-wise-schools/enrolment-wise-schools.component';
import { TotalSchoolsComponent } from './reports/total-schools/total-schools.component';

@Component({
  selector: 'app-total-school-statistics',
  templateUrl: './total-school-statistics.component.html',
  styleUrls: ['./total-school-statistics.component.scss']
})
export class TotalSchoolStatisticsComponent implements OnInit {

  bigNumberReports: any = {};
  academicYear: string[] = [];
  minYear: any;
  maxYear: any;

  @ViewChild('totalschools') totalschools:TotalSchoolsComponent;
  @ViewChild('categoryWiseTotalSchools') categoryWiseTotalSchools: CategoryWiseTotalSchoolsComponent;
  @ViewChild('enrolmentWiseSchools') enrolmentWiseSchools: EnrolmentWiseSchoolsComponent;
  constructor() { }

  ngOnInit(): void {
  }

  appendBigNumber({data,reportName}) {
    this.bigNumberReports = { 
      ...this.bigNumberReports,
      [reportName]:data
  
    }
  }
  getObjectlen(object:Object){
    return Object.keys(object).length
  }

  minMaxDate(dates: any) {
    console.log(dates)
    let minYear = this.minYear < parseInt(dates?.minYear) ? this.minYear : parseInt(dates?.minYear);
    let maxYear = this.maxYear > parseInt(dates?.maxYear) ? this.maxYear : parseInt(dates?.maxYear);

    for (let year = minYear; year <= maxYear; year++) {
      if (this.academicYear.indexOf(String(year)) === -1) {
        this.academicYear.push(String(year));
      }
    }
  }

  onSelectOption(selectedvalue: any): void {
    this.totalschools?.getReportData(selectedvalue);
    this.categoryWiseTotalSchools?.getReportData(selectedvalue);
    this.enrolmentWiseSchools?.getReportData(selectedvalue);
  }

}
