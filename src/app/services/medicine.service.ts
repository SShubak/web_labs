import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

export interface Medicine {
  id_medicine: number,
  name: string,
  manufacturer: string,
  price: number,
  in_stock: boolean,
  demand: boolean,
  in_stock_number: number,
  demand_number: number
}

@Injectable({
  providedIn: 'root'
})
export class MedicineService {

  url = 'http://127.0.0.1:5000/';

  constructor(
    private http: HttpClient
  ) {
  }

  getAllMedicines() {
    return this.http.get<Medicine[]>(this.url + 'api/v1/allMedicine')
  }

  getMedicine(medicineId: number) {
    return this.http.get<Medicine>(this.url + `api/v1/getmedicine/${medicineId}`)
  }
}
