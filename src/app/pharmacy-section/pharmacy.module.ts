import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OrdersComponent} from "./orders/orders.component";
import {StoreComponent} from "./store/store/store.component";
import {AgGridModule} from "ag-grid-angular";
import {BuyMedicineDialogComponent} from './buy-medicine-dialog/buy-medicine-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    OrdersComponent,
    StoreComponent,
    BuyMedicineDialogComponent],
  imports: [
    CommonModule,
    AgGridModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule
  ],
  exports: [
    OrdersComponent,
    StoreComponent],
  entryComponents: [BuyMedicineDialogComponent]
})
export class PharmacyModule {
}
