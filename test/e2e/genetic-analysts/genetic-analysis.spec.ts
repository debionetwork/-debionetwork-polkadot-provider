import 'regenerator-runtime/runtime';
import { ApiPromise } from '@polkadot/api';
import { addGeneticData, createGeneticAnalysisOrder, createGeneticAnalystService, deleteGeneticAnalystService, deregisterGeneticAnalyst, processGeneticAnalysis, queryGeneticAnalysisByGeneticAnalysisTrackingId, queryGeneticAnalystByAccountId, queryGeneticAnalystServicesCount, queryGeneticDataByOwnerId, queryGetAllGeneticAnalystServices, queryLastGeneticAnalysisOrderByCustomerId, registerGeneticAnalyst, rejectGeneticAnalysis, stakeGeneticAnalyst, submitGeneticAnalysis, updateGeneticAnalystAvailabilityStatus, updateGeneticAnalystVerificationStatus } from '../../../src';
import { GeneticAnalysis, GeneticAnalysisOrder, GeneticAnalysisStatus, GeneticAnalyst, GeneticAnalystService, GeneticData } from '../../../src/models/genetic-analysts';
import { geneticAnalysisOrdersDataMock } from '../../unit/models/genetic-analysts/genetic-analysis-orders.mock';
import { geneticAnalystServicesMock } from '../../unit/models/genetic-analysts/genetic-analyst-services.mock';
import { geneticAnalystsDataMock } from '../../unit/models/genetic-analysts/genetic-analysts.mock';
import { geneticDataMock } from '../../unit/models/genetic-analysts/genetic-data.mock';
import { initializeApi } from '../polkadot-init';
import { VerificationStatus } from '../../../src/primitives/verification-status';
import { AvailabilityStatus } from '../../../src/primitives/availability-status';

describe('Genetic Analysis Pallet Integration Tests', () => {
  let api: ApiPromise;
  let pair: any;

  let geneticAnalyst: GeneticAnalyst;
  let geneticAnalystService: GeneticAnalystService;
  let geneticData: GeneticData;
  let geneticAnalysisOrder: GeneticAnalysisOrder;

  beforeAll(async () => {
    const { api: _api, pair: _pair } = await initializeApi();
    api = _api;
    pair = _pair;
  });

  afterAll(() => {
    api.disconnect();
  });

  it('submitGeneticAnalysis should return', async () => {
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

    const geneticDataPromise: Promise<GeneticData> = new Promise((resolve, reject) => { // eslint-disable-line
      addGeneticData(api, pair, geneticDataMock.title, geneticDataMock.description, geneticDataMock.reportLink, () => {
        queryGeneticDataByOwnerId(api, pair.address)
          .then((res) => {
            resolve(res[0]);
          });
      });
    });

    geneticData = await geneticDataPromise;
    expect(geneticData.title).toEqual(geneticDataMock.title);
    expect(geneticData.description).toEqual(geneticDataMock.description);
    expect(geneticData.reportLink).toEqual(geneticDataMock.reportLink);

    const geneticAnalysisOrderPromise: Promise<GeneticAnalysisOrder> = new Promise((resolve, reject) => { // eslint-disable-line
      createGeneticAnalysisOrder(api, pair, geneticData.id, geneticAnalystService.id, 0, geneticData.reportLink, geneticAnalysisOrdersDataMock.customerBoxPublicKey, () => {
        queryLastGeneticAnalysisOrderByCustomerId(api, pair.address)
          .then((res) => {
            resolve(res);
          });
      });
    });

    geneticAnalysisOrder = await geneticAnalysisOrderPromise;
    expect(geneticAnalysisOrder.sellerId).toEqual(pair.address);
    expect(geneticAnalysisOrder.geneticDataId).toEqual(geneticData.id);
    expect(geneticAnalysisOrder.customerBoxPublicKey).toEqual(geneticAnalysisOrdersDataMock.customerBoxPublicKey);

    const submitGeneticAnalysisPromise: Promise<GeneticAnalysis> = new Promise((resolve, reject) => { // eslint-disable-line
      submitGeneticAnalysis(api, pair, geneticAnalysisOrder.geneticAnalysisdTrackingId, geneticDataMock.reportLink, "string", () => {
        queryGeneticAnalysisByGeneticAnalysisTrackingId(api, geneticAnalysisOrder.geneticAnalysisdTrackingId)
          .then((res) => {
            resolve(res);
          });
      });
    });

    const geneticAnalysis = await submitGeneticAnalysisPromise;
    expect(geneticAnalysis.reportLink).toEqual(geneticDataMock.reportLink);
    expect(geneticAnalysis.comment).toEqual("string");
    expect(geneticAnalysis.geneticAnalysisTrackingId).toEqual(geneticAnalysisOrder.geneticAnalysisdTrackingId);
  });

  it('processGeneticAnalysis should return', async () => {
    const processInProgressGeneticAnalysisPromise: Promise<GeneticAnalysis> = new Promise((resolve, reject) => { // eslint-disable-line
      processGeneticAnalysis(api, pair, geneticAnalysisOrder.geneticAnalysisdTrackingId, GeneticAnalysisStatus.InProgress, () => {
        queryGeneticAnalysisByGeneticAnalysisTrackingId(api, geneticAnalysisOrder.geneticAnalysisdTrackingId)
          .then((res) => {
            resolve(res);
          });
      });
    });

    const geneticAnalysisInProgress = await processInProgressGeneticAnalysisPromise;
    expect(geneticAnalysisInProgress.reportLink).toEqual(geneticDataMock.reportLink);
    expect(geneticAnalysisInProgress.comment).toEqual("string");
    expect(geneticAnalysisInProgress.geneticAnalysisTrackingId).toEqual(geneticAnalysisOrder.geneticAnalysisdTrackingId);
    expect(geneticAnalysisInProgress.status).toEqual(GeneticAnalysisStatus.InProgress);
  });

  it('rejectGeneticAnalysis should return', async () => {
    const rejectedTitle = "REJECTED";
    const rejectedDescription = "REJECTED_DESCRIPTION";
    const processRejectGeneticAnalysisPromise: Promise<GeneticAnalysis> = new Promise((resolve, reject) => { // eslint-disable-line
      rejectGeneticAnalysis(api, pair, geneticAnalysisOrder.geneticAnalysisdTrackingId, rejectedTitle, rejectedDescription, () => {
        queryGeneticAnalysisByGeneticAnalysisTrackingId(api, geneticAnalysisOrder.geneticAnalysisdTrackingId)
          .then((res) => {
            resolve(res);
          });
      });
    });
    
    const geneticAnalysis = await processRejectGeneticAnalysisPromise;
    expect(geneticAnalysis.reportLink).toEqual(geneticDataMock.reportLink);
    expect(geneticAnalysis.comment).toEqual("string");
    expect(geneticAnalysis.geneticAnalysisTrackingId).toEqual(geneticAnalysisOrder.geneticAnalysisdTrackingId);
    expect(geneticAnalysis.status).toEqual(GeneticAnalysisStatus.Rejected);
    expect(geneticAnalysis.rejectedDescription).toEqual(rejectedDescription);
    expect(geneticAnalysis.rejectedTitle).toEqual(rejectedTitle);
  });

  it('reset genetic analyst service and genetic analyst pallet data', async () => {
    const promise: Promise<number> = new Promise((resolve, reject) => { // eslint-disable-line
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