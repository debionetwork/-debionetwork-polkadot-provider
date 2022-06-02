import { ApiPromise } from '@polkadot/api';
import 'regenerator-runtime/runtime';
import { Hospital, queryHospitalById, queryHospitalsByCountryRegionCity, queryHospitalsCountByCountryRegionCity, queryHospitalCount } from '../../../src';
import { registerHospital, registerHospitalFee, updateHospital, updateHospitalFee, deregisterHospital } from "../../../src/command/hospitals";
import { hospitalDataMock } from '../../unit/models/hospitals/hospitals.mock';
import { initializeApi } from '../polkadot-init';

describe('Hospital Pallet Integration Tests', () => {
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

  it('registerHospital should return', async () => {
    const promise: Promise<Hospital> = new Promise((resolve, reject) => { // eslint-disable-line
      registerHospital(api, pair, hospitalDataMock.info, () => {
        queryHospitalById(api, pair.address)
          .then((res) => {
            resolve(res)
          });
      }).catch(e => reject(e));
    });

    expect((await promise).info).toEqual(hospitalDataMock.info);
  });

  it('queryHospitalsByCountryRegionCity should return', async () => {
    const promise: Promise<Hospital[]> = new Promise((resolve, reject) => { // eslint-disable-line
      queryHospitalsByCountryRegionCity(api, `${hospitalDataMock.info.country}-${hospitalDataMock.info.region}`, hospitalDataMock.info.city)
        .then((res) => {
          resolve(res)
        });
    });

    expect((await promise)[0].info).toEqual(hospitalDataMock.info);
  });

  it('queryHospitalsCountByCountryRegionCity should return', async () => {
    const promise: Promise<number> = new Promise((resolve, reject) => { // eslint-disable-line
      queryHospitalsCountByCountryRegionCity(api, `${hospitalDataMock.info.country}-${hospitalDataMock.info.region}`, hospitalDataMock.info.city)
        .then((res) => {
          resolve(res)
        });
    });

    expect(await promise).toEqual(1);
  });

  it('queryHospitalCount should return', async () => {
    const promise: Promise<number> = new Promise((resolve, reject) => { // eslint-disable-line
      queryHospitalCount(api)
        .then((res) => {
          resolve(res)
        });
    });

    expect(await promise).toEqual(1);
  });

  it('updateHospital should return', async () => {
    const info = {
      ...hospitalDataMock.info,
      country: "SG",
    };

    const promise: Promise<Hospital> = new Promise((resolve, reject) => { // eslint-disable-line
      updateHospital(api, pair, info, () => {
        queryHospitalById(api, pair.address)
          .then((res) => {
            resolve(res)
          });
      }).catch(e => reject(e));
    });

    expect((await promise).info).toEqual(info);
  });

  it('deregisterHospital should return', async () => {
    const promise: Promise<number> = new Promise((resolve, reject) => { // eslint-disable-line
      deregisterHospital(api, pair, () => {
        queryHospitalCount(api)
          .then((res) => {
            resolve(res);
          });
      }).catch(e => reject(e));
    });
    
    expect(await promise).toEqual(0);
  });

  it('registerHospitalFee should return', async () => {
    expect(await registerHospitalFee(api, pair, hospitalDataMock.info)).toHaveProperty('partialFee')
  })


  it('updateHospitalFee should return', async () => {
    const info = {
      ...hospitalDataMock.info,
      country: "SG",
    };
    expect(await updateHospitalFee(api, pair, info)).toHaveProperty('partialFee')
  })
});
