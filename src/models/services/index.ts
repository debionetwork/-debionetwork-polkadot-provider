import { ServiceFlow } from './service-flow';
import { ServiceInfo } from './service-info';

export class Service {
  constructor(anyJson: any) {
    this.id = anyJson.id;
    this.ownerId = anyJson.ownerId;
    this.info = anyJson.info;
    this.serviceFlow = anyJson.serviceFlow;
    this.price = this.info.pricesByCurrency[0].priceComponents[0].value.toString();
    this.qcPrice = this.info.pricesByCurrency[0].additionalPrices[0].value.toString();
    this.currency = this.info.pricesByCurrency[0].currency;
  }
  id: string;
  ownerId: string;
  currency: string;
  price: string;
  qcPrice: string;
  info: ServiceInfo;
  serviceFlow: ServiceFlow;
}

export * from './expected-duration';
export * from './price';
export * from './price-by-currency';
export * from './service-flow';
export * from './service-info';
export * from './currency-type';
