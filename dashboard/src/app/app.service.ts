import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../src/environments/environment';
import { KeycloakSecurityService } from './keycloak-security.service';
import * as config from '../assets/data/config.json'
import { ExportToCsv } from 'export-to-csv';
import { BehaviorSubject } from 'rxjs';
import * as json2csv from 'json2csv';
import { saveAs } from 'file-saver';
import { ActivatedRoute, Router } from '@angular/router';
import { formatNumberForReport } from './utilities/NumberFomatter';

export var globalMap;
declare const $;

@Injectable({
  providedIn: "root",
})
export class AppServiceComponent {
  // toggleMenu = new BehaviorSubject<any>(false);
  // callProgressCard = new BehaviorSubject<any>(false);
  // public token;
  // telemetryData: any;
  // showBack = true;
  // showHome = true;
  // mapCenterLatlng = config.default[`${environment.stateCode}`];

  // public state = this.mapCenterLatlng.name;
  // date = new Date();
  // dateAndTime: string;
  // static state: any;

  // constructor(
  //   public http: HttpClient,
  //   private route: ActivatedRoute,
  //   private router: Router,
  // ) {

  //   this.dateAndTime = `${("0" + this.date.getDate()).slice(-2)}-${(
  //     "0" +
  //     (this.date.getMonth() + 1)
  //   ).slice(-2)}-${this.date.getFullYear()}`;
  // }

  // homeControl() {
  //   if (window.location.hash == "#/dashboard") {
  //     this.showBack = true;
  //     this.showHome = false;
  //   } else {
  //     this.showBack = false;
  //     this.showHome = true;
  //   }
  // }

  // changeingStringCases(str) {
  //   let result = "";
  //   let strArr = str.split("_");
  //   for (let i = 0; i < strArr.length; i++) {
  //     result += strArr[i].replace(/\w\S*/g, function (txt) {
  //       return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase() + " ";
  //     });
  //   }
  //   return result;
  // }

  // private tokenExpired(token: string) {
  //   let dateNow = new Date();
  //   const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;

  //   return (Math.round(dateNow.getTime() / 1000)) >= expiry;
  // }
  // //localStorage.getItem('user_id'), this.roleIds.find(o => o.name == 'report_viewer'), this.otpConfig
  // // to load and hide the spinner
  // loaderAndErr(data) {
  //   if (data.length !== 0) {
  //     document.getElementById("spinner") ? document.getElementById("spinner").style.display = "none" : "";
  //   } else {
  //     document.getElementById("spinner") ? document.getElementById("spinner").style.display = "none" : "";
  //     document.getElementById("errMsg")
  //       ? (document.getElementById("errMsg").style.color = "red")
  //       : "";
  //     document.getElementById("errMsg")
  //       ? (document.getElementById("errMsg").style.display = "block")
  //       : "";
  //     document.getElementById("errMsg")
  //       ? (document.getElementById("errMsg").innerHTML = "No data found")
  //       : "";
  //   }
  // }
  // errMsg() {
  //   document.getElementById("errMsg")
  //     ? (document.getElementById("errMsg").style.display = "none")
  //     : "";
  //   if (document.getElementById("spinner")) {
  //     document.getElementById("spinner").style.display = "block";
  //     document.getElementById("spinner").style.marginTop = "3%";
  //   }
  // }

  // capitalize(key) {
  //   key = key.replace("Id", "ID");
  //   key = key.replace("Nsqf", "NSQF");
  //   key = key.replace("Ict", "ICT");
  //   key = key.replace("Crc", "CRC");
  //   key = key.replace("Cctv", "CCTV");
  //   key = key.replace("Cwsn", "CWSN");
  //   key = key.replace("Ff Uuid", "UUID");
  //   return key;
  // }




  // //Download reports....
  // download(fileName, reportData, reportName = "") {

