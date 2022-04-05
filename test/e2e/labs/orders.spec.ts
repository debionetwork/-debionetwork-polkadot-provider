import { ApiPromise } from '@polkadot/api';
import 'regenerator-runtime/runtime';
import { queryLastOrderHashByCustomer, queryOrderDetailByOrderID, queryOrdersByCustomer, queryOrdersBySeller } from '../../../src/query/labs/orders';
import { createOrder, cancelOrder, fulfillOrder, createOrderFee, setOrderPaid, setOrderRefunded } from "../../../src/command/labs/orders";
import { processDnaSample, submitTestResult } from "../../../src/command/labs/genetic-testing";
import { createService } from "../../../src/command/labs/services";
import { initializeApi } from '../polkadot-init';
import { queryLabById } from '../../../src/query/labs';
import { queryServicesByMultipleIds } from '../../../src/query/labs/services';
import { Lab } from '../../../src/models/labs';
import { registerLab } from "../../../src/command/labs";
import { labDataMock } from '../../unit/models/labs/labs.mock';
import { Service } from '../../../src/models/labs/services';
import { Order, OrderStatus } from '../../../src/models/labs/orders';
import { serviceDataMock } from '../../unit/models/labs/services.mock';
import { DnaSampleStatus } from '../../../src/models/labs/genetic-testing/dna-sample-status';

describe('Orders Pallet Integration Tests', () => {
  let api: ApiPromise;
  let pair: any;
  let lab: Lab;
  let service: Service;
  let order: Order;

  beforeAll(async () => {
    const { api: _api, pair: _pair } = await initializeApi();
    api = _api;
    pair = _pair;
  });

  afterAll(() => {
    api.disconnect();
  });

  it('createOrder should return', async () => {
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
  }, 120000); // Set timeout for 90 seconds

  it('createOrderFee should return', async () => {
    await createOrderFee(api, pair, service.id, 0, lab.info.boxPublicKey, serviceDataMock.serviceFlow);
  }, 25000); // Set timeout for 25 seconds

  it('queryOrdersByCustomer should return', async () => {
    const orders = await queryOrdersByCustomer(api, pair.address);
    expect(orders.length).toEqual(1);

    expect(orders[0]).toEqual(order);
  }, 25000); // Set timeout for 25 seconds

  it('queryOrdersBySeller should return', async () => {
    const orders = await queryOrdersBySeller(api, pair.address);
    expect(orders.length).toEqual(1);

    expect(orders[0]).toEqual(order);
  }, 25000); // Set timeout for 25 seconds

  it('cancelOrder should return', async () => {
    const orderPromise: Promise<Order> = new Promise((resolve, reject) => { // eslint-disable-line
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

    const _order = await orderPromise;
    expect(_order.customerId).toEqual(pair.address);
    expect(_order.sellerId).toEqual(pair.address);
    expect(_order.serviceId).toEqual(service.id);
    expect(_order.customerBoxPublicKey).toEqual(lab.info.boxPublicKey);
    expect(_order.orderFlow).toEqual(serviceDataMock.serviceFlow);

    const promise: Promise<Order> = new Promise((resolve, reject) => { // eslint-disable-line
        cancelOrder(api, pair, _order.id, () => {
          queryLastOrderHashByCustomer(api, pair.address)
            .then((orderId) => {
              queryOrderDetailByOrderID(api, orderId)
                .then((res) => {
                  resolve(res)
                });
            });
        });
    });

    expect((await promise).status).toEqual(OrderStatus.Cancelled);
  }, 60000); // Set timeout for 60 seconds

  it('setOrderPaid should return', async () => {
    const promise: Promise<Order> = new Promise((resolve, reject) => { // eslint-disable-line
        setOrderPaid(api, pair, order.id, () => {
            queryOrderDetailByOrderID(api, order.id)
              .then((res) => {
                resolve(res)
              });
        });
    });

    expect((await promise).status).toEqual(OrderStatus.Paid);
  }, 25000); // Set timeout for 25 seconds

  it('fulfillOrder should return', async () => {
    await submitTestResult(
        api,
        pair,
        order.dnaSampleTrackingId,
        {
            comments:"comment",
            resultLink:"resultLink",
            reportLink:"reportLink",
        }
    );

    await processDnaSample(
        api,
        pair,
        order.dnaSampleTrackingId,
        DnaSampleStatus.ResultReady
    );

    const promise: Promise<Order> = new Promise((resolve, reject) => { // eslint-disable-line
        fulfillOrder(api, pair, order.id, () => {
            queryOrderDetailByOrderID(api, order.id)
              .then((res) => {
                resolve(res)
              });
        });
    });

    expect((await promise).status).toEqual(OrderStatus.Fulfilled);
  }, 25000); // Set timeout for 25 seconds

  it('setOrderRefunded should return', async () => {
    const orderPromise: Promise<Order> = new Promise((resolve, reject) => { // eslint-disable-line
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

    const _order = await orderPromise;
    expect(_order.customerId).toEqual(pair.address);
    expect(_order.sellerId).toEqual(pair.address);
    expect(_order.serviceId).toEqual(service.id);
    expect(_order.customerBoxPublicKey).toEqual(lab.info.boxPublicKey);
    expect(_order.orderFlow).toEqual(serviceDataMock.serviceFlow);

    await submitTestResult(
        api,
        pair,
        order.dnaSampleTrackingId,
        {
            comments:"comment",
            resultLink:"resultLink",
            reportLink:"reportLink",
        }
    );

    await processDnaSample(
        api,
        pair,
        _order.dnaSampleTrackingId,
        DnaSampleStatus.Rejected
    );

    const promise: Promise<Order> = new Promise((resolve, reject) => { // eslint-disable-line
        setOrderRefunded(api, pair, _order.id, () => {
            queryOrderDetailByOrderID(api, _order.id)
              .then((res) => {
                resolve(res)
              });
        });
    });

    expect((await promise).status).toEqual(OrderStatus.Refunded);
  }, 90000); // Set timeout for 90 seconds
});
