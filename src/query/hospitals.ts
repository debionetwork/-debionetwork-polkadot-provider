import { ApiPromise } from '@polkadot/api';
import { Hospital } from '../models/hospitals';

export async function queryHospitalById(api: ApiPromise, hospitalsId: string): Promise<Hospital> {
  const res = (await api.query.hospitals.hospitals(hospitalsId)).toHuman();
  return new Hospital(res);
}

export async function queryHospitalsByCountryRegionCity(
  api: ApiPromise,
  countryRegion: string,
  city: string,
): Promise<Hospital[]> {
  const hospitalIds: any = (await api.query.hospitals.hospitalsByCountryRegionCity(countryRegion, city)).toHuman();
  const hospitalList: Hospital[] = new Array<Hospital>();
  for (const hospitalId of hospitalIds) {
    hospitalList.push(await queryHospitalById(api, hospitalId));
  }
  return hospitalList;
}

export async function queryHospitalCount(api: ApiPromise): Promise<number> {
  const res: any = (await api.query.hospitals.hospitalCount()).toHuman();
  return parseInt(res, 0);
}

export async function queryHospitalsCountByCountryRegionCity(
  api: ApiPromise,
  countryRegion: string,
  city: string,
): Promise<number> {
  const res: any = (await api.query.hospitals.hospitalCountByCountryRegionCity(countryRegion, city)).toHuman();
  return parseInt(res, 0);
}

export async function queryHospitalsAdminKey(api: ApiPromise): Promise<string> {
  return (await api.query.hospitals.adminKey()).toString();
}
