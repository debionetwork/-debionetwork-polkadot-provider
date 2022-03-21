import {
  bulkCreateGeneticAnalystService,
  createGeneticAnalystService,
  deleteGeneticAnalystService,
  updateGeneticAnalystService
} from "../../../../../src/command/genetic-analyst/genetic-analyst-services";
import { successCallback } from "../../../../../src/index";
import { ApiPromise, eventAndStatusMock, signAndSendWithPaymentInfo } from "../../../@polkadot-api.mock";
import { mockFunction } from "../../../mock";
import { geneticAnalystServiceMock } from "../../../models/genetic-analysts/genetic-analyst-service.mock";
import { geneticAnalystService } from "./genetic-analyst-service.command.mock";

jest.mock('../../../mock', () => ({
  mockFunction: jest.fn(),
}));

jest.mock('../../../../../src/command/index', () => ({
  successCallback: jest.fn(() => mockFunction()),
}));

describe('Genetic Data Commands Unit Testing', () => {
  const API_PROMISE_MOCK: ApiPromise = new ApiPromise();
  API_PROMISE_MOCK.tx = {
    geneticAnalystService: geneticAnalystService
  };

  const signAndSendSpy = jest.spyOn(signAndSendWithPaymentInfo, 'signAndSend');
  const paymentInfoSpy = jest.spyOn(signAndSendWithPaymentInfo, 'paymentInfo');
  const bulkCreateGeneticAnalystServiceSpy = jest.spyOn(geneticAnalystService, 'bulkCreateGeneticAnalystService');
  const createGeneticAnalystServiceSpy = jest.spyOn(geneticAnalystService, 'createGeneticAnalystService');
  const deleteGeneticAnalystServiceSpy = jest.spyOn(geneticAnalystService, 'deleteGeneticAnalystService');
  const updateGeneticAnalystServiceSpy = jest.spyOn(geneticAnalystService, 'updateGeneticAnalystService');

  beforeEach(() => {
    (mockFunction as jest.Mock).mockClear();
    (successCallback as jest.Mock).mockClear();
    signAndSendSpy.mockClear();
    paymentInfoSpy.mockClear();
    bulkCreateGeneticAnalystServiceSpy.mockClear();
    createGeneticAnalystServiceSpy.mockClear();
    deleteGeneticAnalystServiceSpy.mockClear();
    updateGeneticAnalystServiceSpy.mockClear();
  });
  
  it('bulkCreateGeneticAnalystService should return', async () => {
      // Arrange
      const PAIR = "PAIR";
      const DATA_MOCK = geneticAnalystServiceMock;

      // Act
      await bulkCreateGeneticAnalystService(
        API_PROMISE_MOCK as any, 
        PAIR,
        DATA_MOCK.info,
        mockFunction
      );

      expect(bulkCreateGeneticAnalystServiceSpy).toBeCalledTimes(1);
      expect(bulkCreateGeneticAnalystServiceSpy).toBeCalledWith(DATA_MOCK.info);
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
  
  it('createGeneticAnalystService should return', async () => {
    // Arrange
    const PAIR = "PAIR";
    const DATA_MOCK = geneticAnalystServiceMock;

    // Act
    await createGeneticAnalystService(
      API_PROMISE_MOCK as any, 
      PAIR,
      DATA_MOCK.info,
      mockFunction
    );

    expect(createGeneticAnalystServiceSpy).toBeCalledTimes(1);
    expect(createGeneticAnalystServiceSpy).toBeCalledWith(DATA_MOCK.id, DATA_MOCK.info);
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
  
  it('deleteGeneticAnalystService should return', async () => {
    // Arrange
    const PAIR = "PAIR";
    const SERVICE_ID = "SERVICE_ID";

    // Act
    await deleteGeneticAnalystService(
      API_PROMISE_MOCK as any, 
      PAIR,
      SERVICE_ID,
      mockFunction
    );

    expect(deleteGeneticAnalystServiceSpy).toBeCalledTimes(1);
    expect(deleteGeneticAnalystServiceSpy).toBeCalledWith(SERVICE_ID);
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

  it('updateGeneticAnalystService should return', async () => {
      // Arrange
      const PAIR = "PAIR";
      const SERVICE_ID = 'SERIVICE_ID'
      const DATA_MOCK = geneticAnalystServiceMock;

      await updateGeneticAnalystService(
        API_PROMISE_MOCK as any, 
        PAIR,
        SERVICE_ID,
        DATA_MOCK.info,
        mockFunction
      );
      // Assert
      expect(updateGeneticAnalystServiceSpy).toBeCalledTimes(1);
      expect(updateGeneticAnalystServiceSpy).toBeCalledWith(SERVICE_ID, DATA_MOCK.info);
      expect(paymentInfoSpy).toBeCalledTimes(1);
      expect(paymentInfoSpy).toBeCalledWith(PAIR);
      expect(mockFunction).toBeCalledTimes(1);
  });
})