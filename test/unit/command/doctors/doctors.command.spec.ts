import { registerDoctor, updateDoctor, deregisterDoctor } from "../../../../src/command/doctors";
import { ApiPromise, signAndSend, eventAndStatusMock } from "../../@polkadot-api.mock";
import { mockFunction } from "../../mock";
import { successCallback } from "../../../../src/index";
import { doctors } from "./doctors.command.mock";
import { doctorDataMock } from "../../models/doctors/doctors.mock";

jest.mock('../../mock', () => ({
  mockFunction: jest.fn(),
}));

jest.mock('../../../../src/index', () => ({
  successCallback: jest.fn(() => mockFunction()),
}));

describe('Doctor Commands Unit Tests', () => {
  const API_PROMISE_MOCK: ApiPromise = new ApiPromise();
  API_PROMISE_MOCK.tx = {
      doctors: doctors
  };
  
  const signAndSendSpy = jest.spyOn(signAndSend, 'signAndSend');
  const registerDoctorSpy = jest.spyOn(doctors, 'registerDoctor');
  const updateDoctorSpy = jest.spyOn(doctors, 'updateDoctor');
  const deregisterDoctorSpy = jest.spyOn(doctors, 'deregisterDoctor');
  
  beforeEach(() => {
    (mockFunction as jest.Mock).mockClear();
    (successCallback as jest.Mock).mockClear();
    signAndSendSpy.mockClear();
    registerDoctorSpy.mockClear();
    updateDoctorSpy.mockClear();
    deregisterDoctorSpy.mockClear();
  });

  it('registerDoctor should return', async () => {
      // Arrange
      const PAIR = "PAIR";
      const LAB_INFO = doctorDataMock.info;

      // Act
      await registerDoctor(
        API_PROMISE_MOCK as any, 
        PAIR,
        LAB_INFO,
        mockFunction
      );
        
      // Assert
      expect(registerDoctorSpy).toBeCalledTimes(1);
      expect(registerDoctorSpy).toBeCalledWith(LAB_INFO);
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

  it('updateDoctor should return', async () => {
      // Arrange
      const PAIR = "PAIR";
      const LAB_INFO = doctorDataMock.info;

      // Act
      await updateDoctor(
        API_PROMISE_MOCK as any, 
        PAIR,
        LAB_INFO,
        mockFunction
      );
        
      // Assert
      expect(updateDoctorSpy).toBeCalledTimes(1);
      expect(updateDoctorSpy).toBeCalledWith(LAB_INFO);
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

  it('deregisterDoctor should return', async () => {
      // Arrange
      const PAIR = "PAIR";

      // Act
      await deregisterDoctor(
        API_PROMISE_MOCK as any, 
        PAIR,
        mockFunction
      );
        
      // Assert
      expect(deregisterDoctorSpy).toBeCalledTimes(1);
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
