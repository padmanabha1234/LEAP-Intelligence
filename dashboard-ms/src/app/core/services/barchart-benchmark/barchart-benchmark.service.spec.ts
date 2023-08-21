import { TestBed } from '@angular/core/testing';

import { BarchartBenchmarkService } from './barchart-benchmark.service';

describe('BarchartBenchmarkService', () => {
  let service: BarchartBenchmarkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BarchartBenchmarkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