  //   if (reportData.length <= 0) {
  //     alert("No data found to download");
  //   } else {
  //     let keys
  //     if (reportName === 'pieChart') {
  //       keys = Object.keys(reportData[0]).sort();
  //     } else {
  //       keys = Object.keys(reportData[0]);
  //     }
  //     var updatedKeys = [];
  //     keys.map((key) => {
  //       let actualKey = key;
  //       if (reportName == 'pieChart') {
  //         if (key == 'total_content_plays') {
  //           key = key.concat(`_${this.state}`)
  //         }
  //         if (key == 'total_content_plays_percent') {
  //           key = key.concat(`_${this.state}`)
  //         }
  //       }

  //       if (reportName == 'overTheYears') {
  //         if (key == 'plays') {
  //           key = `total_content_plays_${this.state}`
  //         }
  //       }
  //       if (reportName == 'perCapita') {
  //         if (key == 'expected_etb_users') {
  //           key = `Expected_ETB_Users`
  //         }
  //         if (key == 'actual_etb_users') {
  //           key = `Actual_ETB_Users`
  //         }


  //       }

  //       key = key
  //         .replace(/_/g, " ")
  //         .toLowerCase()
  //         .split(" ")
  //         .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  //         .join(" ");
  //       key = this.capitalize(key);
  //       if (reportName == "pieChart") {
  //         if (key == "Object Type") {
  //           updatedKeys.unshift({
  //             label: key,
  //             value: actualKey
  //           })
  //         } else {
  //           updatedKeys.push({
  //             label: key,
  //             value: actualKey
  //           });
  //         }

  //       } else if (reportName == "gpsOfLearningTpd") {
  //         if (key == "District ID") {
  //           updatedKeys.splice(0, 0, {
  //             label: key,
  //             value: actualKey
  //           });
  //         }
  //         else if (key == "District Name") {
  //           updatedKeys.splice(1, 0, {
  //             label: key,
  //             value: actualKey
  //           });
  //         } else {
  //           updatedKeys.push({
  //             label: key,
  //             value: actualKey
  //           });
  //         }

  //       } else if (reportName == "gpsOfLearningEtb") {
  //         if (key == "District ID") {
  //           updatedKeys.splice(0, 0, {
  //             label: key,
  //             value: actualKey
  //           });
  //         }
  //         else if (key == "District Name") {
  //           updatedKeys.splice(1, 0, {
  //             label: key,
  //             value: actualKey
  //           });
  //         } else {
  //           updatedKeys.push({
  //             label: key,
  //             value: actualKey
  //           });
  //         }

  //       } else if (reportName == "perCapita") {
  //         if (key == "District Name") {
  //           updatedKeys.splice(0, 0, {
  //             label: key,
  //             value: actualKey
  //           });
  //         } else {
  //           updatedKeys.push({
  //             label: key,
  //             value: actualKey
  //           });
  //         }
  //         if (key === "Expected Etb Users") {
  //           return key = "Expected ETB Users"
  //         }
  //       } else {
  //         updatedKeys.push({
  //           label: key,
  //           value: actualKey
  //         });
  //       }


  //     });

  //     reportData.forEach((obj: any) => {
  //       Object.keys(obj).forEach((key: any) => {
  //         obj[key] = !isNaN(obj[key]) ? formatNumberForReport(Number(obj[key])) : obj[key]
  //       });
  //     });
  //     const opts = { fields: updatedKeys, output: fileName };
  //     const csv = json2csv.parse(reportData, opts);

  //     let file = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  //     saveAs(file, `${fileName}.csv`);
  //   }
  // }

  // //color gredient generation....
  // public color(data, filter) {
  //   var keys = Object.keys(this.colors);
  //   var dataSet = {};
  //   var setColor = "";
  //   dataSet = data;
  //   for (let i = 0; i < keys.length; i++) {
  //     if (dataSet[filter] <= parseInt(keys[i])) {
  //       setColor = this.colors[keys[i]];
  //       break;
  //     } else if (
  //       dataSet[filter] > parseInt(keys[i]) &&
  //       dataSet[filter] <= parseInt(keys[i + 1])
  //     ) {
  //       setColor = this.colors[keys[i + 1]];
  //       break;
  //     }
  //   }
  //   return setColor;
  // }

