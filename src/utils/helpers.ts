import {
  Stock as StockType,
  UserHoldings as UserHoldingsType,
} from "../types/data.types";

export function adjustTwoDigits(num: number) {
  return num.toFixed(2);
}

export class Stock {
  ltp: number;
  close: number;
  avgPrice: number;
  quantity: number;
  investmentValue: number;
  currentValue: number;
  pnl: number;
  symbol: string;
  constructor({ ltp, close, avgPrice, quantity, symbol }: StockType) {
    this.ltp = ltp;
    this.close = close;
    this.avgPrice = avgPrice;
    this.quantity = quantity;
    this.symbol = symbol;
    this.investmentValue = this.avgPrice * this.quantity;
    this.currentValue = this.ltp * this.quantity;
    this.pnl = this.currentValue - this.investmentValue;
  }
}

export class Holdings {
  stocks: Stock[];
  totalInvestmentValue: number;
  totalCurrentValue: number;
  todaysPnl: number;
  totalPnl: number;
  constructor(stocks: UserHoldingsType) {
    this.stocks = stocks?.map((stock) => new Stock(stock));
    this.totalInvestmentValue = this.stocks.reduce(
      (total, stock) => total + stock.investmentValue,
      0
    );
    this.totalCurrentValue = this.stocks.reduce(
      (total, stock) => total + stock.currentValue,
      0
    );
    this.todaysPnl = this.stocks.reduce(
      (totalPnl, stock) =>
        totalPnl + (stock.close - stock.ltp) * stock.quantity,
      0
    );
    this.totalPnl = this.totalCurrentValue - this.totalInvestmentValue;
  }
}
