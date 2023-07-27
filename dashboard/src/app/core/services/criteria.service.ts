import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CriteriaService {

  criteriaObject: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);

  constructor() { }

  emit(data: any): void {
    this.criteriaObject.next(data);
  }
}
