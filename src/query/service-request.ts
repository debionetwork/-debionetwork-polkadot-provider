import { ApiPromise } from '@polkadot/api';
import { ServiceRequest } from '../index';

export async function queryServiceRequestById(api: ApiPromise, requestId: string): Promise<ServiceRequest> {
  const resp = (await api.query.serviceRequest.requestById(requestId)).toHuman();
  return new ServiceRequest(resp);
}

export async function queryServiceRequestByAccountId(api: ApiPromise, accountId: string): Promise<ServiceRequest[]> {
  const ids = (await api.query.serviceRequest.requestByAccountId(accountId)).toHuman() as string[];
  const serviceRequests: ServiceRequest[] = new Array<ServiceRequest>();

  for (const id of ids) {
    const serviceRequest = await queryServiceRequestById(api, id);
    serviceRequests.push(serviceRequest);
  }
  return serviceRequests;
}

export async function queryGetAllServiceRequest(api: ApiPromise): Promise<ServiceRequest[]> {
  const resp = await api.query.serviceRequest.requestById.entries();
  const serviceRequestArray: ServiceRequest[] = [];
  resp.forEach((element) => {
    serviceRequestArray.push(new ServiceRequest(element[1].toHuman()));
  });
  return serviceRequestArray;
}

export async function queryServiceRequestByOrderId(api: ApiPromise, orderId: string): Promise<string> {
  const resp = (await api.query.serviceRequest.requestByOrderId(orderId)).toString();
  return resp;
}
