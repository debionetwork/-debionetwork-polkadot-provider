import { sendRewards } from "../../../src/command/rewards";
import { successCallback } from "../../../src";
import { ApiPromise, eventAndStatusMock, signAndSend } from "../@polkadot-api.mock.ts";
import { mockFunction } from "../mock";
import { rewards } from "./rewards.command.mock";

jest.mock('../mock', () => ({
  mockFunction: jest.fn(),
}));

jest.mock('../../../src', () => ({
  successCallback: jest.fn(() => mockFunction()),
}));

describe('Reward Unit Testing', () => {
  const API_PROMISE_MOCK: ApiPromise = new ApiPromise();
  API_PROMISE_MOCK.tx = {
    rewards: rewards
  };

  const signAndSendSpy = jest.spyOn(signAndSend, 'signAndSend');
  const rewardFundsSpy = jest.spyOn(rewards, 'rewardFunds');

  beforeEach(() => {
    (mockFunction as jest.Mock).mockClear();
    (successCallback as jest.Mock).mockClear();
    signAndSendSpy.mockClear();
    rewardFundsSpy.mockClear();
  });
  
  it('adminSetEthAddress should return', async () => {
      // Arrange
      const PAIR = "PAIR";
      const SUBSTRATE_ADDRESS = "SUBSTRATE_ADDRESS";
      const REWARD_AMOUNT = "REWARD_AMOUNT";

      // Act
      await sendRewards(
        API_PROMISE_MOCK as any, 
        PAIR,
        SUBSTRATE_ADDRESS,
        REWARD_AMOUNT,
        mockFunction
      );

      expect(rewardFundsSpy).toBeCalledTimes(1);
      expect(rewardFundsSpy).toBeCalledWith(SUBSTRATE_ADDRESS, REWARD_AMOUNT);
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