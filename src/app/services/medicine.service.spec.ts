import { TestBed } from '@angular/core/testing';

import { MedicineService } from './medicine.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('MedicineService', () => {
  let service: MedicineService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(MedicineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
