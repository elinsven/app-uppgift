import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorMessage } from '../errorMessage';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  form: FormGroup;

  @Input() inputLabel: string;
  @Output() emitNumber = new EventEmitter<string>();

  constructor(private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.initForm();
  }

  /* 
  * Skapar upp formulär
  */
  initForm() {
    this.form = new FormGroup({
      number: new FormControl("201701102384")
    })
  }

  /* 
  * Validerar att användaren endast har skickat in siffror
  * Är giltig ifall värdet blir false när man skickar in det i isNaN-funktionen
  */
  isNumber(value: string): boolean {
    if (!isNaN(+value)) {
      return true;
    } else {
      this.snackBar.open(ErrorMessage.NOT_A_NUMBER, "", { duration: 5000, verticalPosition: "top" });
      return false;
    }
  }

  /* 
  * Validerar att användaren har angett 10 eller 12 siffror
  * Är giltig ifall värdet är 10 eller 12 siffror
  */
  checkInputLength(input: string): boolean {
    if (input.length === 10 || input.length === 12) {
      return true;
    } else {
      this.snackBar.open(ErrorMessage.NUMBER_LENGTH_NOT_10_OR_12, "", { duration: 5000, verticalPosition: "top" });
      return false;
    }
  }

  /* 
  * Tar bort bindestreck och plustecken från inputvärdet
  */
  removeCharacter(input: string): string {
    if (input.includes("-")) {
      return input.replace("-", "");
    } else if (input.includes("+")) {
      return input.replace("+", "");
    } else {
      return input;
    }
  }

  /* 
  * Emittar värdet från formuläret om det är ett nummer och innehåller 10 eller 12 siffror
  */
  submitForm() {
    let number = this.form.get("number").value;
    if (number) {
      number = this.removeCharacter(number);
      if (this.isNumber(number) && this.checkInputLength(number)) {
        this.emitNumber.emit(number)
      } else {
        null;
      }
    } else {
      this.snackBar.open(ErrorMessage.EMPTY_INPUT, "", { duration: 5000, verticalPosition: "top" });
    }
  }
}
