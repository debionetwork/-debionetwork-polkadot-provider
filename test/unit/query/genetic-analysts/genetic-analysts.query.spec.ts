import { 
    queryGeneticAnalystByAccountId,
    queryGeneticAnalystAdminKey,
    queryGeneticAnalystCount,
    queryGeneticAnalystPalletId,
    queryMinimumStakeAmount,
    queryTotalStakedAmount,
  } from "../../../../src/query/genetic-analysts/index";
  import { geneticAnalysts } from "./genetic-analysts.query.mock";
  import { ApiPromise } from "../../@polkadot-api.mock";
  import { mockFunction } from "../../mock";
  import { geneticAnalystsDataMock } from "../../models/genetic-analysts/genetic-analysts.mock";
import { GeneticAnalyst } from "../../../../src/models/genetic-analysts";
  
  jest.mock('../../mock', () => ({
    mockFunction: jest.fn(),
  }));
  
  describe('Genetic Analysts Unit Tests', () => {
    const API_PROMISE_MOCK: ApiPromise = new ApiPromise();
    API_PROMISE_MOCK.query = {
        geneticAnalysts: geneticAnalysts
    };
  
    const geneticAnalysByAccountIdSpy = jest.spyOn(geneticAnalysts, 'geneticAnalysByAccountId');
    const geneticAnalystCountSpy = jest.spyOn(geneticAnalysts, 'geneticAnalystCount');
    const adminKeySpy = jest.spyOn(geneticAnalysts, 'adminKey');
    const palletIdSpy = jest.spyOn(geneticAnalysts, 'palletId');
    const totalStakedAmountSpy = jest.spyOn(geneticAnalysts, 'totalStakedAmount');
    const minimumStakeAmountSpy = jest.spyOn(geneticAnalysts, 'minimumStakeAmount');
    
    beforeEach(() => {
      (mockFunction as jest.Mock).mockClear();
      geneticAnalysByAccountIdSpy.mockClear();
      geneticAnalystCountSpy.mockClear();
      adminKeySpy.mockClear();
      palletIdSpy.mockClear();
      totalStakedAmountSpy.mockClear();
      minimumStakeAmountSpy.mockClear();
    });
  
    it('queryGeneticAnalystByAccountId should return', async () => {
      // Arrange
      const GA_ID = "GA_ID";
      const EXPECTED_VALUE = new GeneticAnalyst(geneticAnalystsDataMock);
      (mockFunction as jest.Mock).mockReturnValue(geneticAnalystsDataMock);
  
      // Assert
      expect(await queryGeneticAnalystByAccountId(API_PROMISE_MOCK as any, GA_ID))
        .toEqual(EXPECTED_VALUE);
      expect(mockFunction).toBeCalledTimes(1);
      expect(mockFunction).toBeCalledWith(GA_ID);
      expect(geneticAnalysByAccountIdSpy).toBeCalledTimes(1);
      expect(geneticAnalysByAccountIdSpy).toBeCalledWith(GA_ID);
    });
  
    it('queryGeneticAnalystCount should return', async () => {
      // Arrange
      const EXPECTED_VALUE = 0;
      (mockFunction as jest.Mock).mockReturnValue(EXPECTED_VALUE);
  
      // Assert
      expect(await queryGeneticAnalystCount(API_PROMISE_MOCK as any))
        .toEqual(EXPECTED_VALUE);
      expect(mockFunction).toBeCalledTimes(1);
      expect(geneticAnalystCountSpy).toBeCalledTimes(1);
    });
  
    it('queryGeneticAnalystAdminKey should return', async () => {
      // Arrange
      const EXPECTED_VALUE = "VALUE";
      (mockFunction as jest.Mock).mockReturnValue(EXPECTED_VALUE);
  
      // Assert
      expect(await queryGeneticAnalystAdminKey(API_PROMISE_MOCK as any))
        .toEqual(EXPECTED_VALUE);
      expect(mockFunction).toBeCalledTimes(1);
      expect(adminKeySpy).toBeCalledTimes(1);
    });
  
    it('queryGeneticAnalystPalletId should return', async () => {
      // Arrange
      const EXPECTED_VALUE = "VALUE";
      (mockFunction as jest.Mock).mockReturnValue(EXPECTED_VALUE);
  
      // Assert
      expect(await queryGeneticAnalystPalletId(API_PROMISE_MOCK as any))
        .toEqual(EXPECTED_VALUE);
      expect(mockFunction).toBeCalledTimes(1);
      expect(palletIdSpy).toBeCalledTimes(1);
    });
  
    it('queryTotalStakedAmount should return', async () => {
      // Arrange
      const EXPECTED_VALUE = 0;
      (mockFunction as jest.Mock).mockReturnValue(EXPECTED_VALUE);
  
      // Assert
      expect(await queryTotalStakedAmount(API_PROMISE_MOCK as any))
        .toEqual(EXPECTED_VALUE);
      expect(mockFunction).toBeCalledTimes(1);
      expect(totalStakedAmountSpy).toBeCalledTimes(1);
    });
  
    it('queryMinimumStakeAmount should return', async () => {
      // Arrange
      const EXPECTED_VALUE = 0;
      (mockFunction as jest.Mock).mockReturnValue(EXPECTED_VALUE);
  
      // Assert
      expect(await queryMinimumStakeAmount(API_PROMISE_MOCK as any))
        .toEqual(EXPECTED_VALUE);
      expect(mockFunction).toBeCalledTimes(1);
      expect(minimumStakeAmountSpy).toBeCalledTimes(1);
    });
  });
  