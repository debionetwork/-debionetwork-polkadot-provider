import 'regenerator-runtime/runtime';
import { ApiPromise } from "@polkadot/api";
import { initializeApi } from '../polkadot-init';
import { geneticAnalystServicesMock } from '../../unit/models/genetic-analysts/genetic-analyst-services.mock';
import { createGeneticAnalystService, createGeneticAnalystServiceFee, deleteGeneticAnalystService, deregisterGeneticAnalyst, GeneticAnalyst, GeneticAnalystService, queryGeneticAnalystByAccountId, queryGeneticAnalystServicesByHashId, queryGeneticAnalystServicesCount, queryGeneticAnalystServicesCountByOwner, queryGetAllGeneticAnalystServices, registerGeneticAnalyst, stakeGeneticAnalyst, updateGeneticAnalystAvailabilityStatus, updateGeneticAnalystService, updateGeneticAnalystServiceFee, updateGeneticAnalystVerificationStatus } from '../../../src/';
import { geneticAnalystsDataMock } from '../../unit/models/genetic-analysts/genetic-analysts.mock';
import { AvailabilityStatus } from '../../../src/primitives/availability-status';
import { VerificationStatus } from '../../../src/primitives/verification-status';

describe('Genetic Analysis Service Pallet Integration Tests', () => {
  let api: ApiPromise;
  let pair: any;
  let geneticAnalystService: GeneticAnalystService;

  beforeAll(async () => {
    const { api: _api, pair: _pair } = await initializeApi();
    api = _api;
    pair = _pair;
  });

  afterAll(() => {
    api.disconnect();
  });

  it('createGeneticAnalysisService and queryGetAllGeneticAnalystServices should return', async () => {
    const geneticAnalystPromise: Promise<GeneticAnalyst> = new Promise((resolve, reject) => { // eslint-disable-line
      registerGeneticAnalyst(api, pair, geneticAnalystsDataMock.info, () => {
        queryGeneticAnalystByAccountId(api, pair.address)
          .then((res) => {
            resolve(res);
          });
      });
    });

    expect((await geneticAnalystPromise).normalize().info).toEqual(geneticAnalystsDataMock.info);

    await stakeGeneticAnalyst(
      api,
      pair
    );

    await updateGeneticAnalystVerificationStatus(
      api,
      pair,
      pair.address,
      VerificationStatus.Verified
    );

    await updateGeneticAnalystAvailabilityStatus(
      api,
      pair,
      AvailabilityStatus.Available
    );

    const geneticAnalystServicesPromise: Promise<GeneticAnalystService> = new Promise((resolve, reject) => { // eslint-disable-line
      createGeneticAnalystService(api, pair, geneticAnalystServicesMock[0][1]['info'], () => {
        queryGetAllGeneticAnalystServices(api)
          .then((res) => {
            resolve(res[0]);
          });
      });
    });

    geneticAnalystService = await geneticAnalystServicesPromise;
    expect(geneticAnalystService.info).toEqual(geneticAnalystServicesMock[0][1]['info']);
  });

  it('updateGeneticAnalysisService and queryGeneticAnalystServicesByHashId should return', async () => {
    geneticAnalystServicesMock[0][1]['info']['name'] = 'updateString'
    
    const promise: Promise<GeneticAnalystService> = new Promise((resolve, reject) => { // eslint-disable-line
      updateGeneticAnalystService(api, pair, geneticAnalystService.id, geneticAnalystServicesMock[0][1]['info'], () => {
        queryGeneticAnalystServicesByHashId(api, geneticAnalystService.id)
          .then((res) => {
            resolve(res);
          });
      });
    });

    expect((await promise).info).toEqual(geneticAnalystServicesMock[0][1]['info']);
  });

  it('createGeneticAnalysisServiceFee should return', async () => {
    expect(await createGeneticAnalystServiceFee(api, pair, geneticAnalystServicesMock[0][1]['info'])).toHaveProperty('partialFee')
  });

  it('updateGeneticAnalysisServiceFee should return', async () => {
    expect(await updateGeneticAnalystServiceFee(api, pair, geneticAnalystService.id, geneticAnalystServicesMock[0][1]['info'])).toHaveProperty('partialFee')
  });

  it('queryGeneticAnalystServicesCountByOwner should return', async () => {
    expect(await queryGeneticAnalystServicesCountByOwner(api, geneticAnalystService.ownerId)).toBeGreaterThan(0)
  });

  it('deleteGeneticAnalysisService and queryGeneticAnalystServicesCount should return', async () => {
    const promise: Promise<Number> = new Promise((resolve, reject) => { // eslint-disable-line
      deleteGeneticAnalystService(api, pair, geneticAnalystService.id, () => {
        queryGeneticAnalystServicesCount(api)
          .then((res) => {
            deregisterGeneticAnalyst(api, pair, () => {
              resolve(res);
            });
          });
      });
    });
    
    expect(await promise).toEqual(0);
  });
});