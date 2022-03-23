import {
  successCallback
} from "../../../../../src/command/index";
import {
  bulkCreateGeneticAnalystService,
  createGeneticAnalystService,
  deleteGeneticAnalystService,
  updateGeneticAnalystService
} from "../../../../../src/command/genetic-analyst/genetic-analyst-services"
import { ApiPromise, eventAndStatusMock, signAndSend } from "../../../@polkadot-api.mock";
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

  const signAndSendSpy = jest.spyOn(signAndSend, 'signAndSend');
  const bulkCreateGeneticAnalystServiceSpy = jest.spyOn(geneticAnalystServices, 'bulkCreateGeneticAnalystService');
  const createGeneticAnalystServiceSpy = jest.spyOn(geneticAnalystServices, 'createGeneticAnalystService');
  const deleteGeneticAnalystServiceSpy = jest.spyOn(geneticAnalystServices, 'deleteGeneticAnalystService');
  const updateGeneticAnalystServiceSpy = jest.spyOn(geneticAnalystServices, 'updateGeneticAnalystService');

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
      const GA_INFO = geneticAnalystServicesMock.info;

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
      const GA_INFO = geneticAnalystServicesMock.info;

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
      const GA_INFO = geneticAnalystServicesMock.info;

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