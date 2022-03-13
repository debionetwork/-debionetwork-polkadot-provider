import { addGeneticData, updateGeneticData, removeGeneticData, getAddGeneticDataFee, getRemoveGeneticDataFee, getUpdateGeneticDataFee } from "../../../../../src/command/genetic-analyst/genetic-data";
import { successCallback } from "../../../../../src/index";
import { ApiPromise, eventAndStatusMock, signAndSendWithPaymentInfo } from "../../../@polkadot-api.mock";
import { mockFunction } from "../../../mock";
import { geneticDataMock } from "../../../models/genetic-analysts/genetic-data.mock";
import { geneticData } from "./genetic-data.command.mock";

jest.mock('../../../mock', () => ({
  mockFunction: jest.fn(),
}));

jest.mock('../../../../../src/index', () => ({
  successCallback: jest.fn(() => mockFunction()),
}));

describe('Genetic Data Commands Unit Testing', () => {
  const API_PROMISE_MOCK: ApiPromise = new ApiPromise();
  API_PROMISE_MOCK.tx = {
    geneticData: geneticData
  };

  const signAndSendSpy = jest.spyOn(signAndSendWithPaymentInfo, 'signAndSend');
  const paymentInfoSpy = jest.spyOn(signAndSendWithPaymentInfo, 'paymentInfo');
  const addGeneticDataSpy = jest.spyOn(geneticData, 'addGeneticData');
  const updateGeneticDataSpy = jest.spyOn(geneticData, 'updateGeneticData');
  const removeGeneticDataSpy = jest.spyOn(geneticData, 'removeGeneticData');

  beforeEach(() => {
    (mockFunction as jest.Mock).mockClear();
    (successCallback as jest.Mock).mockClear();
    signAndSendSpy.mockClear();
    paymentInfoSpy.mockClear();
    addGeneticDataSpy.mockClear();
    updateGeneticDataSpy.mockClear();
    removeGeneticDataSpy.mockClear();
  });
  
  it('addGeneticData should return', async () => {
      // Arrange
      const PAIR = "PAIR";
      const DATA_MOCK = geneticDataMock;

      // Act
      await addGeneticData(
        API_PROMISE_MOCK as any, 
        PAIR,
        DATA_MOCK.title,
        DATA_MOCK.description,
        DATA_MOCK.reportLink,
        mockFunction
      );

      expect(addGeneticDataSpy).toBeCalledTimes(1);
      expect(addGeneticDataSpy).toBeCalledWith(DATA_MOCK.title, DATA_MOCK.description, DATA_MOCK.reportLink);
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
  
  it('updateGeneticData should return', async () => {
    // Arrange
    const PAIR = "PAIR";
    const DATA_MOCK = geneticDataMock;

    // Act
    await updateGeneticData(
      API_PROMISE_MOCK as any, 
      PAIR,
      DATA_MOCK.id,
      DATA_MOCK.title,
      DATA_MOCK.description,
      DATA_MOCK.reportLink,
      mockFunction
    );

    expect(updateGeneticDataSpy).toBeCalledTimes(1);
    expect(updateGeneticDataSpy).toBeCalledWith(DATA_MOCK.id, DATA_MOCK.title, DATA_MOCK.description, DATA_MOCK.reportLink);
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
  
  it('removeGeneticData should return', async () => {
    // Arrange
    const PAIR = "PAIR";
    const DATA_ID = "DATA_ID";

    // Act
    await removeGeneticData(
      API_PROMISE_MOCK as any, 
      PAIR,
      DATA_ID,
      mockFunction
    );

    expect(removeGeneticDataSpy).toBeCalledTimes(1);
    expect(removeGeneticDataSpy).toBeCalledWith(DATA_ID);
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

  it('getAddGeneticDataFee should return', () => {
      // Arrange
      const PAIR = "PAIR";
      const DATA_MOCK = geneticDataMock;
      const EXPECTED_VALUE = 0;
      (mockFunction as jest.Mock).mockReturnValue(EXPECTED_VALUE);
  
      // Assert
      expect(getAddGeneticDataFee(API_PROMISE_MOCK as any, PAIR, DATA_MOCK.title, DATA_MOCK.description, DATA_MOCK.reportLink))
        .toEqual(EXPECTED_VALUE);
      expect(addGeneticDataSpy).toBeCalledTimes(1);
      expect(addGeneticDataSpy).toBeCalledWith(DATA_MOCK.title, DATA_MOCK.description, DATA_MOCK.reportLink);
      expect(paymentInfoSpy).toBeCalledTimes(1);
      expect(paymentInfoSpy).toBeCalledWith(PAIR);
      expect(mockFunction).toBeCalledTimes(1);
  });

  it('getUpdateGeneticDataFee should return', () => {
      // Arrange
      const PAIR = "PAIR";
      const DATA_MOCK = geneticDataMock;
      const EXPECTED_VALUE = 0;
      (mockFunction as jest.Mock).mockReturnValue(EXPECTED_VALUE);
  
      // Assert
      expect(getUpdateGeneticDataFee(API_PROMISE_MOCK as any, PAIR, DATA_MOCK.id, DATA_MOCK.title, DATA_MOCK.description, DATA_MOCK.reportLink))
        .toEqual(EXPECTED_VALUE);
      expect(updateGeneticDataSpy).toBeCalledTimes(1);
      expect(updateGeneticDataSpy).toBeCalledWith(DATA_MOCK.id, DATA_MOCK.title, DATA_MOCK.description, DATA_MOCK.reportLink);
      expect(paymentInfoSpy).toBeCalledTimes(1);
      expect(paymentInfoSpy).toBeCalledWith(PAIR);
      expect(mockFunction).toBeCalledTimes(1);
  });

  it('getRemoveElectronicMedicalRecordFee should return', () => {
      // Arrange
      const PAIR = "PAIR";
      const DATA_ID = "DATA_ID";
      const EXPECTED_VALUE = 0;
      (mockFunction as jest.Mock).mockReturnValue(EXPECTED_VALUE);
  
      // Assert
      expect(getRemoveGeneticDataFee(API_PROMISE_MOCK as any, PAIR, DATA_ID))
        .toEqual(EXPECTED_VALUE);
      expect(removeGeneticDataSpy).toBeCalledTimes(1);
      expect(removeGeneticDataSpy).toBeCalledWith(DATA_ID);
      expect(paymentInfoSpy).toBeCalledTimes(1);
      expect(paymentInfoSpy).toBeCalledWith(PAIR);
      expect(mockFunction).toBeCalledTimes(1);
  });
})