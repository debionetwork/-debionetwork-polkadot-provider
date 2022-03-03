import { ServiceFlow, Price, CurrencyType } from '..';
import { OrderStatus } from './order-status';

export class Order {
  constructor(anyJson: any) {
    this.id = anyJson.id;
    this.serviceId = anyJson.serviceId;
    this.customerId = anyJson.customerId;
    this.customerBoxPublicKey = anyJson.customerBoxPublicKey;
    this.sellerId = anyJson.sellerId;
    this.dnaSampleTrackingId = anyJson.dnaSampleTrackingId;
    this.currency = anyJson.currency;
    this.prices = anyJson.prices;
    this.additionalPrices = anyJson.additionalPrices;
    this.status = anyJson.status;
    this.orderFlow = anyJson.orderFlow;
    this.createdAt = anyJson.createdAt;
    this.updatedAt = anyJson.updatedAt;
  }

  id: string;
  serviceId: string;
  customerId: string;
  customerBoxPublicKey: string;
  sellerId: string;
  dnaSampleTrackingId: string;
  currency: CurrencyType;
  prices: Price[];
  additionalPrices: Price[];
  status: OrderStatus;
  orderFlow: ServiceFlow;
  createdAt: Date;
  updatedAt: Date;
}

export * from './order-status';
