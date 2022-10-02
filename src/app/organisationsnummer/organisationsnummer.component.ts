import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorMessage } from '../common/errorMessage';
import { ValidateKontrollsiffraService } from '../common/validate-kontrollsiffra.service';

@Component({
  selector: 'app-organisationsnummer',
  templateUrl: './organisationsnummer.component.html',
  styleUrls: ['./organisationsnummer.component.scss']
})
export class OrganisationsnummerComponent implements OnInit {

  constructor(
    private validateKontrollsiffraService: ValidateKontrollsiffraService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void { }

  getOrganisationsnummer(organisationsnummer: string) {

    if (organisationsnummer.length === 10) {
      const month = organisationsnummer.slice(2, 4);
      const kontrollSiffra = organisationsnummer.slice(- 1);

      if (
        this.validateOrganisationsnummerMonth(month) &&
        this.validateKontrollsiffraService.validateKontrollsiffra(organisationsnummer.slice(0, organisationsnummer.length - 1), kontrollSiffra)
      ) {
        this.snackBar.open("Giltigt organisationsnummer", "", { duration: 5000, verticalPosition: "top" });
      } else {
        null;
      }

    } else if (organisationsnummer.length === 12) {
      const century = organisationsnummer.slice(0, 2);
      const month = organisationsnummer.slice(4, 6);
      const kontrollSiffra = organisationsnummer.slice(- 1);

      if (
        this.validateOrganisatiosnummerCentury(century) &&
        this.validateOrganisationsnummerMonth(month) &&
        this.validateKontrollsiffraService.validateKontrollsiffra(organisationsnummer.slice(2, organisationsnummer.length - 1), kontrollSiffra)
      ) {
        this.snackBar.open("Giltigt organisationsnummer", "", { duration: 5000, verticalPosition: "top" });
      } else {
        null;
      }

    }

  }

  /* 
  * Validerar organisationsnumrets "månad"
  * Är giltig ifall "måndaden" är minst 20
  */
  validateOrganisationsnummerMonth(month: string): boolean {
    if (+month >= 20) {
      return true;
    } else {
      this.snackBar.open(ErrorMessage.INVALID_ONR, "", { duration: 5000, verticalPosition: "top" });
      return false;
    }
  }

  /* 
  * Validerar organisationsnumrets "århundrade"
  * Är giltig ifall "århundrade" är 16
  */
  validateOrganisatiosnummerCentury(century: string): boolean {
    if (+century === 16) {
      return true;
    } else {
      this.snackBar.open(ErrorMessage.INVALID_ONR, "", { duration: 5000, verticalPosition: "top" });
      return false;
    }
  }

}
