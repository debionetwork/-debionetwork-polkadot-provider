import { Price } from './price';

export class PriceByCurrency {
  currency: string;
  totalPrice: string;
  priceComponents: Price[];
  additionalPrices: Price[];
}