  // //generate table colors
  // public tableCellColor(data) {
  //   var keys = Object.keys(this.colors);
  //   var setColor = "";
  //   for (let i = 0; i < keys.length; i++) {
  //     if (data <= parseInt(keys[i])) {
  //       setColor = this.colors[keys[i]];
  //       break;
  //     } else if (data > parseInt(keys[i]) && data <= parseInt(keys[i + 1])) {
  //       setColor = this.colors[keys[i + 1]];
  //       break;
  //     }
  //   }
  //   return setColor;
  // }

  // // color gredient based on intervals
  // colorGredient(data, filter) {
  //   var keys = Object.keys(this.colors);
  //   var dataSet = {};
  //   var setColor = "";
  //   if (filter == "Infrastructure_Score" || filter == "infrastructure_score") {
  //     dataSet = data.details;
  //   } else {
  //     if (data.indices) {
  //       dataSet = data.indices;
  //     } else {
  //       dataSet = data.metrics;
  //     }
  //   }
  //   for (let i = 0; i < keys.length; i++) {
  //     if (dataSet[filter] <= parseInt(keys[i])) {
  //       setColor = this.colors[keys[i]];
  //       break;
  //     } else if (
  //       dataSet[filter] >= parseInt(keys[i]) &&
  //       dataSet[filter] <= parseInt(keys[i + 1])
  //     ) {
  //       setColor = this.colors[keys[i + 1]];
  //       break;
  //     }
  //   }
  //   return setColor;
  // }

  // tpdCapitaColorGredient(data, filter) {
  //   var keys = Object.keys(this.tpdCapitaColors);
  //   var dataSet = data;
  //   var setColor = "";
  //   for (let i = 0; i < keys.length; i++) {
  //     if (filter == keys[i]) {
  //       setColor = this.tpdCapitaColors[keys[i]];
  //       break;
  //     } else if (
  //       dataSet[filter] >= parseInt(keys[i]) &&
  //       dataSet[filter] <= parseInt(keys[i + 1])
  //     ) {
  //       setColor = this.tpdCapitaColors[keys[i + 1]];
  //       break;
  //     }
  //   }
  //   return setColor;
  // }




  // // color gredient based on intervals
  // tpdColorGredient(data, filter) {

  //   var keys = Object.keys(this.tpdColors);
  //   var dataSet = data;
  //   var setColor = "";
  //   for (let i = 0; i < keys.length; i++) {
  //     if (filter == parseInt(keys[i])) {
  //       setColor = this.tpdColors[keys[i]];
  //       break;
  //     } else if (
  //       dataSet[filter] >= parseInt(keys[i]) &&
  //       dataSet[filter] <= parseInt(keys[i + 1])
  //     ) {
  //       setColor = this.tpdColors[keys[i + 1]];
  //       break;
  //     }
  //   }
  //   return setColor;
  // }


  // // color gredient based on intervals
  // commonColorGredient(data, filter) {
  //   var keys = Object.keys(this.commonColors);
  //   var dataSet = data;
  //   var setColor = "";
  //   for (let i = 0; i < keys.length; i++) {
  //     if (filter == parseInt(keys[i])) {
  //       setColor = this.commonColors[keys[i]];
  //       break;
  //     } else if (
  //       dataSet[filter] >= parseInt(keys[i]) &&
  //       dataSet[filter] <= parseInt(keys[i + 1])
  //     ) {
  //       setColor = this.commonColors[keys[i + 1]];
  //       break;
  //     }
  //   }
  //   return setColor;
  // }

