import { setEthAddress } from "../../../../src/command/user-profile";
import { successCallback } from "../../../../src";
import { ApiPromise, eventAndStatusMock, signAndSend } from "../../@polkadot-api.mock";
import { mockFunction } from "../../mock";
import { userProfile } from "./user-profile.command.mock";

jest.mock('../../mock', () => ({
  mockFunction: jest.fn(),
}));

jest.mock('../../../../src', () => ({
  successCallback: jest.fn(() => mockFunction()),
}));

describe('User Profile Unit Testing', () => {
  const API_PROMISE_MOCK: ApiPromise = new ApiPromise();
  API_PROMISE_MOCK.tx = {
      userProfile: userProfile
  };

  const signAndSendSpy = jest.spyOn(signAndSend, 'signAndSend');
  const adminSetEthAddressSpy = jest.spyOn(userProfile, 'adminSetEthAddress');

  beforeEach(() => {
    (mockFunction as jest.Mock).mockClear();
    (successCallback as jest.Mock).mockClear();
    signAndSendSpy.mockClear();
    adminSetEthAddressSpy.mockClear();
  });
  
  it('adminSetEthAddress should return', async () => {
      // Arrange
      const PAIR = "PAIR";
      const SUBSTRATE_ADDRESS = "SUBSTRATE_ADDRESS";
      const ETH_ADDRESS = "ETH_ADDRESS";

      // Act
      await setEthAddress(
        API_PROMISE_MOCK as any, 
        PAIR,
        SUBSTRATE_ADDRESS,
        ETH_ADDRESS,
        mockFunction
      );

      expect(adminSetEthAddressSpy).toBeCalledTimes(1);
      expect(adminSetEthAddressSpy).toBeCalledWith(SUBSTRATE_ADDRESS, ETH_ADDRESS);
      expect(signAndSendSpy).toBeCalledTimes(1);
      expect(signAndSendSpy).toBeCalledWith(PAIR, { nonce: -1 }, expect.any(Function));
      expect(successCallback).toBeCalledTimes(1);
      expect(successCallback).toBeCalledWith(API_PROMISE_MOCK, { 
        events: eventAndStatusMock.events, 
        status: eventAndStatusMock.status, 
        callback: mockFunction, 
        unsub: undefined,
      });
      expect(mockFunction).toBeCalledTimes(1);
  });
})