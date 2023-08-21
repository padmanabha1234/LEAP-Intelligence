import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BarchartBenchmarkService {

  index = 0;
  benchmarkValues: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);

  constructor() { }

  emit(data: any): void {
    this.index += 1
    this.benchmarkValues.next({...data, index: this.index });
  }

  getValues() {
    return this.benchmarkValues
  }
}
