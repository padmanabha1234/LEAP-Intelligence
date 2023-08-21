import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { formatNumberForReport, numberLabelFormatForReport } from 'src/app/utilities/NumberFomatter';
import * as json2csv from 'json2csv';
// import { Parser } from 'json2csv'
import { saveAs } from 'file-saver';
import { PdfDownloadService } from 'src/app/core/services/pdf-download.service';
import * as Title from '../../../../../assets/config/ui_config.json'
import { stateNames } from '../../../../core/config/StateCodes';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-popup-options',
  templateUrl: './popup-options.component.html',
  styleUrls: ['./popup-options.component.scss']
})
export class PopupOptionsComponent implements OnInit {

  @Input() reportName!: string;
  @ViewChild('contentElement') contentElement!: ElementRef;
  contentElementRef!: ElementRef<HTMLElement>;
  @Input() data: any;
  divData: any;
  title: any;
  stateName: any;
  config: string = 'VSK'
  NVSK: boolean = true;

  constructor(private pdfDownloadService: PdfDownloadService, private renderer: Renderer2, private el: ElementRef) { }
  showOptionsvalue: any = false;
  ngOnInit(): void {
    if (this.config === 'VSK') {
      this.NVSK = false
      let names: any = stateNames;
      names.every((state: any) => {
        if (state.stateCode == environment.stateCode) {
          this.stateName = state.stateName.toUpperCase();
          return false;
        }
        return true;
      });
    }
    else {
      this.stateName = 'India'
    }
    this.title = Title;
    this.contentElementRef = this.pdfDownloadService.contentElementRef;
    document.addEventListener("click", (event) => {
      const dropdown = document.querySelector(".dropdown-list");
      if (!dropdown?.contains(event.target as Node)) {
        dropdown?.classList.remove("active");
        document.addEventListener("DOMContentLoaded", function () {
          document.getElementById("dropdown-content").style.display = "none";
        });
      }
    });
  }
  showOptions() {
    var dropdown = document.getElementById("dropdown-content");
    if (dropdown.style.display === "none") {
      dropdown.style.display = "block";
      this.showOptionsvalue = true;
    } else {
      dropdown.style.display = "none";
      this.showOptionsvalue = false;
    }
  }

  async downloadPDF(): Promise<void> {
    document.getElementById("dropdown-content").style.display = "none"; // hides the dropdown menu
    this.downloadPdfReport(this.contentElementRef);
  }


  showPopup() {
    this.showOptionsvalue = true;
  }

  downloadCSV() {
    this.downloadreport(this.data)
  }
  async downloadPdfReport(htmlRef: ElementRef<HTMLElement>) {
    // const divToRemove = htmlRef.nativeElement.querySelector('#downloadButton') as HTMLElement;
    // if (divToRemove) {
    //   divToRemove.remove();
    // }
    this.showOptionsvalue = false;
    let headerText = `${this.title.dashboard_header2_title ? this.title.dashboard_header2_title : this.stateName}  - VIDYA SAMIKSHA KENDRA ('VSK')`
    let headerImgUrl = '../../../../../assets/images/MoE.png';
    const headerImg = new Image();
    headerImg.src = headerImgUrl;
    // Wait for the header image to load
    await new Promise((resolve) => {
      headerImg.onload = resolve;
    });

    const canvas = await html2canvas(htmlRef.nativeElement, {
      scale: 2,
      useCORS: true,
      logging: true,
      allowTaint: true,
      backgroundColor: '#4c30f5',
      scrollX: window.scrollX,
      scrollY: window.scrollY,
      windowWidth: document.documentElement.clientWidth,
      windowHeight: document.documentElement.clientHeight,
      // foreignObjectRendering: true,
    });


    canvas.style.maxWidth = '100%';
    canvas.style.height = 'auto';
    const imageData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: 'a4',
    });
    pdf.setFillColor(76, 48, 245);
    pdf.rect(0, 0, pdf.internal.pageSize.getWidth(), 0, 'F'); // Add rectangle to cover header
    pdf.addImage(headerImgUrl, 'PNG', 10, 7, 60, 20);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(12);
    pdf.setTextColor(105, 105, 105);
    pdf.text(headerText, 80, 19);
    const imageType = imageData.split(',')[0].split(':')[1];
    if (imageType === 'unknown') {
      pdf.addImage(imageData, 'PNG', 0, 30, pdf.internal.pageSize.getWidth(), 0, '', 'FAST');
    } else {
      const imgProps = pdf.getImageProperties(imageData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imageData, imageType, 0, 30, pdfWidth, pdfHeight, '', 'FAST');
    }
    pdf.save(this.reportName + '.pdf');
  }


  

  downloadreport(reportInputs: { reportData: any, reportType: string, reportName: string }[]) {
    if (reportInputs === undefined || reportInputs?.length <= 0) {
      alert("No data found to download");
    } else {
      for (let i = 0; i < reportInputs.length; i++) {
        const reportData = reportInputs[i].reportData;
        const reportType = reportInputs[i].reportType;
        const fileName = reportInputs[i].reportName;
        let keys: [] | any;
        keys = Object.keys(reportData[0]).filter(key => !['tooltip', 'min_date', 'max_date'].includes(key));
        let dupData;
        if (reportType === 'map') {
          dupData = JSON.parse(JSON.stringify(reportData));
        } else if (reportType === 'table') {
          dupData = JSON.parse(JSON.stringify(reportData));
          dupData?.forEach((rec: any) => {
            Object.keys(rec).forEach((obj: any) => {
              rec[obj] = rec[obj]?.value;
            });
          });
        } else if (reportType === 'dashletBar') {
          dupData = JSON.parse(JSON.stringify(reportData));
        } else if (reportType === 'dashletScatter') {
          keys = keys.filter((ele: any) => {
            return ele !== 'data';
          });
          dupData = JSON.parse(JSON.stringify(reportData));
          dupData.forEach((obj: any) => {
            delete obj.data;
          });
        }
        dupData.forEach((obj: any) => {
          Object.keys(obj).forEach((key: any) => {
            obj[key] = !isNaN(obj[key]) ? formatNumberForReport(Number(obj[key])) : obj[key];
          });
        });
        const opts = { fields: keys, output: fileName };
        const csv = json2csv.parse(dupData, opts);
        let file = new Blob([csv], { type: 'text/csv;charset=utf-8' });
        saveAs(file, `${fileName}.csv`);
      }
    }
  }

}