  // getTpdMapRelativeColors(markers, filter) {
  //   var values = [];
  //   markers.map((item) => {
  //     var keys = Object.keys(item);
  //     if (keys.includes(filter.value)) {
  //       values.push(item[`${filter.value}`]);
  //     } else {
  //       values.push(item[`total_schools_with_missing_data`]);
  //     }
  //   });
  //   let uniqueItems = [...new Set(values)];
  //   uniqueItems = uniqueItems.map((a) => {
  //     if (typeof a == "object") {
  //       return a["percentage"];
  //     } else {
  //       return a;
  //     }
  //   });
  //   uniqueItems = uniqueItems.sort(function (a, b) {
  //     return filter.report != "exception"
  //       ? parseFloat(a) - parseFloat(b)
  //       : parseFloat(b) - parseFloat(a);
  //   });

  //   let uniqueItems1 = []

  //   const min = Math.min(...uniqueItems);
  //   const max = Math.max(...uniqueItems);


  //   const ranges = [];

  //   const getRangeArray = (min, max, n) => {
  //     const delta = (max - min) / n;
  //     let range1 = min;
  //     for (let i = 0; i < n; i += 1) {
  //       const range2 = range1 + delta;
  //       uniqueItems1.push(`${range2}`);

  //       range1 = range2;
  //     }

  //     return ranges;
  //   };

  //   const rangeArrayIn5Parts = getRangeArray(min, max, 5);

  //   var colorsArr = ["#a5c0ec", "#6996df", "#2d6cd2", "#204d96", "#132e5a"]
  //   var colors = {};
  //   uniqueItems = uniqueItems.map(function (x) { 
  //     return Number(x)
  //   });
  //   uniqueItems1 = uniqueItems1.map(function (x) { 
  //     return Number(x)
  //   });
  //   uniqueItems.map((a, i) => {
  //     if (a <= uniqueItems1[0]) {
  //       colors[`${a}`] = colorsArr[0];
  //     } else if (a > uniqueItems1[0] && a <= uniqueItems1[1]) {
  //       colors[`${a}`] = colorsArr[1];
  //     } else if (a > uniqueItems1[1] && a <= uniqueItems1[2]) {
  //       colors[`${a}`] = colorsArr[2];
  //     } else if (a > uniqueItems1[2] && a <= uniqueItems1[3]) {
  //       colors[`${a}`] = colorsArr[3];
  //     } else if (a > uniqueItems1[3]) {
  //       colors[`${a}`] = colorsArr[4];
  //     }

  //   });
  //   return colors;

  // }



  // commonRelativeColors(markers, filter) {

  //   var values = [];
  //   markers.map((item) => {
  //     var keys = Object.keys(item);
  //     if (keys.includes(filter.value)) {
  //       values.push(item[`${filter.value}`]);
  //     } else {
  //       values.push(item[`total_schools_with_missing_data`]);
  //     }
  //   });

  //   let uniqueItems = [...new Set(values)];
  //   uniqueItems = uniqueItems.map((a) => {
  //     if (typeof a == "object") {
  //       return a["percentage"];
  //     } else {
  //       return a;
  //     }
  //   });
  //   uniqueItems = uniqueItems.sort(function (a, b) {
  //     return filter.report != "exception"
  //       ? parseFloat(a) - parseFloat(b)
  //       : parseFloat(b) - parseFloat(a);
  //   });

  //   let uniqueItems1 = []

  //   const min = Math.min(...uniqueItems);
  //   const max = Math.max(...uniqueItems);


  //   const ranges = [];

  //   const getRangeArray = (min, max, n) => {
  //     if (min === max) {
  //       min = 0;
  //     }

  //     const delta = (max - min) / n;
  //     let range1 = Math.ceil(min);
  //     for (let i = 0; i < n; i += 1) {
  //       const range2 = Math.ceil(range1 + delta);
  //       uniqueItems1.push(`${range2}`);

  //       range1 = range2;
  //     }
  //     return ranges;
  //   };

  //   const rangeArrayIn5Parts = getRangeArray(min, max, 10);

  //   var colorsArr = [
  //     "#cfddf5",
  //     "#aec6ee",
  //     "#8eb0e7",
  //     "#6e99e0",
  //     "#4e83d9",
  //     "#2d6cd2",
  //     "#265bb1",
  //     "#1f4b91",
  //     "#183a71",
  //     "#112a51",
  //   ];
  //   var colors = {};

