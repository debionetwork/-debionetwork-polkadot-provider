import { ApiPromise } from '@polkadot/api';
import { Doctor } from '../models/doctors';

export async function queryDoctorById(api: ApiPromise, doctorId: string): Promise<Doctor> {
  const res = (await api.query.doctors.doctors(doctorId)).toHuman();
  return new Doctor(res);
}

export async function queryDoctorsByCountryRegionCity(
  api: ApiPromise,
  countryRegion: string,
  city: string,
): Promise<Doctor[]> {
  const doctorIds: any = (await api.query.doctors.doctorsByCountryRegionCity(countryRegion, city)).toHuman();
  const doctorList: Doctor[] = new Array<Doctor>();
  for (const doctorId of doctorIds) {
    doctorList.push(await queryDoctorById(api, doctorId));
  }
  return doctorList;
}

export async function queryDoctorCount(api: ApiPromise): Promise<number> {
  const res: any = (await api.query.doctors.doctorCount()).toHuman();
  return parseInt(res, 0);
}

export async function queryDoctorsCountByCountryRegionCity(
  api: ApiPromise,
  countryRegion: string,
  city: string,
): Promise<number> {
  const res: any = (await api.query.doctors.doctorCountByCountryRegionCity(countryRegion, city)).toHuman();
  return parseInt(res, 0);
}

export async function queryDoctorsAdminKey(api: ApiPromise): Promise<string> {
  return (await api.query.doctors.adminKey()).toString();
}
