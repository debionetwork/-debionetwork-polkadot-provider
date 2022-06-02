import { ApiPromise } from '@polkadot/api';
import { ServiceFlow, ServiceInfo, successCallback } from '../..';

export async function createService(
  api: ApiPromise,
  pair: any,
  serviceInfo: ServiceInfo,
  serviceFlow: string,
  callback?: () => void,
): Promise<void> {
  // tslint:disable-next-line
  var unsub = await api.tx.services
    .createService(serviceInfo, serviceFlow)
    .signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
      successCallback(api, { events, status, callback, unsub });
    });
}

export function createServiceFee(
  api: ApiPromise,
  pair: any,
  serviceInfo: ServiceInfo,
  serviceFlow: string,
): Promise<any> {
  return api.tx.services.createService(serviceInfo, serviceFlow).paymentInfo(pair);
}

export async function updateService(
  api: ApiPromise,
  pair: any,
  serviceId: string,
  serviceInfo: ServiceInfo,
  callback?: () => void,
): Promise<void> {
  // tslint:disable-next-line
  var unsub = await api.tx.services
    .updateService(serviceId, serviceInfo)
    .signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
      successCallback(api, { events, status, callback, unsub });
    });
}

export function updateServiceFee(
  api: ApiPromise,
  pair: any,
  serviceId: string,
  serviceInfo: ServiceInfo,
): Promise<any> {
  return api.tx.services.updateService(serviceId, serviceInfo).paymentInfo(pair);
}

export async function deleteService(
  api: ApiPromise,
  pair: any,
  serviceId: string,
  callback?: () => void,
): Promise<void> {
  // tslint:disable-next-line
  var unsub = await api.tx.services.deleteService(serviceId).signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
    successCallback(api, { events, status, callback, unsub });
  });
}

export function deleteServiceFee(api: ApiPromise, pair: any, serviceId: string): Promise<any> {
  return api.tx.services.deleteService(serviceId).paymentInfo(pair);
}
