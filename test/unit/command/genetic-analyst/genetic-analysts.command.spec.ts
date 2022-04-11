import { 
    registerGeneticAnalyst,
    updateGeneticAnalyst,
    deregisterGeneticAnalyst,
    updateGeneticAnalystVerificationStatus,
    updateGeneticAnalystAvailabilityStatus,
    stakeGeneticAnalyst,
    retrieveGeneticAnalystUnstakeAmount,
    unstakeGeneticAnalyst,
    updateGeneticAnalystMinimumStakeAmount,
    updateGeneticAnalystAdminKey,
    sudoUpdateGeneticAnalystAdminKey
} from "../../../../src/command/genetic-analyst";
import { successCallback } from "../../../../src/index";
import { ApiPromise, eventAndStatusMock, signAndSend } from "../../@polkadot-api.mock";
import { mockFunction } from "../../mock";
import { VerificationStatus } from "../../../../src/primitives/verification-status";
import { AvailabilityStatus } from "../../../../src/primitives/availability-status";
import { geneticAnalystsDataMock } from "../../models/genetic-analysts/genetic-analysts.mock";
import { geneticAnalysts } from "./genetic-analysts.command.mock";

jest.mock('../../mock', () => ({
  mockFunction: jest.fn(),
}));

jest.mock('../../../../src/index', () => ({
  successCallback: jest.fn(() => mockFunction()),
}));

