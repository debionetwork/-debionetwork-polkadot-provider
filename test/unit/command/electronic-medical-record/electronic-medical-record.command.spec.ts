import { ApiPromise, eventAndStatusMock, signAndSendWithPaymentInfo } from "../../@polkadot-api.mock";
import { mockFunction } from "../../mock";
import { successCallback } from "../../../../src/index";
import { electronicMedicalRecord } from "./electronic-medical-record.command.mock";
import { electronicMedicalRecordDataMock } from "../../models/electronic-medical-record/electronic-medical-record.mock";
import { 
  registerElectronicMedicalRecord,
  updateElectronicMedicalRecord,
  deregisterElectronicMedicalRecord,
  getAddElectronicMedicalRecordFee,
  getRemoveElectronicMedicalRecordFee  
} from "../../../../src/command/electronic-medical-record";

jest.mock('../../mock', () => ({
  mockFunction: jest.fn(),
}));

jest.mock('../../../../src/index', () => ({
  successCallback: jest.fn(() => mockFunction()),
}));

describe('Electronic Medical Record Commands Unit Tests', () => {
  const API_PROMISE_MOCK: ApiPromise = new ApiPromise();
  API_PROMISE_MOCK.tx = {
      electronicMedicalRecord: electronicMedicalRecord
  };
  
  const signAndSendSpy = jest.spyOn(signAndSendWithPaymentInfo, 'signAndSend');
  const paymentInfoSpy = jest.spyOn(signAndSendWithPaymentInfo, 'paymentInfo');
  const addElectronicMedicalRecordSpy = jest.spyOn(electronicMedicalRecord, 'addElectronicMedicalRecord');
  const updateElectronicMedicalRecordSpy = jest.spyOn(electronicMedicalRecord, 'updateElectronicMedicalRecord');
  const removeElectronicMedicalRecordSpy = jest.spyOn(electronicMedicalRecord, 'removeElectronicMedicalRecord');
  
  beforeEach(() => {
    (mockFunction as jest.Mock).mockClear();
    (successCallback as jest.Mock).mockClear();
    signAndSendSpy.mockClear();
    paymentInfoSpy.mockClear();
    addElectronicMedicalRecordSpy.mockClear();
    updateElectronicMedicalRecordSpy.mockClear();
    removeElectronicMedicalRecordSpy.mockClear();
  });

  it('registerElectronicMedicalRecord should return', async () => {
      // Arrange
      const PAIR = "PAIR";
      const EMR_MOCK = electronicMedicalRecordDataMock;

      // Act
      await registerElectronicMedicalRecord(
        API_PROMISE_MOCK as any, 
        PAIR,
        EMR_MOCK,
        mockFunction
      );
        
      // Assert
      expect(addElectronicMedicalRecordSpy).toBeCalledTimes(1);
      expect(addElectronicMedicalRecordSpy).toBeCalledWith(EMR_MOCK.title, EMR_MOCK.category, EMR_MOCK.files);
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

  it('updateElectronicMedicalRecord should return', async () => {
      // Arrange
      const PAIR = "PAIR";
      const EMR_MOCK = electronicMedicalRecordDataMock;

      // Act
      await updateElectronicMedicalRecord(
        API_PROMISE_MOCK as any, 
        PAIR,
        EMR_MOCK,
        mockFunction
      );
        
      // Assert
      expect(updateElectronicMedicalRecordSpy).toBeCalledTimes(1);
      expect(updateElectronicMedicalRecordSpy).toBeCalledWith(EMR_MOCK.id, EMR_MOCK.title, EMR_MOCK.category, EMR_MOCK.files);
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

  it('deregisterElectronicMedicalRecord should return', async () => {
      // Arrange
      const PAIR = "PAIR";
      const EMR_ID = "EMR_ID";

      // Act
      await deregisterElectronicMedicalRecord(
        API_PROMISE_MOCK as any, 
        PAIR,
        EMR_ID,
        mockFunction
      );
        
      // Assert
      expect(removeElectronicMedicalRecordSpy).toBeCalledTimes(1);
      expect(removeElectronicMedicalRecordSpy).toBeCalledWith(EMR_ID);
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

  it('getAddElectronicMedicalRecordFee should return', () => {
      // Arrange
      const PAIR = "PAIR";
      const EMR_MOCK = electronicMedicalRecordDataMock;
      const EXPECTED_VALUE = 0;
      (mockFunction as jest.Mock).mockReturnValue(EXPECTED_VALUE);
  
      // Assert
      expect(getAddElectronicMedicalRecordFee(API_PROMISE_MOCK as any, PAIR, EMR_MOCK))
        .toEqual(EXPECTED_VALUE);
      expect(addElectronicMedicalRecordSpy).toBeCalledTimes(1);
      expect(addElectronicMedicalRecordSpy).toBeCalledWith(EMR_MOCK.title, EMR_MOCK.category, EMR_MOCK.files);
      expect(paymentInfoSpy).toBeCalledTimes(1);
      expect(paymentInfoSpy).toBeCalledWith(PAIR);
      expect(mockFunction).toBeCalledTimes(1);
  });

  it('getRemoveElectronicMedicalRecordFee should return', () => {
      // Arrange
      const PAIR = "PAIR";
      const EMR_ID = "EMR_ID";
      const EXPECTED_VALUE = 0;
      (mockFunction as jest.Mock).mockReturnValue(EXPECTED_VALUE);
  
      // Assert
      expect(getRemoveElectronicMedicalRecordFee(API_PROMISE_MOCK as any, PAIR, EMR_ID))
        .toEqual(EXPECTED_VALUE);
      expect(removeElectronicMedicalRecordSpy).toBeCalledTimes(1);
      expect(removeElectronicMedicalRecordSpy).toBeCalledWith(EMR_ID);
      expect(paymentInfoSpy).toBeCalledTimes(1);
      expect(paymentInfoSpy).toBeCalledWith(PAIR);
      expect(mockFunction).toBeCalledTimes(1);
  });
});
