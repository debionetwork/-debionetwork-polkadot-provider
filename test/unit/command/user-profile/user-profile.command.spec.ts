import { setEthAddress, adminSetEthAddress } from "../../../../src/command/user-profile";
import { successCallback } from "../../../../src/index";
import { ApiPromise, eventAndStatusMock, signAndSend } from "../../@polkadot-api.mock";
import { mockFunction } from "../../mock";
import { userProfile } from "./user-profile.command.mock";

jest.mock('../../mock', () => ({
  mockFunction: jest.fn(),
}));

jest.mock('../../../../src/index', () => ({
  successCallback: jest.fn(() => mockFunction()),
}));

describe('User Profile Commands Unit Testing', () => {
  const API_PROMISE_MOCK: ApiPromise = new ApiPromise();
  API_PROMISE_MOCK.tx = {
      userProfile: userProfile
  };

  const signAndSendSpy = jest.spyOn(signAndSend, 'signAndSend');
  const setEthAddressSpy = jest.spyOn(userProfile, 'setEthAddress');
  const adminSetEthAddressSpy = jest.spyOn(userProfile, 'adminSetEthAddress');

  beforeEach(() => {
    (mockFunction as jest.Mock).mockClear();
    (successCallback as jest.Mock).mockClear();
    signAndSendSpy.mockClear();
    setEthAddressSpy.mockClear();
    adminSetEthAddressSpy.mockClear();
  });
  
  it('setEthAddress should return', async () => {
      // Arrange
      const PAIR = "PAIR";
      const ETH_ADDRESS = "ETH_ADDRESS";

      // Act
      await setEthAddress(
        API_PROMISE_MOCK as any, 
        PAIR,
        ETH_ADDRESS,
        mockFunction
      );

      expect(setEthAddressSpy).toBeCalledTimes(1);
      expect(setEthAddressSpy).toBeCalledWith(ETH_ADDRESS);
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
  
  it('adminSetEthAddress should return', async () => {
      // Arrange
      const PAIR = "PAIR";
      const SUBSTRATE_ADDRESS = "SUBSTRATE_ADDRESS";
      const ETH_ADDRESS = "ETH_ADDRESS";

      // Act
      await adminSetEthAddress(
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
      });
      expect(mockFunction).toBeCalledTimes(2);
  });
})