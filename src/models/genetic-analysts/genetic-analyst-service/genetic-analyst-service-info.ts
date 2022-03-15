import { GAServiceExpectedDuration } from './expected-duration';
import { GAServicePriceByCurrency } from './prices-by-currency';

export class GeneticAnalystServiceInfo {
  name: string;
  pricesByCurrency: GAServicePriceByCurrency[];
  expectedDuration: GAServiceExpectedDuration;
  description: string;
  testResultSample?: string;
}
