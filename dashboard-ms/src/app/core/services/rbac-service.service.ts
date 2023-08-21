import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RbacService {
  rbacObject: any = {
    name: null,
    role: null,
    district: null,
    block: null,
    cluster: null,
    school: null
  };
  rbacDetails: BehaviorSubject<any>;
  constructor() {
    this.rbacDetails = new BehaviorSubject(this.getStoredRbacDetails());
  }

  private getStoredRbacDetails() {
    const storedRbacDetails = localStorage.getItem('rbacDetails');
    if (storedRbacDetails) {
      try {
        return JSON.parse(storedRbacDetails);
      } catch {
        return this.rbacObject;
      }
    } else {
      return this.rbacObject;
    }
  }

  setRbacDetails(rbacObject: any) {
    localStorage.setItem('rbacDetails', JSON.stringify(rbacObject));
    this.rbacDetails.next(rbacObject);
  }

  getRbacDetails() {
    return this.rbacDetails;
  }

  removeRbacDetails() {
    localStorage.removeItem('rbacDetails');
    this.rbacDetails.next(this.rbacObject);
  }
}
