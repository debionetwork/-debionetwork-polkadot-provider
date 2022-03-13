import { registerLab, updateLab, updateLabVerificationStatus, deregisterLab } from "../../../../src/command/labs";
import { ApiPromise, signAndSend, eventAndStatusMock } from "../../@polkadot-api.mock";
import { mockFunction } from "../../mock";
import { LabVerificationStatus } from "../../../../src/models/labs";
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
  
  beforeEach(() => {
    (mockFunction as jest.Mock).mockClear();
    (successCallback as jest.Mock).mockClear();
    signAndSendSpy.mockClear();
    registerLabSpy.mockClear();
    updateLabSpy.mockClear();
    updateLabVerificationStatusSpy.mockClear();
    deregisterLabSpy.mockClear();
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
      const STATUS = LabVerificationStatus.Unverified;

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
});
