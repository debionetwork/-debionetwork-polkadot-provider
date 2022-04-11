import { ApiPromise } from '@polkadot/api';
import 'regenerator-runtime/runtime';
import { queryLastOrderHashByCustomer, queryOrderDetailByOrderID} from '../../../src/query/labs/orders';
import { createOrder} from "../../../src/command/labs/orders";
import { processDnaSample, rejectDnaSample, submitTestResult } from "../../../src/command/labs/genetic-testing";
import { createService, deleteService } from "../../../src/command/labs/services";
import { initializeApi } from '../polkadot-init';
import { queryDnaSamples, queryLabById } from '../../../src/query/labs';
import { queryServicesByMultipleIds, queryServicesCount } from '../../../src/query/labs/services';
import { DnaTestResultSubmission, Lab } from '../../../src/models/labs';
import { deregisterLab, registerLab } from "../../../src/command/labs";
import { labDataMock } from '../../unit/models/labs/labs.mock';
import { Service } from '../../../src/models/labs/services';
import { Order } from '../../../src/models/labs/orders';
import { serviceDataMock } from '../../unit/models/labs/services.mock';
import { DnaSampleStatus } from '../../../src/models/labs/genetic-testing/dna-sample-status';
import { DnaSample } from '../../../src/models/labs/genetic-testing/dna-sample';

describe('Genetic Testing Pallet Integration Tests', () => {
  let api: ApiPromise;
  let pair: any;
  let lab: Lab;
  let service: Service;
  let order: Order;

  const submission = new DnaTestResultSubmission({
    comments: 'string',
    resultLink: 'string',
    reportLink: 'string',
  });

  beforeAll(async () => {
    const { api: _api, pair: _pair } = await initializeApi();
    api = _api;
    pair = _pair;
  });

  afterAll(() => {
    api.disconnect();
  });

  it('should submit test result return', async () => {
    const labPromise: Promise<Lab> = new Promise((resolve, reject) => { // eslint-disable-line
      registerLab(api, pair, labDataMock.info, () => {
        queryLabById(api, pair.address)
          .then((res) => {
            resolve(res)
          });
      });
    });

    lab = await labPromise;
    expect(lab.info).toEqual(labDataMock.info);

    const servicePromise: Promise<Service> = new Promise((resolve, reject) => { // eslint-disable-line
      createService(api, pair, serviceDataMock.info, serviceDataMock.serviceFlow, () => {
        queryLabById(api, pair.address)
          .then((lab) => {
            queryServicesByMultipleIds(api, lab.services)
              .then((res) => {
                resolve(res[0])
              });
          });
      });
    });

    service = await servicePromise;

    const promise: Promise<Order> = new Promise((resolve, reject) => { // eslint-disable-line
        createOrder(api, pair, service.id, 0, lab.info.boxPublicKey, serviceDataMock.serviceFlow, () => {
          queryLastOrderHashByCustomer(api, pair.address)
            .then((orderId) => {
              queryOrderDetailByOrderID(api, orderId)
                .then((res) => {
                  resolve(res)
                });
            });
        });
    });

    order = await promise;
    expect(order.customerId).toEqual(pair.address);
    expect(order.sellerId).toEqual(pair.address);
    expect(order.serviceId).toEqual(service.id);
    expect(order.customerBoxPublicKey).toEqual(lab.info.boxPublicKey);
    expect(order.orderFlow).toEqual(serviceDataMock.serviceFlow);

    const submitTestResultPromise: Promise<DnaSample> = new Promise((resolve, reject) => { // eslint-disable-line
      submitTestResult(api, pair, order.dnaSampleTrackingId, submission, () => {
        queryDnaSamples(api, order.dnaSampleTrackingId)
          .then((res) => {
            resolve(res);
          });
      });
    });

    const dnaSample = await submitTestResultPromise;
    expect(dnaSample.labId).toEqual(order.sellerId);
    expect(dnaSample.ownerId).toEqual(order.customerId);
    expect(dnaSample.trackingId).toEqual(order.dnaSampleTrackingId);
  });

  it('should process dna sample return', async () => {
    const processDnaSamplePromise: Promise<DnaSample> = new Promise((resolve, reject) => { // eslint-disable-line
      processDnaSample(api, pair, order.dnaSampleTrackingId, DnaSampleStatus.Arrived, () => {
        queryDnaSamples(api, order.dnaSampleTrackingId)
        .then((res) => {
          resolve(res);
        });
      });
    });
    
    const dnaSample = await processDnaSamplePromise;
    expect(dnaSample.labId).toEqual(order.sellerId);
    expect(dnaSample.ownerId).toEqual(order.customerId);
    expect(dnaSample.trackingId).toEqual(order.dnaSampleTrackingId);
    expect(dnaSample.status).toEqual(DnaSampleStatus.Arrived);
  });

  it('should reject dna sample return', async () => {
    const rejectedTitle = "REJECTED";
    const rejectedDescription = "REJECTED_DESCRIPTION";

    const rejectDnaSamplePromise: Promise<DnaSample> = new Promise((resolve, reject) => { // eslint-disable-line
      rejectDnaSample(api, pair, order.dnaSampleTrackingId, rejectedTitle, rejectedDescription, () => {
        queryDnaSamples(api, order.dnaSampleTrackingId)
        .then((res) => {
          resolve(res);
        });
      });
    });
    
    const dnaSample = await rejectDnaSamplePromise;
    expect(dnaSample.labId).toEqual(order.sellerId);
    expect(dnaSample.ownerId).toEqual(order.customerId);
    expect(dnaSample.trackingId).toEqual(order.dnaSampleTrackingId);
    expect(dnaSample.status).toEqual(DnaSampleStatus.Rejected);
    expect(dnaSample.rejectedTitle).toEqual(rejectedTitle);
    expect(dnaSample.rejectedDescription).toEqual(rejectedDescription);
  });

  it('reset service and lab pallet data', async () => {
    const promise: Promise<number> = new Promise((resolve, reject) => { // eslint-disable-line
      deleteService(api, pair, service.id, () => {
        queryServicesCount(api)
          .then((res) => {
            deregisterLab(api, pair, () => {
              resolve(res);
            });
          });
      });
    });

    expect(await promise).toEqual(0);
  });
});