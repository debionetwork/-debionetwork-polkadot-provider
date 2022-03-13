import { ApiPromise } from "@polkadot/api";
import { ServiceFlow, ServiceInfo, successCallback } from "../..";

export async function createService(api: ApiPromise, pair: any, service_info: ServiceInfo, service_flow: string, callback?: () => void): Promise<void> {
  // tslint:disable-next-line
  var unsub = await api.tx.services.createService(service_info, service_flow).signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
    successCallback(api, { events, status, callback, unsub });
  });
}

export async function updateService(api: ApiPromise, pair: any, service_id: string, service_info: ServiceInfo, callback?: () => void): Promise<void> {
  // tslint:disable-next-line
  var unsub = await api.tx.services.updateService(service_id, service_info).signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
    successCallback(api, { events, status, callback, unsub });
  });
}

export async function deleteService(api: ApiPromise, pair: any, service_id: string, callback?: () => void): Promise<void> {
  // tslint:disable-next-line
  var unsub = await api.tx.services.deleteService(service_id).signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
    successCallback(api, { events, status, callback, unsub });
  });
}