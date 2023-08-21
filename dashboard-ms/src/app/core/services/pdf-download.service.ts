import { ElementRef, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PdfDownloadService {
  contentElementRef!: ElementRef<HTMLElement>;
  constructor() { }
  setContentElementRef(nativeElement: any) {
    this.contentElementRef = new ElementRef(nativeElement);
  }
}
