import { retrieveUnstakedAmount, getCreateRequestFee, unstakeRequestFee } from "../../../../src/command/service-request";
import { successCallback } from "../../../../src";
import { ApiPromise, eventAndStatusMock, signAndSendWithPaymentInfo } from "../../@polkadot-api.mock";
import { mockFunction } from "../../mock";
import { serviceRequest } from "./service-request.command.mock";

jest.mock('../../mock', () => ({
  mockFunction: jest.fn(),
}));

jest.mock('../../../../src', () => ({
  successCallback: jest.fn(() => mockFunction()),
}));

describe('Service Request Commands Unit Testing', () => {
  const API_PROMISE_MOCK: ApiPromise = new ApiPromise();
  API_PROMISE_MOCK.tx = {
    serviceRequest: serviceRequest
  };

  const signAndSendSpy = jest.spyOn(signAndSendWithPaymentInfo, 'signAndSend');
  const paymentInfoSpy = jest.spyOn(signAndSendWithPaymentInfo, 'paymentInfo');
  const createRequestSpy = jest.spyOn(serviceRequest, 'createRequest');
  const unstakeSpy = jest.spyOn(serviceRequest, 'unstake');
  const retrieveUnstakedAmountSpy = jest.spyOn(serviceRequest, 'retrieveUnstakedAmount');

  beforeEach(() => {
    (mockFunction as jest.Mock).mockClear();
    (successCallback as jest.Mock).mockClear();
    signAndSendSpy.mockClear();
    paymentInfoSpy.mockClear();
    createRequestSpy.mockClear();
    unstakeSpy.mockClear();
    retrieveUnstakedAmountSpy.mockClear();
  });
  
  it('retrieveUnstakedAmount should return', async () => {
      // Arrange
      const PAIR = "PAIR";
      const REQUEST_ID = "REQUEST_ID";

      // Act
      await retrieveUnstakedAmount(
        API_PROMISE_MOCK as any, 
        PAIR,
        REQUEST_ID,
        mockFunction
      );

      expect(retrieveUnstakedAmountSpy).toBeCalledTimes(1);
      expect(retrieveUnstakedAmountSpy).toBeCalledWith(REQUEST_ID);
      expect(signAndSendSpy).toBeCalledTimes(1);
      expect(signAndSendSpy).toBeCalledWith(PAIR, { nonce: -1 }, expect.any(Function));
      expect(successCallback).toBeCalledTimes(1);
      expect(successCallback).toBeCalledWith(API_PROMISE_MOCK, { 
        events: eventAndStatusMock.events, 
        status: eventAndStatusMock.status, 
        callback: mockFunction,
      });
      expect(mockFunction).toBeCalledTimes(2);
  });

  it('getCreateRequestFee should return', () => {
    // Arrange
    const PAIR = "PAIR";
    const COUNTRY_ID = "COUNTRY_ID";
    const REGION_ID = "REGION_ID";
    const CITY_ID = "CITY_ID";
    const CATEGORY_ID = "CATEGORY_ID";
    const EXPECTED_VALUE = 0;
    (mockFunction as jest.Mock).mockReturnValue(EXPECTED_VALUE);
      
    // Assert
    expect(
      getCreateRequestFee(
        API_PROMISE_MOCK as any, 
        PAIR,
        COUNTRY_ID,
        REGION_ID,
        CITY_ID,
        CATEGORY_ID,
      )).toEqual(EXPECTED_VALUE);
    expect(createRequestSpy).toBeCalledTimes(1);
    expect(createRequestSpy).toBeCalledWith(COUNTRY_ID, REGION_ID, CITY_ID, CATEGORY_ID, 1);
    expect(paymentInfoSpy).toBeCalledTimes(1);
    expect(paymentInfoSpy).toBeCalledWith(PAIR);
    expect(mockFunction).toBeCalledTimes(1);
  });

  it('unstakeRequestFee should return', () => {
    // Arrange
    const PAIR = "PAIR";
    const REQUEST_ID = "REQUEST_ID";
    const EXPECTED_VALUE = 0;
    (mockFunction as jest.Mock).mockReturnValue(EXPECTED_VALUE);
      
    // Assert
    expect(
      unstakeRequestFee(
        API_PROMISE_MOCK as any, 
        PAIR,
        REQUEST_ID,
      )).toEqual(EXPECTED_VALUE);
    expect(unstakeSpy).toBeCalledTimes(1);
    expect(unstakeSpy).toBeCalledWith(REQUEST_ID);
    expect(paymentInfoSpy).toBeCalledTimes(1);
    expect(paymentInfoSpy).toBeCalledWith(PAIR);
    expect(mockFunction).toBeCalledTimes(1);
  });
})