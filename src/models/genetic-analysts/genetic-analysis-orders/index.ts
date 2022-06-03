import { CurrencyType, Price } from '../../labs/services';
import { convertSubstrateBalanceToNumber, convertSubstrateNumberToNumber } from '../../../index';
import { GeneticAnalysisOrderStatus } from './genetic-analysis-order-status';

export class GeneticAnalysisOrder {
  constructor(anyJson: any) {
    this.id = anyJson.id;
    this.serviceId = anyJson.serviceId;
    this.customerId = anyJson.customerId;
    this.customerBoxPublicKey = anyJson.customerBoxPublicKey;
    this.sellerId = anyJson.sellerId;
    this.geneticDataId = anyJson.geneticDataId;
    this.geneticAnalysisTrackingId = anyJson.geneticAnalysisTrackingId;
    this.currency = anyJson.currency;
    this.prices = anyJson.prices;
    this.additionalPrices = anyJson.additionalPrices;
    this.status = anyJson.status;
    this.createdAt = anyJson.createdAt;
    this.updatedAt = anyJson.updatedAt;
  }
  id: string;
  serviceId: string;
  customerId: string;
  customerBoxPublicKey: string;
  sellerId: string;
  geneticDataId: string;
  geneticAnalysisTrackingId: string;
  currency: CurrencyType;
  prices: Price[];
  additionalPrices: Price[];
  status: GeneticAnalysisOrderStatus;
  createdAt: Date;
  updatedAt: Date;

  normalize() {
    const geneticAnalysisOrder: GeneticAnalysisOrder = this; // eslint-disable-line

    if (geneticAnalysisOrder.prices[0].value) {
      geneticAnalysisOrder.prices[0].value = convertSubstrateBalanceToNumber(
        geneticAnalysisOrder.prices[0].value,
      ).toString();
    }

    geneticAnalysisOrder.createdAt = new Date(convertSubstrateNumberToNumber(geneticAnalysisOrder.createdAt));

    if (geneticAnalysisOrder.updatedAt) {
      geneticAnalysisOrder.updatedAt = new Date(convertSubstrateNumberToNumber(geneticAnalysisOrder.updatedAt));
    }

    return geneticAnalysisOrder;
  }
}

export * from './genetic-analysis-order-status';
