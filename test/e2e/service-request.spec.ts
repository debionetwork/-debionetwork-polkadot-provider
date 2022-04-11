import 'regenerator-runtime/runtime';
import { ApiPromise } from "@polkadot/api";
import { claimRequest, createOrder, createRequest, createRequestFee, createService, deregisterLab, finalizeRequest, Lab, Order, processRequest, queryGetAllServiceRequest, queryLabById, queryLabCount, queryLastOrderHashByCustomer, queryOrderDetailByOrderID, queryServiceInvoiceById, queryServiceInvoiceByOrderId, queryServiceRequestByAccountId, queryServiceRequestById, queryServicesByMultipleIds, registerLab, RequestStatus, Service, ServiceInvoice, ServiceRequest, unstakeRequest, unstakeRequestFee, updateLabVerificationStatus } from "../../src";
import { labDataMock } from "../unit/models/labs/labs.mock";
import { serviceDataMock } from "../unit/models/labs/services.mock";
import { serviceRequestDataMock } from "../unit/models/service-request/service-request.mock";
import { initializeApi } from "./polkadot-init";
import { VerificationStatus } from '../../src/primitives/verification-status';

describe('Service Request Pallet Integration Tests', () => {
  let api : ApiPromise;
  let pair : any;

  let lab: Lab;
  let order: Order;
  let service: Service;
  let serviceInvoice: ServiceInvoice;
  let serviceRequest: ServiceRequest;

  beforeAll(async () => {
    const { api: _api, pair: _pair } = await initializeApi();
    api = _api;
    pair = _pair;
  });

  afterAll(() => {
    api.disconnect();
  });

  it('createRequestFee should return', async () => {
    const requestFee = await createRequestFee(api, pair, serviceRequestDataMock.country, serviceRequestDataMock.region, serviceRequestDataMock.city, serviceRequestDataMock.serviceCategory, serviceRequestDataMock.stakingAmount);
    expect(requestFee).toHaveProperty('weight')
  });

  it('createRequest should return', async () => {
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
    
    const category = 'Whole Genome Sequencing';
    serviceRequestDataMock.serviceCategory = category;
    const stakingAmount = 10;

    const promise: Promise<ServiceRequest> = new Promise((resolve, reject) => { // eslint-disable-line
      createRequest(api, pair, labDataMock.info.country, labDataMock.info.region, labDataMock.info.city , category, stakingAmount, () => {
        queryGetAllServiceRequest(api)
          .then((res) => {
            resolve(res[0])
          });
      });
    });

    serviceRequest = await promise;

    expect(serviceRequest.requesterAddress).toEqual(pair.address);
    expect(serviceRequest.country).toEqual(labDataMock.info.country);
    expect(serviceRequest.region).toEqual(labDataMock.info.region);
    expect(serviceRequest.city).toEqual(labDataMock.info.city);
    expect(serviceRequest.serviceCategory).toEqual(category);
    expect(serviceRequest.stakingAmount).toEqual(stakingAmount.toString());
    expect(serviceRequest.status).toEqual(RequestStatus.Open);
  });

  it('queryServiceRequestByAccountId should return', async () => {
    const serviceRequests = await queryServiceRequestByAccountId(api, pair.address);
    
    expect(serviceRequests.length).toEqual(1);
    expect(serviceRequests[0]).toEqual(serviceRequest);
  });

  it('unstakeRequestFee should return', async () => {
    const requestFee = await unstakeRequestFee(api, pair, serviceRequestDataMock.hash);
    expect(requestFee).toHaveProperty('weight')
  });

  it('unstakeRequest should return', async () => {
    const promise: Promise<ServiceRequest> = new Promise((resolve, reject) => { // eslint-disable-line
      unstakeRequest(api, pair, serviceRequest.hash, () => {
        queryGetAllServiceRequest(api)
          .then((res) => {
            resolve(res[0])
          });
      });
    });

    const _serviceRequest = await promise;
    const category = 'Whole Genome Sequencing';
    const stakingAmount = 10;

    expect(_serviceRequest.requesterAddress).toEqual(pair.address);
    expect(_serviceRequest.country).toEqual(labDataMock.info.country);
    expect(_serviceRequest.region).toEqual(labDataMock.info.region);
    expect(_serviceRequest.city).toEqual(labDataMock.info.city);
    expect(_serviceRequest.serviceCategory).toEqual(category);
    expect(_serviceRequest.stakingAmount).toEqual(stakingAmount.toString());
    expect(_serviceRequest.status).toEqual(RequestStatus.WaitingForUnstaked);
  });

  it('claimRequest should return', async () => {
    const status = VerificationStatus.Verified;
    const labPromise: Promise<Lab> = new Promise((resolve, reject) => { // eslint-disable-line
      updateLabVerificationStatus(api, pair, pair.address, status, () => {
        queryLabById(api, pair.address)
          .then((res) => {
            resolve(res)
          });
      });
    });

    await labPromise;
    
    const category = 'Whole Genome Sequencing';
    const stakingAmount = 10;

    const serviceRequestPromise: Promise<ServiceRequest> = new Promise((resolve, reject) => { // eslint-disable-line
      createRequest(api, pair, labDataMock.info.country, labDataMock.info.region, labDataMock.info.city , category, stakingAmount, () => {
        queryGetAllServiceRequest(api)
          .then((res) => {
            resolve(res[1])
          });
      });
    });

    serviceRequest = await serviceRequestPromise;

    const promise: Promise<ServiceRequest> = new Promise((resolve, reject) => { // eslint-disable-line
      claimRequest(api, pair, serviceRequest.hash, service.id, service.price, service.qcPrice, () => {
        queryServiceRequestById(api, serviceRequest.hash)
          .then((res) => {
            resolve(res)
          });
      });
    });

    serviceRequest = await promise;

    expect(serviceRequest.requesterAddress).toEqual(pair.address);
    expect(serviceRequest.country).toEqual(labDataMock.info.country);
    expect(serviceRequest.region).toEqual(labDataMock.info.region);
    expect(serviceRequest.city).toEqual(labDataMock.info.city);
    expect(serviceRequest.serviceCategory).toEqual(category);
    expect(serviceRequest.stakingAmount).toEqual(stakingAmount.toString());
    expect(serviceRequest.status).toEqual(RequestStatus.Claimed);
  });

  it('processRequest should return', async () => {
    const category = 'Whole Genome Sequencing';
    const stakingAmount = 10;

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

    order = await orderPromise;

    const promise: Promise<ServiceInvoice> = new Promise((resolve, reject) => { // eslint-disable-line
      processRequest(api, pair, lab.accountId, serviceRequest.hash, order.id, order.dnaSampleTrackingId, stakingAmount.toString(), () => {
        queryServiceInvoiceById(api, serviceRequest.hash)
          .then((res) => {
            resolve(res)
          });
      });
    });

    serviceInvoice = await promise;

    expect(serviceInvoice.customerAddress).toEqual(pair.address);
    expect(serviceInvoice.sellerAddress).toEqual(pair.address);
    expect(serviceInvoice.requestHash).toEqual(serviceRequest.hash);
    expect(serviceInvoice.serviceId).toEqual(service.id);
    expect(serviceInvoice.orderId).toEqual(order.id);
    expect(serviceInvoice.dnaSampleTrackingId).toEqual(order.dnaSampleTrackingId);
    
    const _serviceRequest = await queryServiceRequestById(api, serviceRequest.hash);

    expect(_serviceRequest.requesterAddress).toEqual(pair.address);
    expect(_serviceRequest.country).toEqual(labDataMock.info.country);
    expect(_serviceRequest.region).toEqual(labDataMock.info.region);
    expect(_serviceRequest.city).toEqual(labDataMock.info.city);
    expect(_serviceRequest.serviceCategory).toEqual(category);
    expect(_serviceRequest.stakingAmount).toEqual(stakingAmount.toString());
    expect(_serviceRequest.status).toEqual(RequestStatus.Processed);
  });

  it('queryServiceInvoiceByOrderId should return', async () => {
    const _serviceInvoice = await queryServiceInvoiceByOrderId(api, serviceInvoice.orderId);

    expect(_serviceInvoice.customerAddress).toEqual(serviceInvoice.customerAddress);
    expect(_serviceInvoice.sellerAddress).toEqual(serviceInvoice.sellerAddress);
    expect(_serviceInvoice.requestHash).toEqual(serviceInvoice.requestHash);
    expect(_serviceInvoice.serviceId).toEqual(serviceInvoice.serviceId);
    expect(_serviceInvoice.orderId).toEqual(serviceInvoice.orderId);
    expect(_serviceInvoice.dnaSampleTrackingId).toEqual(serviceInvoice.dnaSampleTrackingId);
  });

  it('finalizeRequest should return', async () => {
    const category = 'Whole Genome Sequencing';
    const stakingAmount = 10;

    const promise: Promise<ServiceRequest> = new Promise((resolve, reject) => { // eslint-disable-line
      finalizeRequest(api, pair, serviceInvoice.requestHash, true, () => {
        queryServiceRequestById(api, serviceRequest.hash)
          .then((res) => {
            resolve(res)
          });
      });
    });

    serviceRequest = await promise;

    expect(serviceRequest.requesterAddress).toEqual(pair.address);
    expect(serviceRequest.country).toEqual(labDataMock.info.country);
    expect(serviceRequest.region).toEqual(labDataMock.info.region);
    expect(serviceRequest.city).toEqual(labDataMock.info.city);
    expect(serviceRequest.serviceCategory).toEqual(category);
    expect(serviceRequest.stakingAmount).toEqual(stakingAmount.toString());
    expect(serviceRequest.status).toEqual(RequestStatus.Finalized);

    const labPromise: Promise<number> = new Promise((resolve, reject) => { // eslint-disable-line
      deregisterLab(api, pair, () => {
        queryLabCount(api)
          .then((res) => {
            resolve(res);
          });
      });
    });
    
    expect(await labPromise).toEqual(0);
  });
});