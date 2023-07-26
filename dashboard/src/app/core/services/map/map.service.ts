import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  countryGeoJSON: any;
  stateGeoJSON: any;

  constructor() { }

  async getCountryGeoJSON(): Promise<any> {
    if (!this.countryGeoJSON) {
      const response = await fetch(`${environment.apiURL}/assets/IN.json`);
      const temp = await response.json();
      this.countryGeoJSON = temp['IN'];
    }

    return this.countryGeoJSON;
  }
  
  async getStateGeoJSON(): Promise<any> {
    if (!this.stateGeoJSON) {
      const response = await fetch(`/assets/data/${environment.stateCode}.json`);
      this.stateGeoJSON = await response.json();
    }

    return this.stateGeoJSON;
  }
}
