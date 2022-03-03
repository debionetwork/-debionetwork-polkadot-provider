import { ApiPromise } from '@polkadot/api';
import { Service } from '../../models/labs/services';

export async function queryServiceById(api: ApiPromise, serviceId: string): Promise<Service> {
  const res = (await api.query.services.services(serviceId)).toHuman();
  return new Service(res);
}

export async function queryServicesByMultipleIds(api: ApiPromise, serviceIds: string[]): Promise<Service[]> {
  const services: Service[] = new Array<Service>();
  for (const serviceId of serviceIds) {
    services.push(await queryServiceById(api, serviceId));
  }
  return services;
}

export async function queryServicesCount(api: ApiPromise): Promise<number> {
  const res: any = (await api.query.services.servicesCount()).toHuman();
  return parseInt(res, 0);
}

export async function queryServicesCountByOwnerId(api: ApiPromise, accoutId: string): Promise<number> {
  const res: any = (await api.query.services.servicesCountByOwner(accoutId)).toHuman();
  return parseInt(res, 0);
}
