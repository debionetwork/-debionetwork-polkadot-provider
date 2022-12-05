import { Duration } from '../../primitives/duration';
import { PaymentStatus } from '../../primitives/payment-status';
import { SubscriptionStatus } from '../../primitives/subscription-status';

export class MenstrualSubscription {
  constructor(anyJson: any) {
    this.id = anyJson.id;
    this.addressId = anyJson.addressId;
    this.duration = anyJson.duration;
    this.currency = anyJson.currency;
    this.paymentStatus = anyJson.paymentStatus;
    this.status = anyJson.status;

    const numberCreatedAt = Number(String(anyJson.createdAt).split(','));
    const numberUpdatedAt = Number(String(anyJson.updatedAt).split(','));

    this.createdAt = numberCreatedAt > 0 ? new Date() : null;
    this.updatedAt = numberUpdatedAt > 0 ? new Date() : null;
  }

  id: string;
  addressId: string;
  duration: Duration;
  currency: string;
  paymentStatus: PaymentStatus;
  status: SubscriptionStatus;
  createdAt?: Date;
  updatedAt?: Date;
}
