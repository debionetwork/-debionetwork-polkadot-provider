import { ApiPromise } from '@polkadot/api';
import 'regenerator-runtime/runtime';
import { Lab, queryLabById, queryLabsByCountryRegionCity, queryLabsCountByCountryRegionCity, queryLabCount, queryLabsAdminKey, LabVerificationStatus } from '../../../src';
import { registerLab, updateLab, deregisterLab, updateLabVerificationStatus } from "../../../src/command/labs";
import { labDataMock } from '../../unit/models/labs/labs.mock';
import { initializeApi } from '../polkadot-init';

describe('Lab Pallet Integration Tests', () => {
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

  it('registerLab should return', async () => {
    const promise: Promise<Lab> = new Promise((resolve, reject) => { // eslint-disable-line
      registerLab(api, pair, labDataMock.info, () => {
        queryLabById(api, pair.address)
          .then((res) => {
            resolve(res)
          });
      });
    });

    expect((await promise).info).toEqual(labDataMock.info);
  }, 25000); // Set timeout for 90 seconds

  it('queryLabsByCountryRegionCity should return', async () => {
    const promise: Promise<Lab[]> = new Promise((resolve, reject) => { // eslint-disable-line
      queryLabsByCountryRegionCity(api, `${labDataMock.info.country}-${labDataMock.info.region}`, labDataMock.info.city)
        .then((res) => {
          resolve(res)
        });
    });

    expect((await promise)[0].info).toEqual(labDataMock.info);
  }, 25000); // Set timeout for 90 seconds

  it('queryLabsCountByCountryRegionCity should return', async () => {
    const promise: Promise<number> = new Promise((resolve, reject) => { // eslint-disable-line
      queryLabsCountByCountryRegionCity(api, `${labDataMock.info.country}-${labDataMock.info.region}`, labDataMock.info.city)
        .then((res) => {
          resolve(res)
        });
    });

    expect(await promise).toEqual(1);
  }, 25000); // Set timeout for 90 seconds

  it('queryLabCount should return', async () => {
    const promise: Promise<number> = new Promise((resolve, reject) => { // eslint-disable-line
      queryLabCount(api)
        .then((res) => {
          resolve(res)
        });
    });

    expect(await promise).toEqual(1);
  }, 25000); // Set timeout for 90 seconds

  it('queryLabsAdminKey should return', async () => {
    const promise: Promise<string> = new Promise((resolve, reject) => { // eslint-disable-line
      queryLabsAdminKey(api)
        .then((res) => {
          resolve(res)
        });
    });

    expect(await promise).toEqual(pair.address);
  }, 25000); // Set timeout for 90 seconds

  it('updateLab should return', async () => {
    const info = {
      ...labDataMock.info,
      country: "SG",
    };

    const promise: Promise<Lab> = new Promise((resolve, reject) => { // eslint-disable-line
      updateLab(api, pair, info, () => {
        queryLabById(api, pair.address)
          .then((res) => {
            resolve(res)
          });
      });
    });

    expect((await promise).info).toEqual(info);
  }, 25000); // Set timeout for 90 seconds

  it('updateLabVerificationStatus should return', async () => {
    const status = LabVerificationStatus.Verified;
    const promise: Promise<Lab> = new Promise((resolve, reject) => { // eslint-disable-line
      updateLabVerificationStatus(api, pair, pair.address, status, () => {
        queryLabById(api, pair.address)
          .then((res) => {
            resolve(res)
          });
      });
    });

    expect((await promise).verificationStatus).toEqual(status);
  }, 25000); // Set timeout for 90 seconds

  it('deregisterLab should return', async () => {
    const promise: Promise<string> = new Promise((resolve, reject) => { // eslint-disable-line
      deregisterLab(api, pair, () => {
        resolve("Deregistered");
      });
    });

    await promise;
  }, 25000); // Set timeout for 90 seconds
});
