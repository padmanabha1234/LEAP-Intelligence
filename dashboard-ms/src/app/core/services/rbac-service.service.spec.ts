import { TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { RbacService } from './rbac-service.service';

describe('RbacService', () => {
  let service: RbacService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RbacService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get rbac details', () => {
    const rbacObject = {
      name: 'John Doe',
      role: 'admin',
      district: 'District A',
      block: 'Block B',
      cluster: 'Cluster C',
      school: 'School D'
    };

    service.setRbacDetails(rbacObject);
    const rbacDetails = service.getRbacDetails().value;

    expect(rbacDetails).toEqual(rbacObject);
  });

  it('should remove rbac details', () => {
    const rbacObject = {
      name: 'John Doe',
      role: 'admin',
      district: 'District A',
      block: 'Block B',
      cluster: 'Cluster C',
      school: 'School D'
    };

    service.setRbacDetails(rbacObject);
    service.removeRbacDetails();
    const rbacDetails = service.getRbacDetails().value;

    expect(rbacDetails).toEqual(service.rbacObject);
  });

  it('should return initial rbac details if not set', () => {
    const rbacDetails = service.getRbacDetails().value;

    expect(rbacDetails).toEqual(service.rbacObject);
  });

  it('should handle removing empty rbac details', () => {
    service.removeRbacDetails();
    const rbacDetails = service.getRbacDetails().value;

    expect(rbacDetails).toEqual(service.rbacObject);
  });

  it('should persist rbac details in localStorage', () => {
    const rbacObject = {
      name: 'John Doe',
      role: 'admin',
      district: 'District A',
      block: 'Block B',
      cluster: 'Cluster C',
      school: 'School D'
    };

    service.setRbacDetails(rbacObject);

    const storedRbacDetails = JSON.parse(localStorage.getItem('rbacDetails'));

    expect(storedRbacDetails).toEqual(rbacObject);
    localStorage.removeItem('rbacDetails');
  });

});
