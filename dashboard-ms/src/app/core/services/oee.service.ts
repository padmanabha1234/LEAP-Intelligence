import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OeeService {
  private availability: number;
  private performance: number;
  private quality: number;

  constructor() { }

  setAvailability(value: number) {
    this.availability = value;
  }

  setperformance(value: number) {
    this.performance = value;

  }

  setquality(value: number) {
    this.quality = value;

  }

  getOEE(): number {
    let oee = (this.availability * this.performance * this.quality ) /10000;
    return Number(oee)
  }
}

