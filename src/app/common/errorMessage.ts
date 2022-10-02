/* 
* Enum för olika felmeddelanden
*/
export enum ErrorMessage {
  NOT_A_NUMBER = "Vänligen använd endast siffror",
  EMPTY_INPUT = "Textrutan är tom, vänligen fyll i ett nummer",
  NUMBER_LENGTH_NOT_10_OR_12 = "Numrets längd är felaktig, vänligen skriv in ett nummer mellan 10 och 12",
  INVALID_CENTURY = "Ogiltigt århundrade",
  INAVLID_MONTH = "Ogiltig månad",
  INVALID_DATE = "Ogiltigt datum",
  INVALID_PNR = "Ogiligt personnummer",
  INVALID_SNR = "Ogiligt samordningsnummer",
  INVALID_ONR = "Ogiligt organisationsnummer",
  INVALID_KONTROLLSIFFRA = "Ogiltig kontrollsiffra"
}