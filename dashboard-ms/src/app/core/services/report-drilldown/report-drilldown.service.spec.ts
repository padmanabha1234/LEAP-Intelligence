import { TestBed } from '@angular/core/testing';

import { ReportDrilldownService } from './report-drilldown.service';

describe('ReportDrilldownService', () => {
  let service: ReportDrilldownService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportDrilldownService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit data', () => {
    const testData = 'Test data';

    service.drilldownData.subscribe((data) => {
      if(data) {
        expect(data).toBe(testData);
      }
    });

    service.emit(testData);
  });
});
