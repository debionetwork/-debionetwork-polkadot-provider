import { ApiPromise } from '@polkadot/api';
import 'regenerator-runtime/runtime';
import { Doctor, queryDoctorById, queryDoctorsByCountryRegionCity, queryDoctorsCountByCountryRegionCity, queryDoctorCount } from '../../../src';
import { registerDoctor, registerDoctorFee, updateDoctor, updateDoctorFee, deregisterDoctor } from "../../../src/command/doctors";
import { doctorDataMock } from '../../unit/models/doctors/doctors.mock';
import { initializeApi } from '../polkadot-init';

describe('Doctor Pallet Integration Tests', () => {
  let api: ApiPromise;
  let pair: any;

  beforeAll(async () => {
    const { api: _api, pair: _pair } = await initializeApi();
    api = _api;
    pair = _pair;
  });

  afterAll(() => {
    api.disconnect();
  });

  it('registerDoctor should return', async () => {
    await registerDoctor(api, pair, doctorDataMock.info);
    expect((await queryDoctorById(api, pair.address)).info).toEqual(doctorDataMock.info);
  });

  it('queryDoctorsByCountryRegionCity should return', async () => {
    const promise: Promise<Doctor[]> = new Promise((resolve, reject) => { // eslint-disable-line
      queryDoctorsByCountryRegionCity(api, `${doctorDataMock.info.country}-${doctorDataMock.info.region}`, doctorDataMock.info.city)
        .then((res) => {
          resolve(res)
        });
    });

    expect((await promise)[0].info).toEqual(doctorDataMock.info);
  });

  it('queryDoctorsCountByCountryRegionCity should return', async () => {
    const promise: Promise<number> = new Promise((resolve, reject) => { // eslint-disable-line
      queryDoctorsCountByCountryRegionCity(api, `${doctorDataMock.info.country}-${doctorDataMock.info.region}`, doctorDataMock.info.city)
        .then((res) => {
          resolve(res)
        });
    });

    expect(await promise).toEqual(1);
  });

  it('queryDoctorCount should return', async () => {
    const promise: Promise<number> = new Promise((resolve, reject) => { // eslint-disable-line
      queryDoctorCount(api)
        .then((res) => {
          resolve(res)
        });
    });

    expect(await promise).toEqual(1);
  });

  it('updateDoctor should return', async () => {
    const info = {
      ...doctorDataMock.info,
      country: "SG",
    };

    await updateDoctor(api, pair, info);
    expect((await queryDoctorById(api, pair.address)).info).toEqual(info);
  });

  it('deregisterDoctor should return', async () => {
    await deregisterDoctor(api, pair);
    expect(await queryDoctorById(api, pair.address)).toEqual(0);
  });

  it('registerDoctorFee should return', async () => {
    expect(await registerDoctorFee(api, pair, doctorDataMock.info)).toHaveProperty('partialFee')
  })


  it('updateDoctorFee should return', async () => {
    const info = {
      ...doctorDataMock.info,
      country: "SG",
    };
    expect(await updateDoctorFee(api, pair, info)).toHaveProperty('partialFee')
  })
});
