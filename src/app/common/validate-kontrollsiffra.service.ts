import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorMessage } from './errorMessage';

@Injectable({
  providedIn: 'root'
})
export class ValidateKontrollsiffraService {

  constructor(private snackBar: MatSnackBar) { }

  /* 
  * Validerar kontrollsiffran
  * Loopar igenom alla siffror i numret
  * Kollar om index är delbart med 2 för att få varannan siffra i numret
  * Varannan siffra i numret multipliceras med 2 och varannan med 1
  * Produkterna summeras, ifall proukten är tvåsiffrig så loopas de igenom för att addera varje ensiffra
  * Resultatet adderas med kontrollsiffran i angivet nummer och är giltig ifall summan är delbar med 10
  */
  public validateKontrollsiffra(number: string, kontrollSiffra: string): boolean {
    let res = 0;

    for (let i = 0; i < number.length; i++) {

      if (i % 2 === 0) {
        res += this.calculateNumber(number[i], 2);
      } else {
        res += this.calculateNumber(number[i], 1);
      }
    }

    if ((res + +kontrollSiffra) % 10 === 0) {
      return true;
    } else {
      this.snackBar.open(ErrorMessage.INVALID_KONTROLLSIFFRA, "", { duration: 5000, verticalPosition: "top" });
      return false;
    }
  }

  private calculateNumber(number: string, multipliedBy: number): number {
    let twoDigits = 0;
    let product: string | number = +number * multipliedBy;
    product = product.toString();

    if (product.length >= 2) {
      for (let i = 0; i < product.length; i++) {
        twoDigits += +product[i];
      }
      return twoDigits;
    } else {
      return +product;
    }
  }
}
