import { ApiPromise } from '@polkadot/api';
import { successCallback, getCommandNonceAndSigner, ServicePrice } from '../index';

export async function retrieveUnstakedAmount(
  api: ApiPromise,
  pair: any,
  requestId: string,
  callback?: () => void,
): Promise<void> {
  // tslint:disable-next-line
  var unsub = await api.tx.serviceRequest
    .retrieveUnstakedAmount(requestId)
    .signAndSend(pair, getCommandNonceAndSigner(pair), ({ events, status }) => {
      successCallback(api, { events, status, callback, unsub });
    });
}

export async function createRequest(
  api: ApiPromise,
  pair: any,
  country: string,
  region: string,
  city: string,
  category: string,
  stakingAmount: BigInt,
  callback?: () => void,
): Promise<void> {
  // tslint:disable-next-line
  var unsub = await api.tx.serviceRequest
    .createRequest(country, region, city, category, stakingAmount)
    .signAndSend(pair, getCommandNonceAndSigner(pair), ({ events, status }) => {
      successCallback(api, { events, status, callback, unsub });
    });
}

export function createRequestFee(
  api: ApiPromise,
  pair: any,
  country: string,
  region: string,
  city: string,
  category: string,
  stakingAmount: BigInt,
): any {
  return api.tx.serviceRequest.createRequest(country, region, city, category, stakingAmount).paymentInfo(pair);
}

export function unstakeRequestFee(api: ApiPromise, pair: any, requestId: string): any {
  return api.tx.serviceRequest.unstake(requestId).paymentInfo(pair);
}

export async function generateRequestId(
  api: ApiPromise,
  pair: any,
  country: string,
  region: string,
  city: string,
  category: string,
  callback?: () => void,
) {
  // tslint:disable-next-line
  var unsub = await api.tx.serviceRequest
    .generateRequestid(country, region, city, category)
    .signAndSend(pair, getCommandNonceAndSigner(pair), ({ events, status }) => {
      successCallback(api, { events, status, callback, unsub });
    });
}

export async function unstakeRequest(api: ApiPromise, pair: any, requestId: string, callback?: () => void) {
  // tslint:disable-next-line
  var unsub = await api.tx.serviceRequest
    .unstake(requestId)
    .signAndSend(pair, getCommandNonceAndSigner(pair), ({ events, status }) => {
      successCallback(api, { events, status, callback, unsub });
    });
}

export async function claimRequest(
  api: ApiPromise,
  pair: any,
  requestId: string,
  serviceId: string,
  servicePrice: ServicePrice,
  callback?: () => void,
) {
  // tslint:disable-next-line
  var unsub = await api.tx.serviceRequest
    .claimRequest(requestId, serviceId, servicePrice)
    .signAndSend(pair, getCommandNonceAndSigner(pair), ({ events, status }) => {
      successCallback(api, { events, status, callback, unsub });
    });
}

export function claimRequestFee(
  api: ApiPromise,
  pair: any,
  requestId: string,
  serviceId: string,
  servicePrice: ServicePrice,
): Promise<any> {
  return api.tx.serviceRequest.claimRequest(requestId, serviceId, servicePrice).paymentInfo(pair);
}

export async function processRequest(
  api: ApiPromise,
  pair: any,
  labId: string,
  requestId: string,
  orderId: string,
  dnaSampleTrackingId: string,
  callback?: () => void,
) {
  // tslint:disable-next-line
  var unsub = await api.tx.serviceRequest
    .processRequest(labId, requestId, orderId, dnaSampleTrackingId)
    .signAndSend(pair, getCommandNonceAndSigner(pair), ({ events, status }) => {
      successCallback(api, { events, status, callback, unsub });
    });
}

export async function finalizeRequest(
  api: ApiPromise,
  pair: any,
  requestId: string,
  testResultSuccess: boolean,
  callback?: () => void,
) {
  // tslint:disable-next-line
  var unsub = await api.tx.serviceRequest
    .finalizeRequest(requestId, testResultSuccess)
    .signAndSend(pair, getCommandNonceAndSigner(pair), ({ events, status }) => {
      successCallback(api, { events, status, callback, unsub });
    });
}
