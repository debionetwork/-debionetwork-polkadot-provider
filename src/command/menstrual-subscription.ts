import { ApiPromise } from '@polkadot/api';
import { getCommandNonceAndSigner, successCallback } from '..';
import { Duration } from '../primitives/duration';
import { PaymentStatus } from '../primitives/payment-status';
import { SubscriptionStatus } from '../primitives/subscription-status';

export async function addMenstrualSubscription(
  api: ApiPromise,
  pair: any,
  duration: Duration,
  price: number,
  paymentStatus: PaymentStatus,
  subscriptionStatus: SubscriptionStatus,
  callback?: () => void,
) {
  // tslint:disable-next-line
  var unsub = await api.tx.menstrualSubscription
    .addMenstrualSubscription(duration, price, paymentStatus, subscriptionStatus)
    .signAndSend(pair, getCommandNonceAndSigner(pair), ({ events, status }) => {
      successCallback(api, { events, status, callback, unsub });
    });
}

export async function changeMenstrualSubscriptionStatus(
  api: ApiPromise,
  pair: any,
  menstrualSubscriptionId: string,
  subscriptionStatus: SubscriptionStatus,
  callback?: () => void,
) {
  // tslint:disable-next-line
  var unsub = await api.tx.menstrualSubscription
    .changeMenstrualSubscriptionStatus(menstrualSubscriptionId, subscriptionStatus)
    .signAndSend(pair, getCommandNonceAndSigner(pair), ({ events, status }) => {
      successCallback(api, { events, status, callback, unsub });
    });
}

export async function setMenstrualSubscriptionPaid(
  api: ApiPromise,
  pair: any,
  accountId: string,
  menstrualSubscriptionId: string,
  callback?: () => void,
) {
  // tslint:disable-next-line
  var unsub = await api.tx.menstrualSubscription
    .setMenstrualSubscriptionPaid(accountId, menstrualSubscriptionId)
    .signAndSend(pair, getCommandNonceAndSigner(pair), ({ events, status }) => {
      successCallback(api, { events, status, callback, unsub });
    });
}

export async function sudoUpdateAdminKey(api: ApiPromise, pair: any, accountId: string, callback?: () => void) {
  // tslint:disable-next-line
  var unsub = await api.tx.menstrualSubscription
    .sudoUpdateAdminKey(accountId)
    .signAndSend(pair, getCommandNonceAndSigner(pair), ({ events, status }) => {
      successCallback(api, { events, status, callback, unsub });
    });
}

export async function updateAdminKey(api: ApiPromise, pair: any, accountId: string, callback?: () => void) {
  // tslint:disable-next-line
  var unsub = await api.tx.menstrualSubscription
    .updateAdminKey(accountId)
    .signAndSend(pair, getCommandNonceAndSigner(pair), ({ events, status }) => {
      successCallback(api, { events, status, callback, unsub });
    });
}
