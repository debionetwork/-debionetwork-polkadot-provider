import {
  successCallback,
  bulkCreateGeneticAnalystService,
  createGeneticAnalystService,
  deleteGeneticAnalystService,
  updateGeneticAnalystService
} from "../../../../../src/index";
import { ApiPromise, eventAndStatusMock, signAndSend } from "../../../@polkadot-api.mock";
import { mockFunction } from "../../../mock";
import { geneticAnalystService } from "./genetic-analyst-service.command.mock";
import { geneticAnalystServiceMock } from "../../../models/genetic-analysts/genetic-analyst-service.mock";

jest.mock('../../../mock', () => ({
  mockFunction: jest.fn(),
}));

jest.mock('../../../../../src/index', () => ({
  successCallback: jest.fn(() => mockFunction()),
  bulkCreateGeneticAnalystService: jest.fn(() => mockFunction()),
  createGeneticAnalystService: jest.fn(() => mockFunction()),
  deleteGeneticAnalystService: jest.fn(() => mockFunction()),
  updateGeneticAnalystService: jest.fn(() => mockFunction()),
}));

describe('Genetic Analysis Commands Unit Testing', () => {
  const API_PROMISE_MOCK: ApiPromise = new ApiPromise();
  API_PROMISE_MOCK.tx = {
    geneticAnalystService: geneticAnalystService
  };

  const signAndSendSpy = jest.spyOn(signAndSend, 'signAndSend');
  const bulkCreateGeneticAnalystServiceSpy = jest.spyOn(geneticAnalystService, 'bulkCreateGeneticAnalystService');
  const createGeneticAnalystServiceSpy = jest.spyOn(geneticAnalystService, 'createGeneticAnalystService');
  const deleteGeneticAnalystServiceSpy = jest.spyOn(geneticAnalystService, 'deleteGeneticAnalystService');
  const updateGeneticAnalystServiceSpy = jest.spyOn(geneticAnalystService, 'updateGeneticAnalystService');

  beforeEach(() => {
    (mockFunction as jest.Mock).mockClear();
    (successCallback as jest.Mock).mockClear();
    signAndSendSpy.mockClear();
    bulkCreateGeneticAnalystServiceSpy.mockClear();
    createGeneticAnalystServiceSpy.mockClear();
    deleteGeneticAnalystServiceSpy.mockClear();
    updateGeneticAnalystServiceSpy.mockClear();
  });
  
  it('bulkCreateGeneticAnalystService should return', async () => {
      // Arrange
      const PAIR = "PAIR";
      const GA_INFO = geneticAnalystServiceMock.info;

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
      const GA_INFO = geneticAnalystServiceMock.info;

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
      const GA_INFO = geneticAnalystServiceMock.info;

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
})