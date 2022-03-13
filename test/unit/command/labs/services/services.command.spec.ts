import { ServiceFlow, successCallback } from "../../../../../src";
import { createService, updateService, deleteService } from "../../../../../src/command/labs/services";
import { ApiPromise, eventAndStatusMock, signAndSendWithPaymentInfo } from "../../../@polkadot-api.mock";
import { mockFunction } from "../../../mock";
import { serviceDataMock } from "../../../models/labs/services.mock";
import { services } from "./services.command.mock";

jest.mock('../../../mock', () => ({
  mockFunction: jest.fn(),
}));

jest.mock('../../../../../src/index', () => ({
  successCallback: jest.fn(() => mockFunction()),
}));

describe('Services Command Unit Tests', () => {
  const API_PROMISE_MOCK: ApiPromise = new ApiPromise();
  API_PROMISE_MOCK.tx = { services: services };

  const signAndSendSpy = jest.spyOn(signAndSendWithPaymentInfo, 'signAndSend');
  const paymentInfoSpy = jest.spyOn(signAndSendWithPaymentInfo, 'paymentInfo');
  const createServiceSpy = jest.spyOn(services, 'createService');
  const updateServiceSpy = jest.spyOn(services, 'updateService');
  const deleteServiceSpy = jest.spyOn(services, 'deleteService');

  beforeEach(() => {
    (mockFunction as jest.Mock).mockClear();
    (successCallback as jest.Mock).mockClear();
    signAndSendSpy.mockClear();
    paymentInfoSpy.mockClear();
    createServiceSpy.mockClear();
    updateServiceSpy.mockClear();
    deleteServiceSpy.mockClear();
  });

  it('create services should return', async () => {
    // Arrange
    const PAIR = "PAIR";
    const SERVICE_INFO = serviceDataMock.info;
    const SERVICE_FLOW = 'SERVICE_FLOW';

    // Act
    await createService(
      API_PROMISE_MOCK as any, 
      PAIR,
      SERVICE_INFO,
      SERVICE_FLOW,
      mockFunction
    );
      
    // Assert
    expect(createServiceSpy).toBeCalledTimes(1);
    expect(createServiceSpy).toBeCalledWith(SERVICE_INFO, SERVICE_FLOW);
    expect(signAndSendSpy).toBeCalledTimes(1);
    expect(signAndSendSpy).toBeCalledWith(PAIR, { nonce: -1 }, expect.any(Function));
    expect(successCallback).toBeCalledTimes(1);
    expect(successCallback).toBeCalledWith(API_PROMISE_MOCK, {
        events: eventAndStatusMock.events,
        status: eventAndStatusMock.status,
        callback: mockFunction
    });
    expect(mockFunction).toBeCalledTimes(2);
  });

  it('update services should return', async () => {
    // Arrange
    const PAIR = "PAIR";
    const SERVICE_ID = "SERVICE_ID";
    const SERVICE_INFO = serviceDataMock.info;

    // Act
    await updateService(
      API_PROMISE_MOCK as any, 
      PAIR,
      SERVICE_ID,
      SERVICE_INFO,
      mockFunction
    );
      
    // Assert
    expect(updateServiceSpy).toBeCalledTimes(1);
    expect(updateServiceSpy).toBeCalledWith(SERVICE_ID, SERVICE_INFO);
    expect(signAndSendSpy).toBeCalledTimes(1);
    expect(signAndSendSpy).toBeCalledWith(PAIR, { nonce: -1 }, expect.any(Function));
    expect(successCallback).toBeCalledTimes(1);
    expect(successCallback).toBeCalledWith(API_PROMISE_MOCK, {
        events: eventAndStatusMock.events,
        status: eventAndStatusMock.status,
        callback: mockFunction
    });
    expect(mockFunction).toBeCalledTimes(2);
  });

  it('delete services should return', async () => {
    // Arrange
    const PAIR = "PAIR";
    const SERVICE_ID = "SERVICE_ID";

    // Act
    await deleteService(
      API_PROMISE_MOCK as any, 
      PAIR,
      SERVICE_ID,
      mockFunction
    );
      
    // Assert
    expect(deleteServiceSpy).toBeCalledTimes(1);
    expect(deleteServiceSpy).toBeCalledWith(SERVICE_ID);
    expect(signAndSendSpy).toBeCalledTimes(1);
    expect(signAndSendSpy).toBeCalledWith(PAIR, { nonce: -1 }, expect.any(Function));
    expect(successCallback).toBeCalledTimes(1);
    expect(successCallback).toBeCalledWith(API_PROMISE_MOCK, {
        events: eventAndStatusMock.events,
        status: eventAndStatusMock.status,
        callback: mockFunction
    });
    expect(mockFunction).toBeCalledTimes(2);
  });
});