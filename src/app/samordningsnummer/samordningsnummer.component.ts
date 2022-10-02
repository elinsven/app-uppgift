import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorMessage } from '../common/errorMessage';
import { ValidateDateService } from '../common/validate-date.service';
import { ValidateKontrollsiffraService } from '../common/validate-kontrollsiffra.service';

@Component({
  selector: 'app-samordningsnummer',
  templateUrl: './samordningsnummer.component.html',
  styleUrls: ['./samordningsnummer.component.scss']
})
export class SamordningsnummerComponent implements OnInit {

  constructor(
    private validateDateService: ValidateDateService,
    private validateKontrollsiffraService: ValidateKontrollsiffraService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void { }

  getSamordningsnummer(samordningsnummer: string) {

    if (samordningsnummer.length === 10) {
      const lastTwoOfYear = samordningsnummer.slice(0, 2);
      const month = samordningsnummer.slice(2, 4);
      const day = samordningsnummer.slice(4, 6);
      let dayMinus60 = (+day - 60).toString();
      const kontrollSiffra = samordningsnummer.slice(- 1);

      if (
        this.validateDateService.validateMonth(month) &&
        this.validateDateService.validateDay(lastTwoOfYear, month, dayMinus60) &&
        this.validateSamordningsnummer(day) &&
        this.validateKontrollsiffraService.validateKontrollsiffra(samordningsnummer.slice(0, samordningsnummer.length - 1), kontrollSiffra)
      ) {
        this.snackBar.open("Giltigt samordningsnummer", "", { duration: 5000, verticalPosition: "top" });
      } else {
        null;
      }

    } else if (samordningsnummer.length === 12) {
      const century = samordningsnummer.slice(0, 2);
      const lastTwoOfYear = samordningsnummer.slice(2, 4);
      const month = samordningsnummer.slice(4, 6);
      const day = samordningsnummer.slice(6, 8);
      let dayMinus60 = (+day - 60).toString();
      const kontrollSiffra = samordningsnummer.slice(- 1);

      if (
        this.validateDateService.validateCentury(century) &&
        this.validateDateService.validateMonth(month) &&
        this.validateDateService.validateDay(lastTwoOfYear, month, dayMinus60) &&
        this.validateSamordningsnummer(day) /* &&
        this.isNotFutureDate(year, month, day) */ &&
        this.validateKontrollsiffraService.validateKontrollsiffra(samordningsnummer.slice(2, samordningsnummer.length - 1), kontrollSiffra)
      ) {
        this.snackBar.open("Giltigt samordningsnummer", "", { duration: 5000, verticalPosition: "top" });
      } else {
        null;
      }

    }
  }

  /* 
  * Validerar samordningsnumrets datum
  * Är giltig ifall datumet är mellan 61 och 91
  */
  validateSamordningsnummer(day: string): boolean {
    if (+day >= 61 && +day <= 91) {
      return true;
    } else {
      this.snackBar.open(ErrorMessage.INVALID_SNR, "", { duration: 5000, verticalPosition: "top" });
      return false;
    }
  }

}
