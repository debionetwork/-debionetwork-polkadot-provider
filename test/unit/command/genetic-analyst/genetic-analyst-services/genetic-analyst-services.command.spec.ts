import {
  successCallback
} from "../../../../../src/command/index";
import {
  bulkCreateGeneticAnalystService,
  bulkCreateGeneticAnalystServiceFee,
  createGeneticAnalystService,
  createGeneticAnalystServiceFee,
  deleteGeneticAnalystService,
  deleteGeneticAnalystServiceFee,
  updateGeneticAnalystService,
  updateGeneticAnalystServiceFee
} from "../../../../../src/command/genetic-analyst/genetic-analyst-services"
import { ApiPromise, eventAndStatusMock, signAndSendWithPaymentInfo } from "../../../@polkadot-api.mock";
import { mockFunction } from "../../../mock";
import { geneticAnalystServices } from "./genetic-analyst-services.command.mock";
import { geneticAnalystServicesMock } from "../../../models/genetic-analysts/genetic-analyst-services.mock";

jest.mock('../../../mock', () => ({
  mockFunction: jest.fn(),
}));

jest.mock('../../../../../src/command/index', () => ({
  successCallback: jest.fn(() => mockFunction()),
}));

describe('Genetic Analysis Commands Unit Testing', () => {
  const API_PROMISE_MOCK: ApiPromise = new ApiPromise();
  API_PROMISE_MOCK.tx = {
    geneticAnalystServices: geneticAnalystServices
  };

  const signAndSendSpy = jest.spyOn(signAndSendWithPaymentInfo, 'signAndSend');
  const paymentInfoSpy = jest.spyOn(signAndSendWithPaymentInfo, 'paymentInfo');
  const bulkCreateGeneticAnalystServiceSpy = jest.spyOn(geneticAnalystServices, 'bulkCreateGeneticAnalystService');
  const createGeneticAnalystServiceSpy = jest.spyOn(geneticAnalystServices, 'createGeneticAnalystService');
  const deleteGeneticAnalystServiceSpy = jest.spyOn(geneticAnalystServices, 'deleteGeneticAnalystService');
  const updateGeneticAnalystServiceSpy = jest.spyOn(geneticAnalystServices, 'updateGeneticAnalystService');

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
      const GA_INFO = geneticAnalystServicesMock[0][1]['info'];    

      // Act
      await bulkCreateGeneticAnalystService(
        API_PROMISE_MOCK as any, 
        PAIR,
        GA_INFO,
        mockFunction
      );

      expect(bulkCreateGeneticAnalystServiceSpy).toBeCalledTimes(1);
      expect(bulkCreateGeneticAnalystServiceSpy).toBeCalledWith(GA_INFO);
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
      const GA_INFO = geneticAnalystServicesMock[0][1]['info']

      // Act
      await createGeneticAnalystService(
        API_PROMISE_MOCK as any, 
        PAIR,
        GA_INFO,
        mockFunction
      );

      expect(createGeneticAnalystServiceSpy).toBeCalledTimes(1);
      expect(createGeneticAnalystServiceSpy).toBeCalledWith(GA_INFO);
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
      const GA_SERVICE_ID = "GA_SERVICE_ID";

      // Act
      await deleteGeneticAnalystService(
        API_PROMISE_MOCK as any, 
        PAIR,
        GA_SERVICE_ID,
        mockFunction
      );

      expect(deleteGeneticAnalystServiceSpy).toBeCalledTimes(1);
      expect(deleteGeneticAnalystServiceSpy).toBeCalledWith(GA_SERVICE_ID);
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
      const GA_SERVICE_ID = "GA_SERVICE_ID";
      const GA_INFO = geneticAnalystServicesMock[0][1]['info'];

    // Act
    await updateGeneticAnalystService(
      API_PROMISE_MOCK as any, 
      PAIR,
      GA_SERVICE_ID,
      GA_INFO,
      mockFunction
    );

    expect(updateGeneticAnalystServiceSpy).toBeCalledTimes(1);
    expect(updateGeneticAnalystServiceSpy).toBeCalledWith(GA_SERVICE_ID, GA_INFO);
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
  
  it('bulkCreateGeneticAnalystServiceFee should return', async () => {
      // Arrange
      const PAIR = "PAIR";
      const GA_INFO = geneticAnalystServicesMock.info;
      const EXPECTED_VALUE = 0;
      (mockFunction as jest.Mock).mockReturnValue(EXPECTED_VALUE);

      // Assert
      expect(await bulkCreateGeneticAnalystServiceFee(
        API_PROMISE_MOCK as any, 
        PAIR,
        GA_INFO,
      )).toEqual(EXPECTED_VALUE);
      expect(bulkCreateGeneticAnalystServiceSpy).toBeCalledTimes(1);
      expect(bulkCreateGeneticAnalystServiceSpy).toBeCalledWith(GA_INFO);
      expect(paymentInfoSpy).toBeCalledTimes(1);
      expect(paymentInfoSpy).toBeCalledWith(PAIR);
      expect(mockFunction).toBeCalledTimes(1);
  });
  
  it('createGeneticAnalystServiceFee should return', async () => {
      // Arrange
      const PAIR = "PAIR";
      const GA_INFO = geneticAnalystServicesMock.info;
      const EXPECTED_VALUE = 0;
      (mockFunction as jest.Mock).mockReturnValue(EXPECTED_VALUE);

      // Assert
      expect(await createGeneticAnalystServiceFee(
        API_PROMISE_MOCK as any, 
        PAIR,
        GA_INFO,
      )).toEqual(EXPECTED_VALUE);
      expect(createGeneticAnalystServiceSpy).toBeCalledTimes(1);
      expect(createGeneticAnalystServiceSpy).toBeCalledWith(GA_INFO);
      expect(paymentInfoSpy).toBeCalledTimes(1);
      expect(paymentInfoSpy).toBeCalledWith(PAIR);
      expect(mockFunction).toBeCalledTimes(1);
  });
  
  it('deleteGeneticAnalystServiceFee should return', async () => {
      // Arrange
      const PAIR = "PAIR";
      const GA_SERVICE_ID = "GA_SERVICE_ID";
      const EXPECTED_VALUE = 0;
      (mockFunction as jest.Mock).mockReturnValue(EXPECTED_VALUE);

      // Assert
      expect(await deleteGeneticAnalystServiceFee(
        API_PROMISE_MOCK as any, 
        PAIR,
        GA_SERVICE_ID,
      )).toEqual(EXPECTED_VALUE);
      expect(deleteGeneticAnalystServiceSpy).toBeCalledTimes(1);
      expect(deleteGeneticAnalystServiceSpy).toBeCalledWith(GA_SERVICE_ID);
      expect(paymentInfoSpy).toBeCalledTimes(1);
      expect(paymentInfoSpy).toBeCalledWith(PAIR);
      expect(mockFunction).toBeCalledTimes(1);
  });

  it('updateGeneticAnalystServiceFee should return', async () => {
    // Arrange
    const PAIR = "PAIR";
    const GA_SERVICE_ID = "GA_SERVICE_ID";
    const GA_INFO = geneticAnalystServicesMock.info;
    const EXPECTED_VALUE = 0;
    (mockFunction as jest.Mock).mockReturnValue(EXPECTED_VALUE);

    // Assert
    expect(await updateGeneticAnalystServiceFee(
      API_PROMISE_MOCK as any, 
      PAIR,
      GA_SERVICE_ID,
      GA_INFO,
    )).toEqual(EXPECTED_VALUE);
    expect(updateGeneticAnalystServiceSpy).toBeCalledTimes(1);
    expect(updateGeneticAnalystServiceSpy).toBeCalledWith(GA_SERVICE_ID, GA_INFO);
    expect(paymentInfoSpy).toBeCalledTimes(1);
    expect(paymentInfoSpy).toBeCalledWith(PAIR);
    expect(mockFunction).toBeCalledTimes(1);
  });
})