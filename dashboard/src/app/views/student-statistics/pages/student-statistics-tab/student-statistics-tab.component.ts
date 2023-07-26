import { Component, OnInit, ViewChild } from '@angular/core';
import { GenderWiseStudentEnrollmentComponent } from './reports/gender-wise-student-enrollment/gender-wise-student-enrollment.component';
import { GradeCategoryWiseEnrollmentComponent } from './reports/grade-category-wise-enrollment/grade-category-wise-enrollment.component';
import { RankStudentsAndCwsnEnrollmentComponent } from './reports/rank-students-and-cwsn-enrollment/rank-students-and-cwsn-enrollment.component';
import { StudentCategoryWiseEnrollmentComponent } from './reports/student-category-wise-enrollment/student-category-wise-enrollment.component';
import { StudentsAndCwsnEnrollmentComponent } from './reports/students-and-cwsn-enrollment/students-and-cwsn-enrollment.component';
import { TotalStudentsEnrolledComponent } from './reports/total-students-enrolled/total-students-enrolled.component';

@Component({
  selector: 'app-student-statistics-tab',
  templateUrl: './student-statistics-tab.component.html',
  styleUrls: ['./student-statistics-tab.component.scss']
})
export class StudentStatisticsTabComponent implements OnInit {

  bigNumberReports: any = {};
  academicYear: string[] = [];
  minYear: any;
  maxYear: any;
  csvReportData:any;

  @ViewChild('totalStudentsEnrolled') totalStudentsEnrolled: TotalStudentsEnrolledComponent;
  @ViewChild('studentsAndCwsnEnrollment') studentsAndCwsnEnrollment: StudentsAndCwsnEnrollmentComponent;
  @ViewChild('genderWiseStudentEnrollment') genderWiseStudentEnrollment: GenderWiseStudentEnrollmentComponent;
  @ViewChild('gradeCatWiseEnrollment') gradeCatWiseEnrollment: GradeCategoryWiseEnrollmentComponent;
  @ViewChild('studentCatWiseEnrollment') studentCatWiseEnrollment: StudentCategoryWiseEnrollmentComponent;
  @ViewChild('rankStudentsAndCwsnEnrollment') rankStudentsAndCwsnEnrollment: RankStudentsAndCwsnEnrollmentComponent;
fileName: string='sd';

    constructor() { }

  ngOnInit(): void {
  }

  appendBigNumber({ data, reportName }) {
    this.bigNumberReports = {
      ...this.bigNumberReports,
      [reportName]: data
    }
  }

  minMaxDate(dates: any) {
    // console.log('the whole entire data ',dates.data);
    if(dates.data){
      this.csvReportData = dates.data
    }
    // console.log('dhbhbf',this.csvReportData);
    let minYear = this.minYear < parseInt(dates?.minYear) ? this.minYear : parseInt(dates?.minYear);
    let maxYear = this.maxYear > parseInt(dates?.maxYear) ? this.maxYear : parseInt(dates?.maxYear);

    for (let year = minYear; year <= maxYear; year++) {
      if (this.academicYear.indexOf(String(year)) === -1) {
        this.academicYear.push(String(year));
      }
    }
  }

  onSelectOption(selectedvalue: any): void {
    this.totalStudentsEnrolled?.getReportData(selectedvalue);
    this.studentsAndCwsnEnrollment?.getReportData(selectedvalue);
    this.genderWiseStudentEnrollment?.getReportData(selectedvalue);
    this.gradeCatWiseEnrollment?.getReportData(selectedvalue);
    this.studentCatWiseEnrollment?.getReportData(selectedvalue);
    this.rankStudentsAndCwsnEnrollment?.getReportData(selectedvalue);
  }

}

