import {Component, OnInit} from '@angular/core';
import {Medicine, MedicineService} from "../../../services/medicine.service";
import {ColDef, RowClickedEvent} from "ag-grid-community";
import {Observable} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {BuyMedicineDialogComponent} from "../../buy-medicine-dialog/buy-medicine-dialog.component";

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {

  isDataReady = false;

  public rowData$!: Observable<any[]>;

  colDef: ColDef[] = [
    {
      field: 'name',
      flex: 1
    },
    {
      field: 'manufacturer',
      flex: 1
    },
    {
      field: 'price',
      flex: 1
    },
    {
      field: 'in_stock_number',
      flex: 1
    },
  ]


  constructor(
    private medicineService: MedicineService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.rowData$ = this.medicineService.getAllMedicines();
  }

  onRowClicked(event: RowClickedEvent) {
    this.dialog.open(BuyMedicineDialogComponent, {
      width: '550px',
      data: event.data
    })
  }

}