describe('Genetic Analysts Commands Unit Testing', () => {
  const API_PROMISE_MOCK: ApiPromise = new ApiPromise();
  API_PROMISE_MOCK.tx = {
    geneticAnalysts: geneticAnalysts
  };

  const signAndSendSpy = jest.spyOn(signAndSend, 'signAndSend');
  const registerGeneticAnalystSpy = jest.spyOn(geneticAnalysts, 'registerGeneticAnalyst');
  const updateGeneticAnalystSpy = jest.spyOn(geneticAnalysts, 'updateGeneticAnalyst');
  const deregisterGeneticAnalystSpy = jest.spyOn(geneticAnalysts, 'deregisterGeneticAnalyst');
  const updateGeneticAnalystVerificationStatusSpy = jest.spyOn(geneticAnalysts, 'updateGeneticAnalystVerificationStatus');
  const updateGeneticAnalystAvailabilityStatusSpy = jest.spyOn(geneticAnalysts, 'updateGeneticAnalystAvailabilityStatus');
  const stakeGeneticAnalystSpy = jest.spyOn(geneticAnalysts, 'stakeGeneticAnalyst');
  const unstakeGeneticAnalystSpy = jest.spyOn(geneticAnalysts, 'unstakeGeneticAnalyst');
  const retrieveUnstakeAmountSpy = jest.spyOn(geneticAnalysts, 'retrieveUnstakeAmount');
  const updateMinimumStakeAmountSpy = jest.spyOn(geneticAnalysts, 'updateMinimumStakeAmount');
  const updateAdminKeySpy = jest.spyOn(geneticAnalysts, 'updateAdminKey');
  const sudoUpdateAdminKeySpy = jest.spyOn(geneticAnalysts, 'sudoUpdateAdminKey');

  beforeEach(() => {
    (mockFunction as jest.Mock).mockClear();
    (successCallback as jest.Mock).mockClear();
    signAndSendSpy.mockClear();
    registerGeneticAnalystSpy.mockClear();
    updateGeneticAnalystSpy.mockClear();
    deregisterGeneticAnalystSpy.mockClear();
    updateGeneticAnalystVerificationStatusSpy.mockClear();
    updateGeneticAnalystAvailabilityStatusSpy.mockClear();
    stakeGeneticAnalystSpy.mockClear();
    unstakeGeneticAnalystSpy.mockClear();
    retrieveUnstakeAmountSpy.mockClear();
    updateMinimumStakeAmountSpy.mockClear();
    updateAdminKeySpy.mockClear();
    sudoUpdateAdminKeySpy.mockClear();
  });
  
  it('registerGeneticAnalyst should return', async () => {
      // Arrange
      const PAIR = "PAIR";
      const DATA_MOCK = geneticAnalystsDataMock;

      // Act
      await registerGeneticAnalyst(
        API_PROMISE_MOCK as any, 
        PAIR,
        DATA_MOCK.info,
        mockFunction
      );

      expect(registerGeneticAnalystSpy).toBeCalledTimes(1);
      expect(registerGeneticAnalystSpy).toBeCalledWith(DATA_MOCK.info);
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
  
  it('updateGeneticAnalyst should return', async () => {
      // Arrange
      const PAIR = "PAIR";
      const DATA_MOCK = geneticAnalystsDataMock;

      // Act
      await updateGeneticAnalyst(
        API_PROMISE_MOCK as any, 
        PAIR,
        DATA_MOCK.info,
        mockFunction
      );

      expect(updateGeneticAnalystSpy).toBeCalledTimes(1);
      expect(updateGeneticAnalystSpy).toBeCalledWith(DATA_MOCK.info);
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
  
  it('deregisterGeneticAnalyst should return', async () => {
      // Arrange
      const PAIR = "PAIR";

      // Act
      await deregisterGeneticAnalyst(
        API_PROMISE_MOCK as any, 
        PAIR,
        mockFunction
      );

      expect(deregisterGeneticAnalystSpy).toBeCalledTimes(1);
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
  
  it('updateGeneticAnalystVerificationStatus should return', async () => {
      // Arrange
      const PAIR = "PAIR";
      const DATA_MOCK = geneticAnalystsDataMock;

      // Act
      await updateGeneticAnalystVerificationStatus(
        API_PROMISE_MOCK as any, 
        PAIR,
        DATA_MOCK.accountId,
        DATA_MOCK.verificationStatus as VerificationStatus,
        mockFunction
      );

      expect(updateGeneticAnalystVerificationStatusSpy).toBeCalledTimes(1);
      expect(updateGeneticAnalystVerificationStatusSpy).toBeCalledWith(DATA_MOCK.accountId, DATA_MOCK.verificationStatus);
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

  it('retrieveGeneticAnalystUnstakeAmount should return', async () => {
    // Arrange
    const PAIR = "PAIR";
    const DATA_MOCK = geneticAnalystsDataMock;

    // Act
    await retrieveGeneticAnalystUnstakeAmount(
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
  
  it('updateGeneticAnalystAvailabilityStatus should return', async () => {
      // Arrange
      const PAIR = "PAIR";
      const DATA_MOCK = geneticAnalystsDataMock;

      // Act
      await updateGeneticAnalystAvailabilityStatus(
        API_PROMISE_MOCK as any, 
        PAIR,
        DATA_MOCK.availabilityStatus as AvailabilityStatus,
        mockFunction
      );

      expect(updateGeneticAnalystAvailabilityStatusSpy).toBeCalledTimes(1);
      expect(updateGeneticAnalystAvailabilityStatusSpy).toBeCalledWith(DATA_MOCK.availabilityStatus);
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
  
  it('stakeGeneticAnalyst should return', async () => {
      // Arrange
      const PAIR = "PAIR";

      // Act
      await stakeGeneticAnalyst(
        API_PROMISE_MOCK as any, 
        PAIR,
        mockFunction
      );

      expect(stakeGeneticAnalystSpy).toBeCalledTimes(1);
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
  
  it('unstakeGeneticAnalyst should return', async () => {
      // Arrange
      const PAIR = "PAIR";

      // Act
      await unstakeGeneticAnalyst(
        API_PROMISE_MOCK as any, 
        PAIR,
        mockFunction
      );

      expect(unstakeGeneticAnalystSpy).toBeCalledTimes(1);
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
  
  it('updateGeneticAnalystMinimumStakeAmount should return', async () => {
      // Arrange
      const PAIR = "PAIR";
      const PARAM = 0;

      // Act
      await updateGeneticAnalystMinimumStakeAmount(
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
  
  it('updateGeneticAnalystAdminKey should return', async () => {
      // Arrange
      const PAIR = "PAIR";
      const PARAM = "PARAM";

      // Act
      await updateGeneticAnalystAdminKey(
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
  
  it('sudoUpdateGeneticAnalystAdminKey should return', async () => {
      // Arrange
      const PAIR = "PAIR";
      const PARAM = "PARAM";

      // Act
      await sudoUpdateGeneticAnalystAdminKey(
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
})