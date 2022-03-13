import { ApiPromise } from '@polkadot/api';
import { Lab } from '../../models/labs';

export async function queryLabById(api: ApiPromise, labId: string): Promise<Lab> {
  const res = (await api.query.labs.labs(labId)).toHuman();
  return new Lab(res);
}

export async function queryLabsByCountryRegionCity(
  api: ApiPromise,
  countryRegion: string,
  city: string,
): Promise<Lab[]> {
  const labIds: any = (await api.query.labs.labsByCountryRegionCity(countryRegion, city)).toHuman();
  const labList: Lab[] = new Array<Lab>();
  for (const labId of labIds) {
    labList.push(await queryLabById(api, labId));
  }
  return labList;
}

export async function queryLabCount(api: ApiPromise): Promise<number> {
  const res: any = (await api.query.labs.labCount()).toHuman();
  return parseInt(res, 0);
}

export async function queryLabsCountByCountryRegionCity(
  api: ApiPromise,
  countryRegion: string,
  city: string,
): Promise<number> {
  const res: any = (await api.query.labs.labCountByCountryRegionCity(countryRegion, city)).toHuman();
  return parseInt(res, 0);
}

export async function queryLabsAdminKey(api: ApiPromise): Promise<string> {
  return (await api.query.labs.labVerifierKey()).toString();
}

export * from './orders';
export * from './services';
export * from './certifications';
