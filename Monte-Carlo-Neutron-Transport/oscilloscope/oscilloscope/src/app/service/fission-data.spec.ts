import { TestBed } from '@angular/core/testing';

import { FissionData } from './fission-data';

describe('FissionData', () => {
  let service: FissionData;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FissionData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
