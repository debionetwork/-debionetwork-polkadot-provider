import { sendRewards, updateRewardsAdminKey, sudoRewardsUpdateAdminKey } from "../../../../src/command/rewards";
import { successCallback } from "../../../../src";
import { ApiPromise, eventAndStatusMock, signAndSend } from "../../@polkadot-api.mock";
import { mockFunction } from "../../mock";
import { rewards } from "./rewards.command.mock";
import { sudo } from "../../sudo.command.mock";

jest.mock('../../mock', () => ({
  mockFunction: jest.fn(),
}));

jest.mock('../../../../src', () => ({
  successCallback: jest.fn(() => mockFunction()),
}));

describe('Reward Commands Unit Testing', () => {
  const API_PROMISE_MOCK: ApiPromise = new ApiPromise();
  API_PROMISE_MOCK.tx = {
    sudo: sudo,
    rewards: rewards
  };

  const signAndSendSpy = jest.spyOn(signAndSend, 'signAndSend');
  const sudoSpy = jest.spyOn(sudo, 'sudo');
  const rewardFundsSpy = jest.spyOn(rewards, 'rewardFunds');
  const updateAdminKeySpy = jest.spyOn(rewards, 'updateAdminKey');
  const sudoUpdateAdminKeySpy = jest.spyOn(rewards, 'sudoUpdateAdminKey');

  beforeEach(() => {
    (mockFunction as jest.Mock).mockClear();
    (successCallback as jest.Mock).mockClear();
    signAndSendSpy.mockClear();
    sudoSpy.mockClear();
    rewardFundsSpy.mockClear();
    updateAdminKeySpy.mockClear();
    sudoUpdateAdminKeySpy.mockClear();
  });
  
  it('sendRewards should return', async () => {
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
      });
      expect(mockFunction).toBeCalledTimes(1);
  });
  
  it('updateAdminKey should return', async () => {
      // Arrange
      const PAIR = "PAIR";
      const SUBSTRATE_ADDRESS = "SUBSTRATE_ADDRESS";

      // Act
      await updateRewardsAdminKey(
        API_PROMISE_MOCK as any, 
        PAIR,
        SUBSTRATE_ADDRESS,
        mockFunction
      );

      expect(updateAdminKeySpy).toBeCalledTimes(1);
      expect(updateAdminKeySpy).toBeCalledWith(SUBSTRATE_ADDRESS);
      expect(signAndSendSpy).toBeCalledTimes(1);
      expect(signAndSendSpy).toBeCalledWith(PAIR, { nonce: -1 }, expect.any(Function));
      expect(successCallback).toBeCalledTimes(1);
      expect(successCallback).toBeCalledWith(API_PROMISE_MOCK, { 
        events: eventAndStatusMock.events, 
        status: eventAndStatusMock.status, 
        callback: mockFunction,
      });
      expect(mockFunction).toBeCalledTimes(1);
  });
  
  it('sudoUpdateAdminKey should return', async () => {
      // Arrange
      const PAIR = "PAIR";
      const SUBSTRATE_ADDRESS = "SUBSTRATE_ADDRESS";

      // Act
      await sudoRewardsUpdateAdminKey(
        API_PROMISE_MOCK as any, 
        PAIR,
        SUBSTRATE_ADDRESS,
        mockFunction
      );

      expect(sudoSpy).toBeCalledTimes(1);
      expect(sudoUpdateAdminKeySpy).toBeCalledTimes(1);
      expect(sudoUpdateAdminKeySpy).toBeCalledWith(SUBSTRATE_ADDRESS);
      expect(signAndSendSpy).toBeCalledTimes(1);
      expect(signAndSendSpy).toBeCalledWith(PAIR, { nonce: -1 }, expect.any(Function));
      expect(successCallback).toBeCalledTimes(1);
      expect(successCallback).toBeCalledWith(API_PROMISE_MOCK, { 
        events: eventAndStatusMock.events, 
        status: eventAndStatusMock.status, 
        callback: mockFunction,
      });
      expect(mockFunction).toBeCalledTimes(1);
  });
})