  //   uniqueItems.map((a, i) => {
  //     if (a <= uniqueItems1[0]) {
  //       colors[`${a}`] = colorsArr[0];
  //     } else if (a > uniqueItems1[0] && a <= uniqueItems1[1]) {
  //       colors[`${a}`] = colorsArr[1];
  //     } else if (a > uniqueItems1[1] && a <= uniqueItems1[2]) {
  //       colors[`${a}`] = colorsArr[2];
  //     } else if (a > uniqueItems1[2] && a <= uniqueItems1[3]) {
  //       colors[`${a}`] = colorsArr[3];
  //     } else if (a > uniqueItems1[3] && a <= uniqueItems1[4]) {
  //       colors[`${a}`] = colorsArr[4];
  //     } else if (a > uniqueItems1[4] && a <= uniqueItems1[5]) {
  //       colors[`${a}`] = colorsArr[5];
  //     } else if (a > uniqueItems1[5] && a <= uniqueItems1[6]) {
  //       colors[`${a}`] = colorsArr[6];
  //     } else if (a > uniqueItems1[6] && a <= uniqueItems1[7]) {
  //       colors[`${a}`] = colorsArr[7];
  //     } else if (a > uniqueItems1[7] && a <= uniqueItems1[8]) {
  //       colors[`${a}`] = colorsArr[8];
  //     } else if (a > uniqueItems1[8] && a <= uniqueItems1[9]) {
  //       colors[`${a}`] = colorsArr[9];
  //     } else {
  //       colors[`${a}`] = colorsArr[9];
  //     }

  //   })
  //   return colors;

  // }

  // getTpdMapCapitaRelativeColors(markers, filter) {
  //   var values = [];
  //   var quartile1 = markers.filter((marker) => marker.quartile === 1);
  //   var quartile2 = markers.filter((marker) => marker.quartile === 2);
  //   var quartile3 = markers.filter((marker) => marker.quartile === 3);

  //   var colorsArr = ["#b9cef0", "#2d6cd2", "#0f2446"];
  //   var colors = {};
  //   quartile1.map((a, i) => {
  //     colors[`${a.total_content_plays}`] = colorsArr[0];
  //   });
  //   quartile2.map((a, i) => {
     
  //     colors[`${a.total_content_plays}`] = colorsArr[1];
  //   });
  //   quartile3.map((a, i) => {
  //     colors[`${a.total_content_plays}`] = colorsArr[2];
  //   });

  //   return colors;
  // }



  // colorGredientForDikshaMaps(data, filter, colors) {

  //   let keys = Object.keys(colors);

  //   let setColor = "";
  //   for (let i = 0; i < keys.length; i++) {
  //     if (data[filter] == null) setColor = "red";
  //     if (parseFloat(data[filter]) == parseFloat(keys[i])) {

  //       setColor = colors[keys[i]];

  //       break;
  //     }
  //   }
  //   return setColor;
  // }

  // commonColorGredientForMaps(data, filter, colors) {

  //   let keys = Object.keys(colors);

  //   let setColor = "";
  //   for (let i = 0; i < keys.length; i++) {
  //     if (data[filter] == null) setColor = "red";
  //     if (parseFloat(data[filter]) == parseFloat(keys[i])) {

  //       setColor = colors[keys[i]];

  //       break;
  //     }
  //   }
  //   return setColor;
  // }

  // colorGredientForCapitaMaps(data, filter, colors) {
  //   let keys = Object.keys(colors);
  //   let setColor = "";
  //   for (let i = 0; i < keys.length; i++) {
  //     if (data[filter] == null) setColor = "red";
  //     if (parseFloat(data[filter]) == parseFloat(keys[i])) {
  //       setColor = colors[keys[i]];
  //       break;
  //     }
  //   }
  //   return setColor;
  // }

