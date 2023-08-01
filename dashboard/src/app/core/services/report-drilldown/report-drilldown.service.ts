import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportDrilldownService {

  drilldownData: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);

  constructor() { }

  emit(data: any): void {
    this.drilldownData.next(data);
  }
}
