import { ApiPromise } from '@polkadot/api';
import { successCallback } from '..';

export async function retrieveUnstakedAmount(
  api: ApiPromise,
  pair: any,
  requestId: string,
  callback?: () => void,
): Promise<void> {
  // tslint:disable-next-line
  var unsub = await api.tx.serviceRequest
    .retrieveUnstakedAmount(requestId)
    .signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
      successCallback(api, { events, status, callback, unsub })
    });
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