  // //generating relative colors
  // // color gredient based on intervals
  // relativeColorGredient(data, filter, colors) {
  //   var keys = Object.keys(colors);
  //   var dataSet = {};
  //   var setColor = "";
  //   if (!filter.report) {
  //     if (
  //       filter == "Infrastructure_Score" ||
  //       filter == "infrastructure_score"
  //     ) {
  //       dataSet = data.details;
  //     } else {
  //       if (data.indices) {
  //         dataSet = data.indices;
  //       } else {
  //         dataSet = data.metrics;
  //       }
  //     }
  //   } else {
  //     if (!filter.selected) {
  //       var objkeys = Object.keys(data);
  //       if (!objkeys.includes(filter.value)) {
  //         filter.value = `total_schools_with_missing_data`;
  //       }
  //       dataSet = data;
  //     } else {
  //       if (filter.selected == "G" || filter.selected == "GS") {
  //         if (data.Subjects) {
  //           dataSet = data.Subjects;
  //         } else {
  //           dataSet = data["Grade Wise Performance"];
  //         }
  //       } else {
  //         dataSet = data.Details;
  //       }
  //     }
  //   }
  //   if (filter.report == "exception") {
  //     keys = keys.sort(function (a: any, b: any) {
  //       return a - b;
  //     });
  //   }
  //   for (let i = 0; i < keys.length; i++) {
  //     let val = filter.value ? filter.value : filter;
  //     if (dataSet[val] == null) setColor = "red";
  //     if (parseFloat(dataSet[val]) == parseFloat(keys[i])) {
  //       setColor = colors[keys[i]];
  //       break;
  //     }
  //   }
  //   return setColor;
  // }

  // getRelativeColors(markers, filter) {
  //   var values = [];
  //   markers.map((item) => {
  //     if (!filter.report) {
  //       if (
  //         filter == "infrastructure_score" ||
  //         filter == "Infrastructure_Score"
  //       ) {
  //         values.push(item.details[`${filter}`]);
  //       } else {
  //         if (item.metrics) {
  //           values.push(item.metrics[`${filter}`]);
  //         } else {
  //           values.push(item.indices[`${filter}`]);
  //         }
  //       }
  //     } else {
  //       if (!filter.selected) {
  //         var keys = Object.keys(item);
  //         if (keys.includes(filter.value)) {
  //           values.push(item[`${filter.value}`]);
  //         } else {
  //           values.push(item[`total_schools_with_missing_data`]);
  //         }
  //       } else {
  //         if (filter.selected == "G" || filter.selected == "GS") {
  //           if (item.Subjects) {
  //             values.push(item.Subjects[`${filter.value}`]);
  //           } else {
  //             values.push(item["Grade Wise Performance"][`${filter.value}`]);
  //           }
  //         } else {
  //           values.push(item.Details[`${filter.value}`]);
  //         }
  //       }
  //     }
  //   });
  //   let uniqueItems = [...new Set(values)];
  //   uniqueItems = uniqueItems.map((a) => {
  //     if (typeof a == "object") {
  //       return a["percentage"];
  //     } else {
  //       return a;
  //     }
  //   });
  //   uniqueItems = uniqueItems.sort(function (a, b) {
  //     return filter.report != "exception"
  //       ? parseFloat(a) - parseFloat(b)
  //       : parseFloat(b) - parseFloat(a);
  //   });
  //   var colorsArr =
  //     uniqueItems.length == 1
  //       ? filter.report != "exception"
  //         ? ["#a5c0ec"]
  //         : ["#204d96"]
  //       : this.exceptionColor().generateGradient(
  //         "#C9DAF7",
  //         "#d8ead3",
  //         uniqueItems.length,
  //         "rgb"
  //       );
  //   var colors = {};
  //   uniqueItems.map((a, i) => {
  //     colors[`${a}`] = colorsArr[i];
  //   });
  //   console.log(colors)
  //   return colors;
  // }


  // edate;

