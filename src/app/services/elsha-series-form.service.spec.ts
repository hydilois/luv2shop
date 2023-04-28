import { TestBed } from '@angular/core/testing';

import { ElshaSeriesFormService } from './elsha-series-form.service';

describe('ElshaSeriesFormService', () => {
  let service: ElshaSeriesFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ElshaSeriesFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
