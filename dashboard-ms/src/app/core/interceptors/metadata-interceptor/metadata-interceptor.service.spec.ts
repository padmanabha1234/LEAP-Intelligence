import { TestBed } from '@angular/core/testing';

import { MetadataInterceptor } from './metadata-interceptor.service';

describe('MetadataInterceptorService', () => {
  let service: MetadataInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MetadataInterceptor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
