import { GAServicePrice } from './price';

export class GAServicePriceByCurrency {
  currency: string;
  totalPrice: number;
  priceComponents: GAServicePrice[];
  additionalPrices?: GAServicePrice[];
}
