import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private availableCurrencies: string[] = ['PLN', 'USD', 'EUR']
  private currency: string = 'PLN';
  private currencySubject = new BehaviorSubject<string>(this.currency);
  currencyChange$: Observable<any> = this.currencySubject.asObservable();
  private EUR: number = 4.34;
  private USD: number = 3.94;

  constructor() { }

  getCurrency(): string {
    return this.currencySubject.value;
  }

  setCurrency(currency: string): void {
    if (this.availableCurrencies.includes(currency)) {
      this.currency = currency;
      this.currencySubject.next(currency);
    } else {
      console.log("Cannot set currency to " + currency);
    }
  }
}
