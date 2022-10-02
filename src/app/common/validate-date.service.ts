import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorMessage } from './errorMessage';

@Injectable({
  providedIn: 'root'
})
export class ValidateDateService {

  constructor(private snackBar: MatSnackBar) { }

  /* 
  * Validerar århundrade
  * Århundrade är giltigt ifall det inte är större än nuvarande århundrade 
  */
  public validateCentury(century: string): boolean {
    const currentCentury = new Date().getFullYear().toString().slice(0, 2);

    if (+century <= +currentCentury) {
      return true;
    } else {
      this.snackBar.open(ErrorMessage.INVALID_CENTURY, "", { duration: 5000, verticalPosition: "top" });
      return false;
    }
  }

  /* 
  * Validerar månad
  * Månad är giltig ifall månad inte är större än 12 
  */
  public validateMonth(month: string): boolean {
    if (+month <= 12) {
      return true;
    } else {
      this.snackBar.open(ErrorMessage.INAVLID_MONTH, "", { duration: 5000, verticalPosition: "top" });
      return false;
    }
  }

  /* 
  * Validerar datum
  * Datum är giltigt ifall datum inte är större än antal dagar per angiven månad
  * Kollar skottår om datum är 29 och månad är 2/02/februari
  */
  public validateDay(lastTwoOfYear: string, month: string, day: string): boolean {
    const daysPerMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    for (let i = 0; i < daysPerMonth.length; i++) {
      if (+month === i + 1) {
        if (+day <= daysPerMonth[i]) {
          return true;
        } else if (month === "02" && day === "29") {
          if (this.isLeapYear(lastTwoOfYear)) {
            return true;
          } else {
            this.snackBar.open(ErrorMessage.INVALID_DATE, "", { duration: 5000, verticalPosition: "top" });
            return false;
          }
        } else {
          this.snackBar.open(ErrorMessage.INVALID_DATE, "", { duration: 5000, verticalPosition: "top" });
          return false;
        }
      }
    }
    return false;
  }

  /* 
  * Validerar skottår
  * Skottår är giltigt ifall året (kollar endast två sista siffrorna på året) är delbart med 4
  */
  public isLeapYear(lastTwoOfYear: string): boolean {
    if (+lastTwoOfYear % 4 === 0) {
      return true;
    } else {
      this.snackBar.open(ErrorMessage.INVALID_DATE, "", { duration: 5000, verticalPosition: "top" });
      return false;
    }
  }

  /* 
  * Validerar ifall angivet datum inte är ett datum i framtiden/datum som inte har varit än
  * Hämtar dagens datum och jämför med angivet datum
  */
  public isNotFutureDate(year: string, month: string, day: string): boolean {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const currentDate = new Date().getDate();

    if (+year === currentYear && +month === currentMonth) {
      if (+day <= currentDate) {
        return true;
      } else {
        this.snackBar.open(ErrorMessage.INVALID_DATE, "", { duration: 5000, verticalPosition: "top" });
        return false;
      }
    } else {
      return true;
    }
  }
}
