import { 
  queryServiceRequestById,
} from "../../../../src/query/service-request";
import { serviceRequest } from "./service-request.query.mock";
import { ApiPromise } from "../../@polkadot-api.mock";
import { mockFunction } from "../../mock";
import { ServiceRequest } from "../../../../src/models/service-request";
import { when } from 'jest-when';
import { serviceRequestDataMock } from "../../models/service-request/service-request.mock";

jest.mock('../../mock', () => ({
  mockFunction: jest.fn(),
}));

describe('Service Request Queries Unit Tests', () => {
  const API_PROMISE_MOCK: ApiPromise = new ApiPromise();
  API_PROMISE_MOCK.query = { serviceRequest };

  const serviceInvoiceByIdSpy = jest.spyOn(serviceRequest, 'serviceInvoiceById');
  const serviceInvoiceByOrderIdSpy = jest.spyOn(serviceRequest, 'serviceInvoiceByOrderId');
  const serviceRequestByIdSpy = jest.spyOn(serviceRequest, 'requestById');

  
  beforeEach(() => {
    (mockFunction as jest.Mock).mockClear();
    serviceRequestByIdSpy.mockClear();
    serviceInvoiceByIdSpy.mockClear();
    serviceInvoiceByOrderIdSpy.mockClear();
  });

  it('queryServiceRequestById should return', async () => {
    // Arrange
    const REQUEST_ID = "REQUEST_ID";
    const EXPECTED_VALUE = new ServiceRequest(serviceRequestDataMock);

    when(mockFunction)
      .calledWith(REQUEST_ID)
      .mockReturnValue(serviceRequestDataMock);

    // Assert
    expect(await queryServiceRequestById(API_PROMISE_MOCK as any, REQUEST_ID))
      .toEqual(EXPECTED_VALUE);
    expect(mockFunction).toBeCalledTimes(1);
    expect(mockFunction).toBeCalledWith(REQUEST_ID);
    expect(mockFunction).toBeCalledWith(REQUEST_ID);
    expect(serviceRequestByIdSpy).toBeCalledTimes(1);
    expect(serviceRequestByIdSpy).toBeCalledWith(REQUEST_ID);
  });
});
