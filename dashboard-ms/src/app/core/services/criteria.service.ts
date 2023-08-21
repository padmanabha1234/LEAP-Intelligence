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

  applyCriteria(data: any, backUpData: any, tableReportData: any) {
    if (data && backUpData.length > 0) {
      let filteredData = backUpData.filter((row: any) => {
        let value = row?.[data.unitKey]?.value ? row?.[data.unitKey]?.value : row?.[data.unitKey]
        return (Number(data?.fromRange) <= Number(value) && Number(value) <= Number(data?.toRange))
      })
      tableReportData = {
        ...tableReportData,
        [tableReportData?.data ? 'data' : 'values']: filteredData
      }
    }
    return tableReportData
  }
}
