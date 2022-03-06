import { 
  queryGeneticAnalysisById,
  queryGeneticAnalysisByOwnerId,
  queryGeneticAnalysisByGeneticAnalystId,
} from "../../../../../src/query/genetic-analysts/genetic-analysis";
import { geneticAnalysis } from "./genetic-analysis.mock";
import { ApiPromise } from "../../../@polkadot-api.mock";
import { mockFunction } from "../../../mock";
import { when } from 'jest-when';
import { geneticAnalysisDataMock } from "../../../models/genetic-analysts/genetic-analysis.mock";
import { GeneticAnalysis } from "../../../../../src/models/genetic-analysts/genetic-analysis";
  
  jest.mock('../../../mock', () => ({
    mockFunction: jest.fn(),
  }));
  
  describe('Genetic Analysis Queries Unit Tests', () => {
    const API_PROMISE_MOCK: ApiPromise = new ApiPromise();
    API_PROMISE_MOCK.query = {
        geneticAnalysis: geneticAnalysis
    };
  
    const geneticAnalysisByIdSpy = jest.spyOn(geneticAnalysis, 'geneticAnalysisById');
    const geneticAnalysisByOwnerIdSpy = jest.spyOn(geneticAnalysis, 'geneticAnalysisByOwnerId');
    const geneticAnalysisByGeneticAnalystIdSpy = jest.spyOn(geneticAnalysis, 'geneticAnalysisByGeneticAnalystId');
    
    beforeEach(() => {
      (mockFunction as jest.Mock).mockClear();
      geneticAnalysisByIdSpy.mockClear();
      geneticAnalysisByOwnerIdSpy.mockClear();
      geneticAnalysisByGeneticAnalystIdSpy.mockClear();
    });
  
    it('queryGeneticAnalysisById should return', async () => {
      // Arrange
      const ANALYSIS_ID = "ANALYSIS_ID";
      const EXPECTED_VALUE = new GeneticAnalysis(geneticAnalysisDataMock);
      (mockFunction as jest.Mock).mockReturnValue(geneticAnalysisDataMock);
  
      // Assert
      expect(await queryGeneticAnalysisById(API_PROMISE_MOCK as any, ANALYSIS_ID))
        .toEqual(EXPECTED_VALUE);
      expect(mockFunction).toBeCalledTimes(1);
      expect(mockFunction).toBeCalledWith(ANALYSIS_ID);
      expect(geneticAnalysisByIdSpy).toBeCalledTimes(1);
      expect(geneticAnalysisByIdSpy).toBeCalledWith(ANALYSIS_ID);
    });

    it('queryGeneticAnalysisByOwnerId should return', async () => {
      // Arrange
      const ANALYSIS_ID = "ANALYSIS_ID";
      const ACCOUNT_ID = "ACCOUNT_ID";
      const EXPECTED_VALUE = new GeneticAnalysis(geneticAnalysisDataMock);
  
      when(mockFunction)
        .calledWith(ACCOUNT_ID)
        .mockReturnValue([
          ANALYSIS_ID
        ]);
      when(mockFunction)
        .calledWith(ANALYSIS_ID)
        .mockReturnValue(geneticAnalysisDataMock);
  
      // Assert
      expect(await queryGeneticAnalysisByOwnerId(API_PROMISE_MOCK as any, ACCOUNT_ID))
        .toEqual([EXPECTED_VALUE]);
      expect(mockFunction).toBeCalledTimes(2);
      expect(mockFunction).toBeCalledWith(ACCOUNT_ID);
      expect(mockFunction).toBeCalledWith(ANALYSIS_ID);
      expect(geneticAnalysisByIdSpy).toBeCalledTimes(1);
      expect(geneticAnalysisByIdSpy).toBeCalledWith(ANALYSIS_ID);
      expect(geneticAnalysisByOwnerIdSpy).toBeCalledTimes(1);
      expect(geneticAnalysisByOwnerIdSpy).toBeCalledWith(ACCOUNT_ID);
    });

    it('queryGeneticAnalysisByGeneticAnalystId should return', async () => {
      // Arrange
      const ANALYSIS_ID = "ANALYSIS_ID";
      const ACCOUNT_ID = "ACCOUNT_ID";
      const EXPECTED_VALUE = new GeneticAnalysis(geneticAnalysisDataMock);
  
      when(mockFunction)
        .calledWith(ACCOUNT_ID)
        .mockReturnValue([
          ANALYSIS_ID
        ]);
      when(mockFunction)
        .calledWith(ANALYSIS_ID)
        .mockReturnValue(geneticAnalysisDataMock);
  
      // Assert
      expect(await queryGeneticAnalysisByGeneticAnalystId(API_PROMISE_MOCK as any, ACCOUNT_ID))
        .toEqual([EXPECTED_VALUE]);
      expect(mockFunction).toBeCalledTimes(2);
      expect(mockFunction).toBeCalledWith(ACCOUNT_ID);
      expect(mockFunction).toBeCalledWith(ANALYSIS_ID);
      expect(geneticAnalysisByIdSpy).toBeCalledTimes(1);
      expect(geneticAnalysisByIdSpy).toBeCalledWith(ANALYSIS_ID);
      expect(geneticAnalysisByGeneticAnalystIdSpy).toBeCalledTimes(1);
      expect(geneticAnalysisByGeneticAnalystIdSpy).toBeCalledWith(ACCOUNT_ID);
    });
  });
  