  // public commonColors: any = {
  //   1: "#cfddf5",
  //   2: "#aec6ee",
  //   3: "#8eb0e7",
  //   4: "#6e99e0",
  //   5: "#4e83d9",
  //   6: "#2d6cd2",
  //   7: "#265bb1",
  //   8: "#1f4b91",
  //   9: "#183a71",
  //   10: "#112a51",
  // };

  // public colors = {
  //   10: "#cfddf5",
  //   20: "#aec6ee",
  //   30: "#8eb0e7",
  //   40: "#6e99e0",
  //   50: "#4e83d9",
  //   60: "#2d6cd2",
  //   70: "#265bb1",
  //   80: "#1f4b91",
  //   90: "#183a71",
  //   100: "#112a51",
  // };

  // public tpdColors = {
  //   0: "#d5e2f6",
  //   1: "#81a7e4",
  //   2: "#2d6cd2",
  //   3: "#1b417e",
  //   4: "#09162a",
  // };

  // public tpdCapitaColors = {
  //   0: "#b9cef0",
  //   1: "#2d6cd2",
  //   2: "#0f2446",
  // };

  // //color gredient generation....
  // public exceptionColor() {
  //   // Converts a #ffffff hex string into an [r,g,b] array
  //   function hex2rgb(hex) {
  //     const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  //     return result
  //       ? [
  //         parseInt(result[1], 16),
  //         parseInt(result[2], 16),
  //         parseInt(result[3], 16),
  //       ]
  //       : null;
  //   }

  //   // Inverse of the above
  //   function rgb2hex(rgb) {
  //     return (
  //       "#" +
  //       ((1 << 24) + (rgb[0] << 16) + (rgb[1] << 8) + rgb[2])
  //         .toString(16)
  //         .slice(1)
  //     );
  //   }

  //   // Interpolates two [r,g,b] colors and returns an [r,g,b] of the result

  //   function _interpolateRgb(color1, color2, factor) {
  //     if (arguments.length < 3) {
  //       factor = 0.5;
  //     }

  //     let result = color1.slice();

  //     for (let i = 0; i < 3; i++) {
  //       result[i] = Math.round(result[i] + factor * (color2[i] - color1[i]));
  //     }
  //     return result;
  //   }

  //   function generateGradient(color1, color2, total, interpolation) {
  //     const colorStart = typeof color1 === "string" ? hex2rgb(color1) : color1;
  //     const colorEnd = typeof color2 === "string" ? hex2rgb(color2) : color2;

  //     // will the gradient be via RGB or HSL
  //     switch (interpolation) {
  //       case "rgb":
  //         return colorsToGradientRgb(colorStart, colorEnd, total);
  //       case "hsl":
  //       //   return colorsToGradientHsl(colorStart, colorEnd, total);
  //       default:
  //         return false;
  //     }
  //   }

  //   function colorsToGradientRgb(startColor, endColor, steps) {
  //     // returns array of hex values for color, since rgb would be an array of arrays and not strings, easier to handle hex strings
  //     let arrReturnColors = [];
  //     let interimColorRGB;
  //     let interimColorHex;
  //     const totalColors = steps;
  //     const factorStep = 1 / (totalColors - 1);

  //     for (let idx = 0; idx < totalColors; idx++) {
  //       interimColorRGB = _interpolateRgb(
  //         startColor,
  //         endColor,
  //         factorStep * idx
  //       );
  //       interimColorHex = rgb2hex(interimColorRGB);
  //       arrReturnColors.push(interimColorHex);
  //     }
  //     return arrReturnColors;
  //   }
  //   return {
  //     generateGradient,
  //   };
  // }

  // //Get table columns
  // getColumns(dataSet) {
  //   var my_columns = [];
  //   $.each(dataSet[0], function (key, value) {
  //     var my_item = {};
  //     my_item["data"] = key;
  //     my_item["value"] = value;
  //     my_columns.push(my_item);
  //   });
  //   return my_columns;
  // }



  // setProgressCardValue(status) {
  //   this.callProgressCard.next(status);
  // }

  // setToggleMenuValue(status) {
  //   this.toggleMenu.next(status);
  // }
}