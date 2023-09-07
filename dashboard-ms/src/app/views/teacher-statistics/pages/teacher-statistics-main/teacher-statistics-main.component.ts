import { Component, OnInit, ViewChild } from '@angular/core';
import { TsAveragePupilTeacherRatioComponent } from './reports/ts-average-pupil-teacher-ratio/ts-average-pupil-teacher-ratio.component';
import { TsCategoryWiseAveragePupilTeacherRatioComponent } from './reports/ts-category-wise-average-pupil-teacher-ratio/ts-category-wise-average-pupil-teacher-ratio.component';
import { TsCategoryWiseTotalTeachersComponent } from './reports/ts-category-wise-total-teachers/ts-category-wise-total-teachers.component';
import { TsRankInAveragePupilTeacherRatioComponent } from './reports/ts-rank-in-average-pupil-teacher-ratio/ts-rank-in-average-pupil-teacher-ratio.component';
import { TsTotalTeachersComponent } from './reports/ts-total-teachers/ts-total-teachers.component';

@Component({
  selector: 'app-teacher-statistics-main',
  templateUrl: './teacher-statistics-main.component.html',
  styleUrls: ['./teacher-statistics-main.component.scss']
})
export class TeacherStatisticsMainComponent implements OnInit {

  bigNumberReports: any = {};
  academicYear: string[] = [];
  minYear: any;
  maxYear: any;

  @ViewChild('totalteachers') totalTeachersComponent: TsTotalTeachersComponent;
  @ViewChild('averagepupilteacherratio') averagepupilteacherratioComponent: TsAveragePupilTeacherRatioComponent;
  @ViewChild('catWiseTotalTeacher') catWiseTotalTeacher: TsCategoryWiseTotalTeachersComponent;
  @ViewChild('catWiseAvgPupilTeacherRatio') catWiseAvgPupilTeacherRatio: TsCategoryWiseAveragePupilTeacherRatioComponent;
  @ViewChild('rankAvgPupilTeacherRatio') rankAvgPupilTeacherRatio: TsRankInAveragePupilTeacherRatioComponent

  constructor() { }

  ngOnInit(): void {
  }

  appendBigNumber({ data, reportName }) {
    this.bigNumberReports = {
      ...this.bigNumberReports,
      [reportName]: data
    }
    console.log('the ddata is ............',data);

  }
  minMaxDate(dates:any){
    let minYear = this.minYear < parseInt(dates?.minYear) ? this.minYear : parseInt(dates?.minYear);
    let maxYear = this.maxYear > parseInt(dates?.maxYear) ? this.maxYear : parseInt(dates?.maxYear);

    for (let year = minYear; year <= maxYear; year++) {
      if (this.academicYear.indexOf(String(year)) === -1) {
        this.academicYear.push(String(year));
      }
    }
  }
  onSelectOption(selectedvalue: any): void {
    this.totalTeachersComponent.getReportData(selectedvalue)
    this.averagepupilteacherratioComponent.getReportData(selectedvalue)
    this.catWiseTotalTeacher.getReportData(selectedvalue)
    this.catWiseAvgPupilTeacherRatio.getReportData(selectedvalue)
    this.rankAvgPupilTeacherRatio.getReportData(selectedvalue)
  }
  getObjectlen(object: Object) {
    return Object.keys(object).length
  }

}
