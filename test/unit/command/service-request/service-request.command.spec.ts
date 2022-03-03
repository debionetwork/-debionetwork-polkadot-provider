import { retrieveUnstakedAmount } from "../../../../src/command/service-request";
import { successCallback } from "../../../../src";
import { ApiPromise, eventAndStatusMock, signAndSend } from "../../@polkadot-api.mock";
import { mockFunction } from "../../mock";
import { serviceRequest } from "./service-request.command.mock";

jest.mock('../../mock', () => ({
  mockFunction: jest.fn(),
}));

jest.mock('../../../../src', () => ({
  successCallback: jest.fn(() => mockFunction()),
}));

describe('Service Request Unit Testing', () => {
  const API_PROMISE_MOCK: ApiPromise = new ApiPromise();
  API_PROMISE_MOCK.tx = {
    serviceRequest: serviceRequest
  };

  const signAndSendSpy = jest.spyOn(signAndSend, 'signAndSend');
  const retrieveUnstakedAmountSpy = jest.spyOn(serviceRequest, 'retrieveUnstakedAmount');

  beforeEach(() => {
    (mockFunction as jest.Mock).mockClear();
    (successCallback as jest.Mock).mockClear();
    signAndSendSpy.mockClear();
    retrieveUnstakedAmountSpy.mockClear();
  });
  
  it('adminSetEthAddress should return', async () => {
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
})