import {Component, OnInit} from '@angular/core';
import {ColDef} from "ag-grid-community";
import {MedicineService} from "../../services/medicine.service";
import {OrderService} from "../../services/order.service";
import {tap} from "rxjs";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  isDataReady = false;

  rowData: any[] = [];

  colDef: ColDef[] = [
    {
      field: 'id_medicine',
      flex: 1
    },
    {
      field: 'shipDate',
      flex: 1
    },
    {
      field: 'amount',
      flex: 1
    },
    {
      field: 'name',
      flex: 1
    },
    {
      field: 'price',
      flex: 1
    }
  ]

  constructor(
    private medicineService: MedicineService,
    private orderService: OrderService,
  ) {
  }

  ngOnInit(): void {
    this.orderService.getAllOrders().pipe(
      tap(orders => {
        return orders.forEach((order, array, []) => {
          return this.medicineService.getMedicine(order.id_medicine).subscribe((item) => {
            this.rowData = [...this.rowData, {...order, ...item}];
          })
        })
      })
    ).subscribe();
  }

}
