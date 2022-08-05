import { GAServicePrice } from './price';

export class GAServicePriceByCurrency {
  currency: string;
  totalPrice: bigint;
  priceComponents: GAServicePrice[];
  additionalPrices?: GAServicePrice[];
}
