import { registerLab, updateLab, updateLabVerificationStatus, deregisterLab, sudoUpdateLabAdminKey, updateLabAdminKey, updateLabMinimumStakeAmount, unstakeLab, stakeLab, retrieveLabUnstakeAmount } from "../../../../src/command/labs";
import { ApiPromise, signAndSend, eventAndStatusMock } from "../../@polkadot-api.mock";
import { mockFunction } from "../../mock";
import { VerificationStatus } from "../../../../src/primitives/verification-status";
import { successCallback } from "../../../../src/index";
import { labs } from "./labs.command.mock";
import { labDataMock } from "../../models/labs/labs.mock";

jest.mock('../../mock', () => ({
  mockFunction: jest.fn(),
}));

jest.mock('../../../../src/index', () => ({
  successCallback: jest.fn(() => mockFunction()),
}));

describe('Lab Commands Unit Tests', () => {
  const API_PROMISE_MOCK: ApiPromise = new ApiPromise();
  API_PROMISE_MOCK.tx = {
      labs: labs
  };
  
  const signAndSendSpy = jest.spyOn(signAndSend, 'signAndSend');
  const registerLabSpy = jest.spyOn(labs, 'registerLab');
  const updateLabSpy = jest.spyOn(labs, 'updateLab');
  const updateLabVerificationStatusSpy = jest.spyOn(labs, 'updateLabVerificationStatus');
  const deregisterLabSpy = jest.spyOn(labs, 'deregisterLab');
  const stakeLabSpy = jest.spyOn(labs, 'stakeLab');
  const unstakeLabSpy = jest.spyOn(labs, 'unstakeLab');
  const retrieveUnstakeAmountSpy = jest.spyOn(labs, 'retrieveUnstakeAmount');
  const updateMinimumStakeAmountSpy = jest.spyOn(labs, 'updateMinimumStakeAmount');
  const updateAdminKeySpy = jest.spyOn(labs, 'updateAdminKey');
  const sudoUpdateAdminKeySpy = jest.spyOn(labs, 'sudoUpdateAdminKey');
  
  beforeEach(() => {
    (mockFunction as jest.Mock).mockClear();
    (successCallback as jest.Mock).mockClear();
    signAndSendSpy.mockClear();
    registerLabSpy.mockClear();
    updateLabSpy.mockClear();
    updateLabVerificationStatusSpy.mockClear();
    deregisterLabSpy.mockClear();
    stakeLabSpy.mockClear();
    unstakeLabSpy.mockClear();
    retrieveUnstakeAmountSpy.mockClear();
    updateMinimumStakeAmountSpy.mockClear();
    updateAdminKeySpy.mockClear();
    sudoUpdateAdminKeySpy.mockClear();
  });

  it('registerLab should return', async () => {
      // Arrange
      const PAIR = "PAIR";
      const LAB_INFO = labDataMock.info;

      // Act
      await registerLab(
        API_PROMISE_MOCK as any, 
        PAIR,
        LAB_INFO,
        mockFunction
      );
        
      // Assert
      expect(registerLabSpy).toBeCalledTimes(1);
      expect(registerLabSpy).toBeCalledWith(LAB_INFO);
      expect(signAndSendSpy).toBeCalledTimes(1);
      expect(signAndSendSpy).toBeCalledWith(PAIR, { nonce: -1 }, expect.any(Function));
      expect(successCallback).toBeCalledTimes(1);
      expect(successCallback).toBeCalledWith(API_PROMISE_MOCK, {
          events: eventAndStatusMock.events,
          status: eventAndStatusMock.status,
          callback: mockFunction
      });
      expect(mockFunction).toBeCalledTimes(1);
  });

  it('updateLab should return', async () => {
      // Arrange
      const PAIR = "PAIR";
      const LAB_INFO = labDataMock.info;

      // Act
      await updateLab(
        API_PROMISE_MOCK as any, 
        PAIR,
        LAB_INFO,
        mockFunction
      );
        
      // Assert
      expect(updateLabSpy).toBeCalledTimes(1);
      expect(updateLabSpy).toBeCalledWith(LAB_INFO);
      expect(signAndSendSpy).toBeCalledTimes(1);
      expect(signAndSendSpy).toBeCalledWith(PAIR, { nonce: -1 }, expect.any(Function));
      expect(successCallback).toBeCalledTimes(1);
      expect(successCallback).toBeCalledWith(API_PROMISE_MOCK, {
          events: eventAndStatusMock.events,
          status: eventAndStatusMock.status,
          callback: mockFunction
      });
      expect(mockFunction).toBeCalledTimes(1);
  });

  it('updateLabVerificationStatus should return', async () => {
      // Arrange
      const PAIR = "PAIR";
      const ADDR = "ADDR";
      const STATUS = VerificationStatus.Unverified;

      // Act
      await updateLabVerificationStatus(
        API_PROMISE_MOCK as any, 
        PAIR,
        ADDR,
        STATUS,
        mockFunction
      );
        
      // Assert
      expect(updateLabVerificationStatusSpy).toBeCalledTimes(1);
      expect(updateLabVerificationStatusSpy).toBeCalledWith(ADDR, STATUS);
      expect(signAndSendSpy).toBeCalledTimes(1);
      expect(signAndSendSpy).toBeCalledWith(PAIR, { nonce: -1 }, expect.any(Function));
      expect(successCallback).toBeCalledTimes(1);
      expect(successCallback).toBeCalledWith(API_PROMISE_MOCK, {
          events: eventAndStatusMock.events,
          status: eventAndStatusMock.status,
          callback: mockFunction
      });
      expect(mockFunction).toBeCalledTimes(1);
  });

  it('deregisterLab should return', async () => {
      // Arrange
      const PAIR = "PAIR";

      // Act
      await deregisterLab(
        API_PROMISE_MOCK as any, 
        PAIR,
        mockFunction
      );
        
      // Assert
      expect(deregisterLabSpy).toBeCalledTimes(1);
      expect(signAndSendSpy).toBeCalledTimes(1);
      expect(signAndSendSpy).toBeCalledWith(PAIR, { nonce: -1 }, expect.any(Function));
      expect(successCallback).toBeCalledTimes(1);
      expect(successCallback).toBeCalledWith(API_PROMISE_MOCK, {
          events: eventAndStatusMock.events,
          status: eventAndStatusMock.status,
          callback: mockFunction
      });
      expect(mockFunction).toBeCalledTimes(1);
  });
  
  it('stakeLab should return', async () => {
      // Arrange
      const PAIR = "PAIR";

      // Act
      await stakeLab(
        API_PROMISE_MOCK as any, 
        PAIR,
        mockFunction
      );

      expect(stakeLabSpy).toBeCalledTimes(1);
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
  
  it('unstakeLab should return', async () => {
      // Arrange
      const PAIR = "PAIR";

      // Act
      await unstakeLab(
        API_PROMISE_MOCK as any, 
        PAIR,
        mockFunction
      );

      expect(unstakeLabSpy).toBeCalledTimes(1);
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

  it('retrieveLabUnstakeAmount should return', async () => {
    // Arrange
    const PAIR = "PAIR";
    const DATA_MOCK = labDataMock;

    // Act
    await retrieveLabUnstakeAmount(
      API_PROMISE_MOCK as any, 
      PAIR,
      DATA_MOCK.accountId,
      mockFunction
    );

    expect(retrieveUnstakeAmountSpy).toBeCalledTimes(1);
    expect(retrieveUnstakeAmountSpy).toBeCalledWith(DATA_MOCK.accountId);
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
  
  it('updateLabMinimumStakeAmount should return', async () => {
      // Arrange
      const PAIR = "PAIR";
      const PARAM = 0;

      // Act
      await updateLabMinimumStakeAmount(
        API_PROMISE_MOCK as any, 
        PAIR,
        PARAM,
        mockFunction
      );

      expect(updateMinimumStakeAmountSpy).toBeCalledTimes(1);
      expect(updateMinimumStakeAmountSpy).toBeCalledWith(PARAM);
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
  
  it('updateLabAdminKey should return', async () => {
      // Arrange
      const PAIR = "PAIR";
      const PARAM = "PARAM";

      // Act
      await updateLabAdminKey(
        API_PROMISE_MOCK as any, 
        PAIR,
        PARAM,
        mockFunction
      );

      expect(updateAdminKeySpy).toBeCalledTimes(1);
      expect(updateAdminKeySpy).toBeCalledWith(PARAM);
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
  
  it('sudoUpdateLabAdminKey should return', async () => {
      // Arrange
      const PAIR = "PAIR";
      const PARAM = "PARAM";

      // Act
      await sudoUpdateLabAdminKey(
        API_PROMISE_MOCK as any, 
        PAIR,
        PARAM,
        mockFunction
      );

      expect(sudoUpdateAdminKeySpy).toBeCalledTimes(1);
      expect(sudoUpdateAdminKeySpy).toBeCalledWith(PARAM);
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
});
