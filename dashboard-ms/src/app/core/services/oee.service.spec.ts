import { TestBed } from '@angular/core/testing';

import { OeeService } from './oee.service';

describe('OeeService', () => {
  let service: OeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
