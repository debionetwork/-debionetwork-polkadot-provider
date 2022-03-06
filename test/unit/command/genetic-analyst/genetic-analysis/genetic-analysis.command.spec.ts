import { rejectGeneticAnalysis, processGeneticAnalysis, submitGeneticAnalysis } from "../../../../../src/command/genetic-analyst/genetic-analysis";
import { successCallback } from "../../../../../src/index";
import { ApiPromise, eventAndStatusMock, signAndSend } from "../../../@polkadot-api.mock";
import { mockFunction } from "../../../mock";
import { geneticAnalysis } from "./genetic-analysis.command.mock";

jest.mock('../../../mock', () => ({
  mockFunction: jest.fn(),
}));

jest.mock('../../../../../src/index', () => ({
  successCallback: jest.fn(() => mockFunction()),
}));

describe('Genetic Analysis Commands Unit Testing', () => {
  const API_PROMISE_MOCK: ApiPromise = new ApiPromise();
  API_PROMISE_MOCK.tx = {
    geneticAnalysis: geneticAnalysis
  };

  const signAndSendSpy = jest.spyOn(signAndSend, 'signAndSend');
  const rejectGeneticAnalysisSpy = jest.spyOn(geneticAnalysis, 'rejectGeneticAnalysis');
  const processGeneticAnalysisSpy = jest.spyOn(geneticAnalysis, 'processGeneticAnalysis');
  const submitGeneticAnalysisSpy = jest.spyOn(geneticAnalysis, 'submitGeneticAnalysis');

  beforeEach(() => {
    (mockFunction as jest.Mock).mockClear();
    (successCallback as jest.Mock).mockClear();
    signAndSendSpy.mockClear();
    rejectGeneticAnalysisSpy.mockClear();
    processGeneticAnalysisSpy.mockClear();
    submitGeneticAnalysisSpy.mockClear();
  });
  
  it('rejectGeneticAnalysis should return', async () => {
      // Arrange
      const PAIR = "PAIR";
      const TRACKING_ID = "TRACKING_ID";
      const TITLE = "TITLE";
      const DESCRIPTION = "DESCRIPTION";

      // Act
      await rejectGeneticAnalysis(
        API_PROMISE_MOCK as any, 
        PAIR,
        TRACKING_ID,
        TITLE,
        DESCRIPTION,
        mockFunction
      );

      expect(rejectGeneticAnalysisSpy).toBeCalledTimes(1);
      expect(rejectGeneticAnalysisSpy).toBeCalledWith(TRACKING_ID, TITLE, DESCRIPTION);
      expect(signAndSendSpy).toBeCalledTimes(1);
      expect(signAndSendSpy).toBeCalledWith(PAIR, { nonce: -1 }, expect.any(Function));
      expect(successCallback).toBeCalledTimes(1);
      expect(successCallback).toBeCalledWith(API_PROMISE_MOCK, { 
        events: eventAndStatusMock.events, 
        status: eventAndStatusMock.status, 
        callback: mockFunction,
      });
      expect(mockFunction).toBeCalledTimes(2);
  });
  
  it('processGeneticAnalysis should return', async () => {
      // Arrange
      const PAIR = "PAIR";
      const TRACKING_ID = "TRACKING_ID";
      const STATUS = "Registered";

      // Act
      await processGeneticAnalysis(
        API_PROMISE_MOCK as any, 
        PAIR,
        TRACKING_ID,
        STATUS,
        mockFunction
      );

      expect(processGeneticAnalysisSpy).toBeCalledTimes(1);
      expect(processGeneticAnalysisSpy).toBeCalledWith(TRACKING_ID, STATUS);
      expect(signAndSendSpy).toBeCalledTimes(1);
      expect(signAndSendSpy).toBeCalledWith(PAIR, { nonce: -1 }, expect.any(Function));
      expect(successCallback).toBeCalledTimes(1);
      expect(successCallback).toBeCalledWith(API_PROMISE_MOCK, { 
        events: eventAndStatusMock.events, 
        status: eventAndStatusMock.status, 
        callback: mockFunction,
      });
      expect(mockFunction).toBeCalledTimes(2);
  });
  
  it('submitGeneticAnalysis should return', async () => {
      // Arrange
      const PAIR = "PAIR";
      const TRACKING_ID = "TRACKING_ID";
      const REPORT_LINK = "REPORT_LINK";
      const COMMENT = "COMMENT";

      // Act
      await submitGeneticAnalysis(
        API_PROMISE_MOCK as any, 
        PAIR,
        TRACKING_ID,
        REPORT_LINK,
        COMMENT,
        mockFunction
      );

      expect(submitGeneticAnalysisSpy).toBeCalledTimes(1);
      expect(submitGeneticAnalysisSpy).toBeCalledWith(TRACKING_ID, REPORT_LINK, COMMENT);
      expect(signAndSendSpy).toBeCalledTimes(1);
      expect(signAndSendSpy).toBeCalledWith(PAIR, { nonce: -1 }, expect.any(Function));
      expect(successCallback).toBeCalledTimes(1);
      expect(successCallback).toBeCalledWith(API_PROMISE_MOCK, { 
        events: eventAndStatusMock.events, 
        status: eventAndStatusMock.status, 
        callback: mockFunction,
      });
      expect(mockFunction).toBeCalledTimes(2);
  });
})