import { ApiPromise } from '@polkadot/api';
import { successCallback } from '..';

export async function retrieveUnstakedAmount(
  api: ApiPromise,
  pair: any,
  requestId: string,
  callback?: () => void,
): Promise<void> {
  const unsub = await api.tx.serviceRequest
    .retrieveUnstakedAmount(requestId)
    .signAndSend(pair, { nonce: -1 }, ({ events, status }) => successCallback(api, { events, status, callback }));
  unsub();
}

export function getCreateRequestFee(
  api: ApiPromise,
  pair: any,
  country: string,
  region: string,
  city: string,
  category: string,
): any {
  return api.tx.serviceRequest.createRequest(country, region, city, category, 1).paymentInfo(pair);
}

export function unstakeRequestFee(api: ApiPromise, pair: any, requestId: string): any {
  return api.tx.serviceRequest.unstake(requestId).paymentInfo(pair);
}

export async function generateRequestId(api: ApiPromise, pair: any, country: string, region: string, city: string, category: string) {
  const result = await api.tx.serviceRequest
    .generateRequestid(country, region, city, category)
    .signAndSend(pair, { nonce: -1 });

  return result.toHuman();
}

export async function unstakeRequest (
  api: ApiPromise, 
  pair: any, 
  requestId: string, 
  callback? : () => void,
) {
  const unsub = await api.tx.serviceRequest
    .unstake(requestId)
    .signAndSend(pair, { nonce: -1 }, ({ events, status }) => successCallback(api, { events, status, callback }));
  unsub();
}

export async function claimRequest(api: ApiPromise, pair: any, requestId: string, serviceId: string, testingPrice: string, qcPrice: string) {
  const result = await api.tx.serviceRequest
    .claimRequest(requestId, serviceId, testingPrice, qcPrice)
    .signAndSend(pair, { nonce: -1 });
  return result.toHuman();
}

export async function processRequest(
  api: ApiPromise, 
  pair: any, 
  labId: string, 
  requestId: string,
  orderId: string,
  dnaSampleTrackingId: string,
  additionalStakingAmount: string,
) {
  const result = await api.tx.serviceRequest
    .processRequest(labId, requestId, orderId, dnaSampleTrackingId, additionalStakingAmount)
    .signAndSend(pair, { nonce: -1 });
  return result.toHuman();
}

export async function finalizeRequest(
  api: ApiPromise,
  pair: any,
  requestId: string,
  testResultSuccess: string,
) {
  const result = await api.tx.serviceRequest
    .finalizeRequest(requestId, testResultSuccess)
    .signAndSend(pair, { nonce: -1 });
  return result.toHuman();
}