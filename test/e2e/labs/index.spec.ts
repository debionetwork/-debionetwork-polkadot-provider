import { ApiPromise } from '@polkadot/api';
import 'regenerator-runtime/runtime';
import { Lab, queryLabById, queryLabsByCountryRegionCity, queryLabsCountByCountryRegionCity, queryLabCount, queryLabsAdminKey, queryLabMinimumStakeAmount, queryLabPalletAccount, queryLabTotalStakedAmount, queryLabUnstakeTime } from '../../../src';
import { registerLab, updateLab, deregisterLab, updateLabVerificationStatus, stakeLab, retrieveLabUnstakeAmount, unstakeLab, updateLabMinimumStakeAmount, updateLabUnstakeTime } from "../../../src/command/labs";
import { StakeStatus } from '../../../src/primitives/stake-status';
import { VerificationStatus } from '../../../src/primitives/verification-status';
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
  });

  it('queryLabsByCountryRegionCity should return', async () => {
    const promise: Promise<Lab[]> = new Promise((resolve, reject) => { // eslint-disable-line
      queryLabsByCountryRegionCity(api, `${labDataMock.info.country}-${labDataMock.info.region}`, labDataMock.info.city)
        .then((res) => {
          resolve(res)
        });
    });

    expect((await promise)[0].info).toEqual(labDataMock.info);
  });

  it('queryLabsCountByCountryRegionCity should return', async () => {
    const promise: Promise<number> = new Promise((resolve, reject) => { // eslint-disable-line
      queryLabsCountByCountryRegionCity(api, `${labDataMock.info.country}-${labDataMock.info.region}`, labDataMock.info.city)
        .then((res) => {
          resolve(res)
        });
    });

    expect(await promise).toEqual(1);
  });

  it('queryLabCount should return', async () => {
    const promise: Promise<number> = new Promise((resolve, reject) => { // eslint-disable-line
      queryLabCount(api)
        .then((res) => {
          resolve(res)
        });
    });

    expect(await promise).toEqual(1);
  });

  it('queryLabsAdminKey should return', async () => {
    const promise: Promise<string> = new Promise((resolve, reject) => { // eslint-disable-line
      queryLabsAdminKey(api)
        .then((res) => {
          resolve(res)
        });
    });

    expect(await promise).toEqual(pair.address);
  });

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
  });

  it('updateLabVerificationStatus should return', async () => {
    const status = VerificationStatus.Verified;
    const promise: Promise<Lab> = new Promise((resolve, reject) => { // eslint-disable-line
      updateLabVerificationStatus(api, pair, pair.address, status, () => {
        queryLabById(api, pair.address)
          .then((res) => {
            resolve(res)
          });
      });
    });

    expect((await promise).verificationStatus).toEqual(status);
  });

  it('stakeLab should return', async () => {
    const status = StakeStatus.Staked;
    const promise: Promise<Lab> = new Promise((resolve, reject) => { // eslint-disable-line
      stakeLab(api, pair, () => {
        queryLabById(api, pair.address)
          .then((res) => {
            resolve(res)
          });
      });
    });

    expect((await promise).stakeStatus).toEqual(status);
  });

  it('queryLabPalletAccount should return', async () => {
    const promise: Promise<string> = new Promise((resolve, reject) => { // eslint-disable-line
      queryLabPalletAccount(api)
        .then((res) => {
          resolve(res)
        });
    });

    expect(await promise).toEqual('5EYCAe5gKDvdGNewu5i4UATj9LVx6bz3ysnM5WKBZkXytEVo');
  });

  it('queryLabMinimumStakeAmount should return', async () => {
    const promise: Promise<number> = new Promise((resolve, reject) => { // eslint-disable-line
      queryLabMinimumStakeAmount(api)
        .then((res) => {
          resolve(res)
        });
    });

    expect(await promise).toEqual(50);
  });

  it('queryLabTotalStakedAmount should return', async () => {
    const promise: Promise<number> = new Promise((resolve, reject) => { // eslint-disable-line
      queryLabTotalStakedAmount(api)
        .then((res) => {
          resolve(res)
        });
    });

    expect(await promise).toEqual(50);
  });

  it('queryLabUnstakeTime should return', async () => {
    const promise: Promise<number> = new Promise((resolve, reject) => { // eslint-disable-line
      queryLabUnstakeTime(api)
        .then((res) => {
          resolve(res)
        });
    });

    expect(await promise).toEqual(0);
  });

  it('unstakeLab should return', async () => {
    const status = StakeStatus.WaitingForUnstaked;
    const promise: Promise<Lab> = new Promise((resolve, reject) => { // eslint-disable-line
      unstakeLab(api, pair, () => {
        queryLabById(api, pair.address)
          .then((res) => {
            resolve(res)
          });
      });
    });

    expect((await promise).stakeStatus).toEqual(status);
  });

  it('retrieveLabUnstakeAmount should return', async () => {
    const status = StakeStatus.Unstaked;
    const promise: Promise<Lab> = new Promise((resolve, reject) => { // eslint-disable-line
      retrieveLabUnstakeAmount(api, pair, pair.address, () => {
        queryLabById(api, pair.address)
          .then((res) => {
            resolve(res)
          });
      });
    });

    expect((await promise).stakeStatus).toEqual(status);
  });

  it('updateLabUnstakeTime should return', async () => {
    const unstakeTime = 40;
    const promise: Promise<number> = new Promise((resolve, reject) => { // eslint-disable-line
      updateLabUnstakeTime(api, pair, unstakeTime, () => {
        queryLabUnstakeTime(api)
          .then((res) => {
            resolve(res)
          });
      });
    });

    expect((await promise)).toEqual(unstakeTime);
  });

  it('updateLabMinimumStakeAmount should return', async () => {
    const minimum = 40;
    const promise: Promise<number> = new Promise((resolve, reject) => { // eslint-disable-line
      updateLabMinimumStakeAmount(api, pair, minimum, () => {
        queryLabMinimumStakeAmount(api)
          .then((res) => {
            resolve(res)
          });
      });
    });

    expect((await promise)).toEqual(minimum);
  });

  it('deregisterLab should return', async () => {
    const promise: Promise<number> = new Promise((resolve, reject) => { // eslint-disable-line
      deregisterLab(api, pair, () => {
        queryLabCount(api)
          .then((res) => {
            resolve(res);
          });
      });
    });
    
    expect(await promise).toEqual(0);
  });
});
