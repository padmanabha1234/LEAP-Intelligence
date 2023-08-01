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
});
