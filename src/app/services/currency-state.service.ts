import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Currency {
  cc: string;
  rate: number;
}

@Injectable({
  providedIn: 'root',
})
export class CurrencyStateService {
  private billUrl =
    'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchangenew?json';
  constructor(private http: HttpClient) {}

  getCurrency(): Observable<Currency[]> {
    return this.http.get<Currency[]>(this.billUrl);
  }
}
