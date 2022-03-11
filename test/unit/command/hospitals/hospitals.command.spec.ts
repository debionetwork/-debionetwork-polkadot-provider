import { registerHospital, updateHospital, deregisterHospital } from "../../../../src/command/hospitals";
import { ApiPromise, signAndSend, eventAndStatusMock } from "../../@polkadot-api.mock";
import { mockFunction } from "../../mock";
import { successCallback } from "../../../../src/index";
import { hospitals } from "./hospitals.command.mock";
import { hospitalDataMock } from "../../models/hospitals/hospitals.mock";

jest.mock('../../mock', () => ({
  mockFunction: jest.fn(),
}));

jest.mock('../../../../src/index', () => ({
  successCallback: jest.fn(() => mockFunction()),
}));

describe('Hospital Commands Unit Tests', () => {
  const API_PROMISE_MOCK: ApiPromise = new ApiPromise();
  API_PROMISE_MOCK.tx = {
    hospitals: hospitals
  };
  
  const signAndSendSpy = jest.spyOn(signAndSend, 'signAndSend');
  const registerHospitalSpy = jest.spyOn(hospitals, 'registerHospital');
  const updateHospitalSpy = jest.spyOn(hospitals, 'updateHospital');
  const deregisterHospitalSpy = jest.spyOn(hospitals, 'deregisterHospital');
  
  beforeEach(() => {
    (mockFunction as jest.Mock).mockClear();
    (successCallback as jest.Mock).mockClear();
    signAndSendSpy.mockClear();
    registerHospitalSpy.mockClear();
    updateHospitalSpy.mockClear();
    deregisterHospitalSpy.mockClear();
  });

  it('registerHospital should return', async () => {
      // Arrange
      const PAIR = "PAIR";
      const HOSPITAL_INFO = hospitalDataMock.info;

      // Act
      await registerHospital(
        API_PROMISE_MOCK as any, 
        PAIR,
        HOSPITAL_INFO,
        mockFunction
      );
        
      // Assert
      expect(registerHospitalSpy).toBeCalledTimes(1);
      expect(registerHospitalSpy).toBeCalledWith(HOSPITAL_INFO);
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

  it('updateHospital should return', async () => {
      // Arrange
      const PAIR = "PAIR";
      const HOSPITAL_INFO = hospitalDataMock.info;

      // Act
      await updateHospital(
        API_PROMISE_MOCK as any, 
        PAIR,
        HOSPITAL_INFO,
        mockFunction
      );
        
      // Assert
      expect(updateHospitalSpy).toBeCalledTimes(1);
      expect(updateHospitalSpy).toBeCalledWith(HOSPITAL_INFO);
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

  it('deregisterHospital should return', async () => {
      // Arrange
      const PAIR = "PAIR";

      // Act
      await deregisterHospital(
        API_PROMISE_MOCK as any, 
        PAIR,
        mockFunction
      );
        
      // Assert
      expect(deregisterHospitalSpy).toBeCalledTimes(1);
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
