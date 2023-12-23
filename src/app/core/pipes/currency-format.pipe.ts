import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFormat'
})
export class CurrencyFormatPipe implements PipeTransform {
  private EUR: number = 4.34;
  private USD: number = 3.94;

  transform(value: number, currencyCode: string): string {
    console.log(currencyCode);
    switch (currencyCode) {
      case 'USD':
        return `$${value * this.USD}`;
      case 'EUR':
        return `${value * this.EUR} €`;
      case 'PLN':
        return `${value} zł`;
      default:
        return `${value} lol`;
    }
  }
}