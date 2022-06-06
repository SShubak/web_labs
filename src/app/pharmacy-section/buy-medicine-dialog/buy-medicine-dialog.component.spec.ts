import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BuyMedicineDialogComponent} from './buy-medicine-dialog.component';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('BuyMedicineDialogComponent', () => {
  let component: BuyMedicineDialogComponent;
  let fixture: ComponentFixture<BuyMedicineDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuyMedicineDialogComponent],
      imports: [MatDialogModule, HttpClientTestingModule],
      providers: [{
        provide: MatDialogRef,
        useValue: {}
      },        {
        provide: MAT_DIALOG_DATA,
        useValue: {}
      }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyMedicineDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
