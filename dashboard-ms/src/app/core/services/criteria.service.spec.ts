import { TestBed } from '@angular/core/testing';

import { CriteriaService } from './criteria.service';

describe('CriteriaService', () => {
  let service: CriteriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CriteriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit data', () => {
    const testData = 'Test data';

    service.criteriaObject.subscribe((data) => {
      if(data) {
        expect(data).toBe(testData);
      }
    });

    service.emit(testData);
  });
});
