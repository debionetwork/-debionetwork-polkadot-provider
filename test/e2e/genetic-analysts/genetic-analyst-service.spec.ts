import 'regenerator-runtime/runtime';
import { ApiPromise } from "@polkadot/api";
import { initializeApi } from '../polkadot-init';
import { geneticAnalystServicesMock } from '../../unit/models/genetic-analysts/genetic-analyst-services.mock';
import { createGeneticAnalystService, GeneticAnalyst, GeneticAnalystsAvailabilityStatus, GeneticAnalystService, GeneticAnalystsVerificationStatus, queryGeneticAnalystByAccountId, queryGetAllGeneticAnalystServices, registerGeneticAnalyst, stakeGeneticAnalyst, updateGeneticAnalystAvailabilityStatus, updateGeneticAnalystVerificationStatus } from '../../../src';
import { geneticAnalystsDataMock } from '../../unit/models/genetic-analysts/genetic-analysts.mock';

describe('Genetic Analysis Service Pallet Integration Tests', () => {
  let api: ApiPromise;
  let pair: any;

  let geneticAnalyst: GeneticAnalyst;
  let geneticAnalystService: GeneticAnalystService;

  beforeAll(async () => {
    const { api: _api, pair: _pair } = await initializeApi();
    api = _api;
    pair = _pair;
  });

  afterAll(() => {
    api.disconnect();
  });

  it('createGeneticAnalysisService should', async () => {
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
      GeneticAnalystsVerificationStatus.Verified
    );

    await updateGeneticAnalystAvailabilityStatus(
      api,
      pair,
      GeneticAnalystsAvailabilityStatus.Available
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

  }, 80000);
});