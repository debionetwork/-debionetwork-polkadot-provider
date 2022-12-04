import { 
  queryServiceRequestById, queryServiceRequestByOrderId,
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

  const serviceRequestByIdSpy = jest.spyOn(serviceRequest, 'requestById');
  const serviceRequestByOrderIdSpy = jest.spyOn(serviceRequest, 'requestByOrderId');
  
  beforeEach(() => {
    (mockFunction as jest.Mock).mockClear();
    serviceRequestByIdSpy.mockClear();
    serviceRequestByOrderIdSpy.mockClear();
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

  it('queryServiceRequestByOrderId should return', async () => {
    // Arrange
    const ORDER_ID = "ORDER_ID";
    const EXPECTED_VALUE = "SERVICE_REQUEST_HASH";

    when(mockFunction)
      .calledWith(ORDER_ID)
      .mockReturnValue(EXPECTED_VALUE);

    // Assert
    expect(await queryServiceRequestByOrderId(API_PROMISE_MOCK as any, ORDER_ID))
      .toEqual(EXPECTED_VALUE);
    expect(mockFunction).toBeCalledTimes(1);
    expect(mockFunction).toBeCalledWith(ORDER_ID);
    expect(mockFunction).toBeCalledWith(ORDER_ID);
    expect(serviceRequestByOrderIdSpy).toBeCalledTimes(1);
    expect(serviceRequestByOrderIdSpy).toBeCalledWith(ORDER_ID);
  });
});
