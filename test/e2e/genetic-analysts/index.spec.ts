import 'regenerator-runtime/runtime';
import { ApiPromise } from "@polkadot/api";
import { deregisterGeneticAnalyst, GeneticAnalyst, queryGeneticAnalystByAccountId, queryGeneticAnalystCount, queryGeneticAnalystMinimumStakeAmount, queryGeneticAnalystVerifierKey, registerGeneticAnalyst, retrieveGeneticAnalystUnstakeAmount, stakeGeneticAnalyst, unstakeGeneticAnalyst, updateGeneticAnalyst, updateGeneticAnalystAvailabilityStatus, updateGeneticAnalystMinimumStakeAmount, updateGeneticAnalystVerificationStatus } from "../../../src";
import { initializeApi } from "../polkadot-init";
import { geneticAnalystsDataMock } from '../../unit/models/genetic-analysts/genetic-analysts.mock';
import { VerificationStatus } from '../../../src/primitives/verification-status';
import { AvailabilityStatus } from '../../../src/primitives/availability-status';

describe('Genetic Analyst Pallet Integration Tests', () => {
  let api: ApiPromise;
  let pair: any;

  let geneticAnalyst: GeneticAnalyst;

  beforeAll(async () => {
    const { api: _api, pair: _pair } = await initializeApi();
    api = _api;
    pair = _pair;
  });

  afterAll(() => {
    api.disconnect();
  });

  it('registerGeneticAnalyst and queryGeneticAnalystByAccountId should return', async () => {
    const geneticAnalystPromise: Promise<GeneticAnalyst> = new Promise((resolve, reject) => { // eslint-disable-line
      registerGeneticAnalyst(api, pair, geneticAnalystsDataMock.info, () => {
        queryGeneticAnalystByAccountId(api, pair.address)
          .then((res) => {
            resolve(res);
          });
      });
    });
    geneticAnalyst = await geneticAnalystPromise;
    expect(geneticAnalyst.normalize().info).toEqual(geneticAnalystsDataMock.info);
  });

  it('stakeGeneticAnalyst and queryGeneticAnalystByAccountId should return', async () => {
    const geneticAnalystPromise: Promise<GeneticAnalyst> = new Promise((resolve, reject) => { // eslint-disable-line
      stakeGeneticAnalyst(api, pair, () => {
        queryGeneticAnalystByAccountId(api, pair.address)
          .then((res) => {
            resolve(res);
          });
      });
    });
    
    geneticAnalyst = await geneticAnalystPromise;
    expect(geneticAnalyst.normalize().stakeAmount).toBeGreaterThan(0);
  });

  it('updateGeneticAnalystVerificationStatus should return', async () => {
    const geneticAnalystPromise: Promise<GeneticAnalyst> = new Promise((resolve, reject) => { // eslint-disable-line
      updateGeneticAnalystVerificationStatus(api, pair, pair.address, VerificationStatus.Verified, () => {
        queryGeneticAnalystByAccountId(api, pair.address)
          .then((res) => {
            resolve(res);
          });
      });
    });
    
    geneticAnalyst = await geneticAnalystPromise;
    expect(geneticAnalyst.normalize().verificationStatus).toEqual(VerificationStatus.Verified);
  });

  it('updateGeneticAnalystAvailabilityStatus should return', async () => {
    const geneticAnalystPromise: Promise<GeneticAnalyst> = new Promise((resolve, reject) => { // eslint-disable-line
      updateGeneticAnalystAvailabilityStatus(api, pair, AvailabilityStatus.Available, () => {
        queryGeneticAnalystByAccountId(api, pair.address)
          .then((res) => {
            resolve(res);
          });
      });
    });
    
    geneticAnalyst = await geneticAnalystPromise;
    expect(geneticAnalyst.availabilityStatus).toEqual(AvailabilityStatus.Available);
  });

  it('updateGeneticAnalyst should return', async () => {
    const inputUpdateLastName = 'testUpdateLastName';
    geneticAnalystsDataMock.info.lastName = inputUpdateLastName;

    const geneticAnalystPromise: Promise<GeneticAnalyst> = new Promise((resolve, reject) => { // eslint-disable-line
      updateGeneticAnalyst(api, pair, geneticAnalystsDataMock.info, () => {
        queryGeneticAnalystByAccountId(api, pair.address)
          .then((res) => {
            resolve(res);
          });
      });
    });
    
    geneticAnalyst = await geneticAnalystPromise;
    expect(geneticAnalyst.normalize().info.lastName).toEqual(inputUpdateLastName);
  });

  it('unstakeGeneticAnalyst should return', async () => {
    const geneticAnalystPromise: Promise<GeneticAnalyst> = new Promise((resolve, reject) => { // eslint-disable-line
      unstakeGeneticAnalyst(api, pair, () => {
        queryGeneticAnalystByAccountId(api, pair.address)
          .then((res) => {
            resolve(res);
          });
      });
    });
    
    geneticAnalyst = await geneticAnalystPromise;
    
    expect(geneticAnalyst.normalize().unstakeAt).not.toBeNull();
    expect(geneticAnalyst.availabilityStatus).toEqual(AvailabilityStatus.Unavailable);

  });

  it('retrieveGeneticAnalystUnstakeAmount should return', async () => {
    const geneticAnalystPromise: Promise<GeneticAnalyst> = new Promise((resolve, reject) => { // eslint-disable-line
      retrieveGeneticAnalystUnstakeAmount(api, pair, pair.address, () => {
        queryGeneticAnalystByAccountId(api, pair.address)
          .then((res) => {
            resolve(res);
          });
      });
    });
    
    geneticAnalyst = await geneticAnalystPromise;
    
    expect(geneticAnalyst.normalize().stakeAmount).toEqual(0);
  });

  it('updateGeneticAnalystMinimumStakeAmount, queryGeneticAnalystCount and queryGeneticAnalystVerifierKey should return', async () => {
    const minimumStakeInput = 2
    const geneticAnalystPromise: Promise<Number> = new Promise((resolve, reject) => { // eslint-disable-line
      updateGeneticAnalystMinimumStakeAmount(api, pair, minimumStakeInput,  () => {
        queryGeneticAnalystMinimumStakeAmount(api)
          .then((res) => {
            resolve(res);
          });
      });
    });
    
    const verifierKey = await queryGeneticAnalystVerifierKey(api)
    const geneticAnalystMinimumStake = await geneticAnalystPromise;
    
    expect(geneticAnalystMinimumStake).toEqual(minimumStakeInput);
    expect(verifierKey).not.toBeFalsy()
  });

  it('deregisterGeneticAnalyst and queryGeneticAnalystCount should return', async () => {
    const promise: Promise<Number> = new Promise((resolve, reject) => { // eslint-disable-line
      deregisterGeneticAnalyst(api, pair, () => {
        queryGeneticAnalystCount(api)
          .then((res) => {
            resolve(res);
          });
      });
    });
    
    expect(await promise).toEqual(0);
  });
});