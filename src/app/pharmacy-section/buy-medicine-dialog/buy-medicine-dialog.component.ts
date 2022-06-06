import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Medicine} from "../../services/medicine.service";
import {CookieService} from "ngx-cookie-service";
import {Order, OrderService} from "../../services/order.service";

@Component({
  selector: 'app-buy-medicine-dialog',
  templateUrl: './buy-medicine-dialog.component.html',
  styleUrls: ['./buy-medicine-dialog.component.scss']
})
export class BuyMedicineDialogComponent implements OnInit {

  @ViewChild('amount') amount!: ElementRef;

  constructor(
    public dialogRef: MatDialogRef<BuyMedicineDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Medicine,
    private cookieService: CookieService,
    private orderService: OrderService
  ) {
  }

  ngOnInit(): void {

  }

  buyMedicine() {

    const user = JSON.parse(this.cookieService.get('user'));
    const amount = +this.amount.nativeElement.value
    const orderData: Order = {
      id_medicine: this.data.id_medicine,
      amount: amount,
      shipDate: new Date(Date.now()),
      id_user: user.id_user
    }

    this.orderService.makeOrder(orderData).subscribe({
      next: (data) => {
        alert("Покупка пройшла успішно )");
        this.dialogRef.close();
      },
      error: () => {
        alert("Щось пішло не так(( Помилка бекенду(")
      }
    })


  }

}
