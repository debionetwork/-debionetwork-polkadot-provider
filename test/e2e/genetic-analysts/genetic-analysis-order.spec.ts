import 'regenerator-runtime/runtime';
import { ApiPromise } from '@polkadot/api';
import { addGeneticData, cancelGeneticAnalysisOrder, createGeneticAnalysisOrder, createGeneticAnalystService, deleteGeneticAnalystService, deregisterGeneticAnalyst, GeneticAnalysisOrder, GeneticAnalysisOrderStatus, GeneticAnalysisStatus, GeneticAnalyst, GeneticAnalystService, GeneticData, processGeneticAnalysis, queryGeneticAnalysisOrderByCustomerId, queryGeneticAnalysisOrderById, queryGeneticAnalystByAccountId, queryGeneticAnalystServicesCount, queryGeneticDataByOwnerId, queryGetAllGeneticAnalystServices, queryLastGeneticAnalysisOrderByCustomerId, registerGeneticAnalyst, setGeneticAnalysisOrderFulfilled, setGeneticAnalysisOrderPaid, setGeneticAnalysisOrderRefunded, stakeGeneticAnalyst, submitGeneticAnalysis, updateGeneticAnalystAvailabilityStatus, updateGeneticAnalystVerificationStatus } from '../../../src';
import { geneticAnalysisOrdersDataMock } from '../../unit/models/genetic-analysts/genetic-analysis-orders.mock';
import { geneticAnalystServicesMock } from '../../unit/models/genetic-analysts/genetic-analyst-services.mock';
import { geneticAnalystsDataMock } from '../../unit/models/genetic-analysts/genetic-analysts.mock';
import { geneticDataMock } from '../../unit/models/genetic-analysts/genetic-data.mock';
import { initializeApi } from '../polkadot-init';
import { VerificationStatus } from '../../../src/primitives/verification-status';
import { AvailabilityStatus } from '../../../src/primitives/availability-status';

describe('Genetic Analysis Order Pallet Integration Tests', () => {
  let api: ApiPromise;
  let pair: any;

  let geneticData: GeneticData;
  let geneticAnalyst: GeneticAnalyst;
  let geneticAnalystService: GeneticAnalystService;
  let geneticAnalysisOrder: GeneticAnalysisOrder;

  beforeAll(async () => {
    const { api: _api, pair: _pair } = await initializeApi();
    api = _api;
    pair = _pair;
  });

  afterAll(() => {
    api.disconnect();
  });

  it('createGeneticAnalysisOrder should return', async () => {
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
  });

  it('cancelGeneticAnalysisOrder should return', async () => {
    const geneticAnalysisOrderPromise: Promise<GeneticAnalysisOrder> = new Promise((resolve, reject) => { // eslint-disable-line
      createGeneticAnalysisOrder(api, pair, geneticData.id, geneticAnalystService.id, 0, geneticData.reportLink, geneticAnalysisOrdersDataMock.customerBoxPublicKey, () => {
        queryGeneticAnalysisOrderByCustomerId(api, pair.address)
          .then((res) => {
            resolve(res[1]);
          });
      });
    });

    const _geneticAnalysisOrder = await geneticAnalysisOrderPromise;
    expect(_geneticAnalysisOrder.sellerId).toEqual(pair.address);
    expect(_geneticAnalysisOrder.geneticDataId).toEqual(geneticData.id);
    expect(_geneticAnalysisOrder.customerBoxPublicKey).toEqual(geneticAnalysisOrdersDataMock.customerBoxPublicKey);

    const cancelGeneticAnalysisOrderPromise: Promise<GeneticAnalysisOrder> = new Promise((resolve, reject) => { // eslint-disable-line
      cancelGeneticAnalysisOrder(api, pair, _geneticAnalysisOrder.id, () => {
        queryGeneticAnalysisOrderById(api, _geneticAnalysisOrder.id)
          .then((res) => {
            resolve(res);
          });
      });
    });

    expect((await cancelGeneticAnalysisOrderPromise).status).toEqual(GeneticAnalysisOrderStatus.Cancelled);
  });

  it('setGeneticAnalysisOrderPaid should return', async () => {
    const paidGeneticAnalysisOrderPromise: Promise<GeneticAnalysisOrder> = new Promise((resolve, reject) => { // eslint-disable-line
      setGeneticAnalysisOrderPaid(api, pair, geneticAnalysisOrder.id, () => {
        queryGeneticAnalysisOrderById(api, geneticAnalysisOrder.id)
          .then((res) => {
            resolve(res);
          });
      });
    });

    expect((await paidGeneticAnalysisOrderPromise).status).toEqual(GeneticAnalysisOrderStatus.Paid);
  });

  it('setGeneticAnalysisOrderFulfilled should return', async () => {
    await submitGeneticAnalysis(
      api, 
      pair, 
      geneticAnalysisOrder.geneticAnalysisdTrackingId, 
      geneticDataMock.reportLink,
      "string"
    );

    await processGeneticAnalysis(
      api,
      pair,
      geneticAnalysisOrder.geneticAnalysisdTrackingId, 
      GeneticAnalysisStatus.ResultReady,
    );

    const fulfilledGeneticAnalysisOrderPromise: Promise<GeneticAnalysisOrder> = new Promise((resolve, reject) => { // eslint-disable-line
      setGeneticAnalysisOrderFulfilled(api, pair, geneticAnalysisOrder.id, () => {
        queryGeneticAnalysisOrderById(api, geneticAnalysisOrder.id)
          .then((res) => {
            resolve(res);
          });
      });
    });

    expect((await fulfilledGeneticAnalysisOrderPromise).status).toEqual(GeneticAnalysisOrderStatus.Fulfilled);
  });

  it('setGeneticAnalysisOrderRefunded should return', async () => {
    const geneticAnalysisOrderPromise: Promise<GeneticAnalysisOrder> = new Promise((resolve, reject) => { // eslint-disable-line
      createGeneticAnalysisOrder(api, pair, geneticData.id, geneticAnalystService.id, 0, geneticData.reportLink, geneticAnalysisOrdersDataMock.customerBoxPublicKey, () => {
        queryGeneticAnalysisOrderByCustomerId(api, pair.address)
          .then((res) => {
            resolve(res[2]);
          });
      });
    });

    const _geneticAnalysisOrder = await geneticAnalysisOrderPromise;
    expect(_geneticAnalysisOrder.sellerId).toEqual(pair.address);
    expect(_geneticAnalysisOrder.geneticDataId).toEqual(geneticData.id);
    expect(_geneticAnalysisOrder.customerBoxPublicKey).toEqual(geneticAnalysisOrdersDataMock.customerBoxPublicKey);

    await submitGeneticAnalysis(
      api, 
      pair, 
      _geneticAnalysisOrder.geneticAnalysisdTrackingId, 
      geneticDataMock.reportLink,
      "comment"
    );

    await processGeneticAnalysis(
      api,
      pair,
      _geneticAnalysisOrder.geneticAnalysisdTrackingId, 
      GeneticAnalysisStatus.Rejected,
    );

    const refundedGeneticAnalysisOrder: Promise<GeneticAnalysisOrder> = new Promise((resolve, reject) => { // eslint-disable-line
      setGeneticAnalysisOrderRefunded(api, pair, _geneticAnalysisOrder.id, () => {
        queryGeneticAnalysisOrderById(api, _geneticAnalysisOrder.id)
          .then((res) => {
            resolve(res);
          });
      });
    });

    expect((await refundedGeneticAnalysisOrder).status).toEqual(GeneticAnalysisOrderStatus.Refunded);
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