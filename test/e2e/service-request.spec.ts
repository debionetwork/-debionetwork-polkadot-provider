import 'regenerator-runtime/runtime';
import { ApiPromise } from "@polkadot/api";
import { createRequest, createRequestFee, createService, Lab, queryGetAllServiceRequest, queryLabById, queryServiceRequestByAccountId, queryServiceRequestById, queryServicesByMultipleIds, registerLab, RequestStatus, Service, ServiceRequest } from "../../src";
import { labDataMock } from "../unit/models/labs/labs.mock";
import { serviceDataMock } from "../unit/models/labs/services.mock";
import { serviceRequestDataMock } from "../unit/models/service-request/service-request.mock";
import { initializeApi } from "./polkadot-init";

describe('Service Request Pallet Integration Tests', () => {
  let api : ApiPromise;
  let pair : any;

  let lab: Lab;
  let service: Service;
  let serviceRequest: ServiceRequest;

  beforeAll(async () => {
    const { api: _api, pair: _pair } = await initializeApi();
    api = _api;
    pair = _pair;
  });

  afterAll(() => {
    api.disconnect();
  });

  it('createRequestService should return', async () => {
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
  }, 75000); // Set timeout for 75 seconds

  it('createRequestFee should return', async () => {
    const requestFee = await createRequestFee(api, pair, serviceRequest.country, serviceRequest.region, serviceRequest.city, serviceRequest.serviceCategory, serviceRequest.stakingAmount);
    expect(requestFee).toHaveProperty('weight')
  }, 2000); // Set timeout for 25 seconds

  it('queryServiceRequestByAccountId should return', async () => {
    const serviceRequests = await queryServiceRequestByAccountId(api, pair.address);
    
    expect(serviceRequests.length).toEqual(1);
    expect(serviceRequests[0]).toEqual(serviceRequest);
  }, 25000); // Set timeout for 25 seconds
});