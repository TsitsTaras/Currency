import { Component, OnInit } from '@angular/core';
import {
  Currency,
  CurrencyStateService,
} from './services/currency-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public billsToShow: any = ['USD', 'EUR'];

  private currencyList: Currency[] = [];

  public get filteredCurrencyList(): Currency[] {
    return this.currencyList?.filter((cur) =>
      this.billsToShow.includes(cur.cc)
    );
  }
  fromValue: any = {
    conversion: 0,
    currency: 'USD',
  };
  toValue: any = {
    conversion: 0,
    currency: 'USD',
  };
  constructor(private currencyStateService: CurrencyStateService) {}

  ngOnInit(): void {
    this.currencyStateService.getCurrency().subscribe((res: Currency[]) => {
      this.currencyList = res;
    });
  }

  fromCurrentcy(event: any) {
    this.fromValue = event;
    const { fromRate, toRate } = this.calculateCurrency();
    this.toValue.conversion = (this.fromValue.conversion * fromRate) / toRate;
  }
  toCurrentcy(event: any) {
    this.toValue = event;

    const { fromRate, toRate } = this.calculateCurrency();
    this.fromValue.conversion = (this.toValue.conversion * toRate) / fromRate;
  }
  private calculateCurrency(): { fromRate: any; toRate: any } {
    const fromRate = this.currencyList.find((currency: Currency) => {
      return currency.cc === this.fromValue.currency;
    })?.rate;
    const toRate = this.currencyList.find(
      (currency: Currency) => currency.cc === this.toValue.currency
    )?.rate;

    return { fromRate: fromRate || 1, toRate: toRate || 1 };
  }
}
