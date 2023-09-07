import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RbacService } from '../rbac-service.service';
import { StateCodes } from '../../config/StateCodes';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  countryGeoJSON: any;
  stateGeoJSON: any;
  rbacDetails: any;

  constructor(private _rbacService: RbacService, private httpService: HttpClient) {
    this._rbacService.getRbacDetails().subscribe((rbacDetails: any) => {
      this.rbacDetails = rbacDetails
    })
  }

  async getCountryGeoJSON(): Promise<any> {
    if (!this.countryGeoJSON) {
      const response = await fetch(`${environment.apiURL}/assets/IN.json`);
      const temp = await response.json();
      this.countryGeoJSON = temp;
    }

    return this.countryGeoJSON;
  }

  async getStateGeoJSON(drillDownDetails?: any): Promise<any> {
    if (!this.stateGeoJSON || environment.config === 'NVSK') {
      var response;
      if (environment.config === 'NVSK' && drillDownDetails?.state) {
        let stateCode = StateCodes[Number(drillDownDetails?.state)]
        response = await fetch(`${environment.apiURL}/assets/${stateCode}.json`);
      }
      else {
        response = await fetch(`${environment.apiURL}/assets/${environment.stateCode}.json`);
      }
      this.stateGeoJSON = await response.json();
    }
    return this.stateGeoJSON;
  }
}
