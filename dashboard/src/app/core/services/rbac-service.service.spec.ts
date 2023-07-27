import { TestBed } from '@angular/core/testing';

import { RbacServiceService } from './rbac-service.service';

describe('RbacServiceService', () => {
  let service: RbacServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RbacServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
