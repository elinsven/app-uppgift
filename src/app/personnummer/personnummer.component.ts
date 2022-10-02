import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ValidateDateService } from '../common/validate-date.service';
import { ValidateKontrollsiffraService } from '../common/validate-kontrollsiffra.service';

@Component({
  selector: 'app-personnummer',
  templateUrl: './personnummer.component.html',
  styleUrls: ['./personnummer.component.scss']
})
export class PersonnummerComponent implements OnInit {

  constructor(
    private validateDateService: ValidateDateService,
    private validateKontrollsiffraService: ValidateKontrollsiffraService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.validateDateService.isNotFutureDate("2022", "09", "03")
  }

  getPersonnummer(personnummer: string) {

    if (personnummer.length === 10) {
      const lastTwoOfYear = personnummer.slice(0, 2);
      const month = personnummer.slice(2, 4);
      const day = personnummer.slice(4, 6);
      const kontrollSiffra = personnummer.slice(- 1);

      if (
        this.validateDateService.validateMonth(month) &&
        this.validateDateService.validateDay(lastTwoOfYear, month, day) &&
        this.validateKontrollsiffraService.validateKontrollsiffra(personnummer.slice(0, personnummer.length - 1), kontrollSiffra)
      ) {
        this.snackBar.open("Giltigt personnummer", "", { duration: 5000, verticalPosition: "top" });
      } else {
        null;
      }

    } else if (personnummer.length === 12) {
      const century = personnummer.slice(0, 2);
      const year = personnummer.slice(0, 4)
      const lastTwoOfYear = personnummer.slice(2, 4);
      const month = personnummer.slice(4, 6);
      const day = personnummer.slice(6, 8);
      const kontrollSiffra = personnummer.slice(- 1);

      if (
        this.validateDateService.validateCentury(century) &&
        this.validateDateService.validateMonth(month) &&
        this.validateDateService.validateDay(lastTwoOfYear, month, day) &&
        this.validateDateService.isNotFutureDate(year, month, day) &&
        this.validateKontrollsiffraService.validateKontrollsiffra(personnummer.slice(2, personnummer.length - 1), kontrollSiffra)
      ) {
        this.snackBar.open("Giltigt personnummer", "", { duration: 5000, verticalPosition: "top" });
      } else {
        null;
      }

    }
  }
}
