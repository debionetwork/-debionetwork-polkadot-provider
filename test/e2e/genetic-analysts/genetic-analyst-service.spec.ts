import 'regenerator-runtime/runtime';
import { ApiPromise } from "@polkadot/api";
import { initializeApi } from '../polkadot-init';
import { geneticAnalystServicesMock } from '../../unit/models/genetic-analysts/genetic-analyst-services.mock';
import { createGeneticAnalystService, createGeneticAnalystServiceFee, deleteGeneticAnalystService, GeneticAnalyst, GeneticAnalystService, queryGeneticAnalystByAccountId, queryGeneticAnalystServicesByHashId, queryGeneticAnalystServicesCount, queryGeneticAnalystServicesCountByOwner, queryGetAllGeneticAnalystServices, registerGeneticAnalyst, stakeGeneticAnalyst, updateGeneticAnalystAvailabilityStatus, updateGeneticAnalystService, updateGeneticAnalystServiceFee, updateGeneticAnalystVerificationStatus } from '../../../src';
import { geneticAnalystsDataMock } from '../../unit/models/genetic-analysts/genetic-analysts.mock';
import { AvailabilityStatus } from '../../../src/primitives/availability-status';
import { VerificationStatus } from '../../../src/primitives/verification-status';

describe('Genetic Analysis Service Pallet Integration Tests', () => {
  let api: ApiPromise;
  let pair: any;

  let geneticAnalyst: GeneticAnalyst;
  let geneticAnalystService: GeneticAnalystService;
  let geneticAnalystServiceFee: any;

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

    geneticAnalyst = await geneticAnalystPromise;
    expect(geneticAnalyst.normalize().info).toEqual(geneticAnalystsDataMock.info);

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

    const geneticAnalystServicePromise: Promise<GeneticAnalystService> = new Promise((resolve, reject) => { // eslint-disable-line
      createGeneticAnalystService(api, pair, geneticAnalystServicesMock[0][1]['info'], () => {
        queryGetAllGeneticAnalystServices(api)
          .then((res) => {
            resolve(res[0]);
          });
      });
    });

    geneticAnalystService = await geneticAnalystServicePromise;
    expect(geneticAnalystService.info).toEqual(geneticAnalystServicesMock[0][1]['info']);

  }, 38000);

  it('updateGeneticAnalysisService and queryGeneticAnalystServicesByHashId should return', async () => {
    geneticAnalystServicesMock[0][1]['info']['name'] = 'updateString'
    const serviceId = geneticAnalystService.id
    const geneticAnalystPromise: Promise<GeneticAnalystService> = new Promise((resolve, reject) => { // eslint-disable-line
      updateGeneticAnalystService(api, pair, serviceId, geneticAnalystServicesMock[0][1]['info'], () => {
        queryGeneticAnalystServicesByHashId(api, geneticAnalystService.id)
          .then((res) => {
            resolve(res);
          });
      });
    });
    
    geneticAnalystService = await geneticAnalystPromise;

    expect(geneticAnalystService.info).toEqual(geneticAnalystServicesMock[0][1]['info']);
  }, 23000);

  it('createGeneticAnalysisServiceFee should return', async () => {
    const geneticAnalystServicePromise = await createGeneticAnalystServiceFee(api, pair, geneticAnalystServicesMock[0][1]['info']);
    geneticAnalystServiceFee =  geneticAnalystServicePromise

    expect(geneticAnalystServicePromise).toHaveProperty('partialFee')
  }, 2000);

  it('updateGeneticAnalysisServiceFee should return', async () => {
    const geneticAnalystServicePromise = await updateGeneticAnalystServiceFee(api, pair,geneticAnalystService.id, geneticAnalystServicesMock[0][1]['info']);
    geneticAnalystServiceFee =  geneticAnalystServicePromise

    expect(geneticAnalystServicePromise).toHaveProperty('partialFee')
  }, 2000);

  it('queryGeneticAnalystServicesCountByOwner should return', async () => {
    const geneticAnalystServicePromise = await queryGeneticAnalystServicesCountByOwner(api, geneticAnalystService.ownerId);
    expect(geneticAnalystServicePromise).toBeGreaterThan(0)
  }, 2000);

  it('deleteGeneticAnalysisService and queryGeneticAnalystServicesCount should return', async () => {
    const serviceId = geneticAnalystService.id
    const geneticAnalystPromise: Promise<Number> = new Promise((resolve, reject) => { // eslint-disable-line
      deleteGeneticAnalystService(api, pair, serviceId, () => {
        queryGeneticAnalystServicesCount(api)
          .then((res) => {
            resolve(res);
          });
      });
    });
    
    expect(await geneticAnalystPromise).toEqual(0);
  }, 22000);
  
});