import { 
  queryGeneticAnalysisOrderById,
  queryGeneticAnalysisOrderAdminKey,
  queryGeneticAnalysisOrderByCustomerId,
  queryGeneticAnalysisOrderBySeller,
  queryGeneticAnalysisOrderPalletId,
  queryGeneticAnalysisOrderTotalEscrowAmount,
  queryLastGeneticAnalysisOrderByCustomerId,
  queryPendingGeneticAnalysisOrderByGeneticAnalystId
} from "../../../../../src/query/genetic-analysts/genetic-analysis-orders";
import { geneticAnalysisOrders } from "./genetic-analysis-orders.mock";
import { ApiPromise } from "../../../@polkadot-api.mock";
import { mockFunction } from "../../../mock";
import { geneticAnalysisOrdersDataMock } from "../../../models/genetic-analysts/genetic-analysis-orders.mock";
import { GeneticAnalysisOrder } from "../../../../../src/models/genetic-analysts/genetic-analysis-orders";
import { when } from 'jest-when';
  
  jest.mock('../../../mock', () => ({
    mockFunction: jest.fn(),
  }));
  
  describe('Genetic Analysis Orders Queries Unit Tests', () => {
    const API_PROMISE_MOCK: ApiPromise = new ApiPromise();
    API_PROMISE_MOCK.query = {
        geneticAnalysisOrders: geneticAnalysisOrders
    };
  
    const geneticAnalysisOrderByIdSpy = jest.spyOn(geneticAnalysisOrders, 'geneticAnalysisOrders');
    const geneticAnalysisOrdersByCustomerIdSpy = jest.spyOn(geneticAnalysisOrders, 'geneticAnalysisOrdersByCustomer');
    const geneticAnalysisOrdersByGeneticAnalystIdSpy = jest.spyOn(geneticAnalysisOrders, 'geneticAnalysisOrdersBySeller');
    const pendingGeneticAnalysisOrdersByGeneticAnalystIdSpy = jest.spyOn(geneticAnalysisOrders, 'pendingGeneticAnalysisOrdersByGeneticAnalystId');
    const lastGeneticAnalysisOrderByCustomerIdSpy = jest.spyOn(geneticAnalysisOrders, 'lastGeneticAnalysisOrderByCustomer');
    const totalEscrowAmountSpy = jest.spyOn(geneticAnalysisOrders, 'totalEscrowAmount');
    const adminKeySpy = jest.spyOn(geneticAnalysisOrders, 'adminKey');
    const palletIdSpy = jest.spyOn(geneticAnalysisOrders, 'palletId');
    
    beforeEach(() => {
      (mockFunction as jest.Mock).mockClear();
      geneticAnalysisOrderByIdSpy.mockClear();
      geneticAnalysisOrdersByCustomerIdSpy.mockClear();
      geneticAnalysisOrdersByGeneticAnalystIdSpy.mockClear();
      pendingGeneticAnalysisOrdersByGeneticAnalystIdSpy.mockClear();
      lastGeneticAnalysisOrderByCustomerIdSpy.mockClear();
      totalEscrowAmountSpy.mockClear();
      adminKeySpy.mockClear();
      palletIdSpy.mockClear();
    });
  
    it('queryGeneticAnalysisOrderById should return', async () => {
      // Arrange
      const ORDER_ID = "ORDER_ID";
      const EXPECTED_VALUE = new GeneticAnalysisOrder(geneticAnalysisOrdersDataMock);
      (mockFunction as jest.Mock).mockReturnValue(geneticAnalysisOrdersDataMock);
  
      // Assert
      expect(await queryGeneticAnalysisOrderById(API_PROMISE_MOCK as any, ORDER_ID))
        .toEqual(EXPECTED_VALUE);
      expect(mockFunction).toBeCalledTimes(1);
      expect(mockFunction).toBeCalledWith(ORDER_ID);
      expect(geneticAnalysisOrderByIdSpy).toBeCalledTimes(1);
      expect(geneticAnalysisOrderByIdSpy).toBeCalledWith(ORDER_ID);
    });

    it('queryGeneticAnalysisOrderByCustomerId should return', async () => {
      // Arrange
      const ORDER_ID = "ORDER_ID";
      const ACCOUNT_ID = "ACCOUNT_ID";
      const EXPECTED_VALUE = new GeneticAnalysisOrder(geneticAnalysisOrdersDataMock);
  
      when(mockFunction)
        .calledWith(ACCOUNT_ID)
        .mockReturnValue([
          ORDER_ID
        ]);
      when(mockFunction)
        .calledWith(ORDER_ID)
        .mockReturnValue(geneticAnalysisOrdersDataMock);
  
      // Assert
      expect(await queryGeneticAnalysisOrderByCustomerId(API_PROMISE_MOCK as any, ACCOUNT_ID))
        .toEqual([EXPECTED_VALUE]);
      expect(mockFunction).toBeCalledTimes(2);
      expect(mockFunction).toBeCalledWith(ACCOUNT_ID);
      expect(mockFunction).toBeCalledWith(ORDER_ID);
      expect(geneticAnalysisOrderByIdSpy).toBeCalledTimes(1);
      expect(geneticAnalysisOrderByIdSpy).toBeCalledWith(ORDER_ID);
      expect(geneticAnalysisOrdersByCustomerIdSpy).toBeCalledTimes(1);
      expect(geneticAnalysisOrdersByCustomerIdSpy).toBeCalledWith(ACCOUNT_ID);
    });

    it('queryPendingGeneticAnalysisOrderByGeneticAnalystId should return', async () => {
      // Arrange
      const ORDER_ID = "ORDER_ID";
      const ACCOUNT_ID = "ACCOUNT_ID";
      const EXPECTED_VALUE = new GeneticAnalysisOrder(geneticAnalysisOrdersDataMock);
  
      when(mockFunction)
        .calledWith(ACCOUNT_ID)
        .mockReturnValue([
          ORDER_ID
        ]);
      when(mockFunction)
        .calledWith(ORDER_ID)
        .mockReturnValue(geneticAnalysisOrdersDataMock);
  
      // Assert
      expect(await queryPendingGeneticAnalysisOrderByGeneticAnalystId(API_PROMISE_MOCK as any, ACCOUNT_ID))
        .toEqual([EXPECTED_VALUE]);
      expect(mockFunction).toBeCalledTimes(2);
      expect(mockFunction).toBeCalledWith(ACCOUNT_ID);
      expect(mockFunction).toBeCalledWith(ORDER_ID);
      expect(geneticAnalysisOrderByIdSpy).toBeCalledTimes(1);
      expect(geneticAnalysisOrderByIdSpy).toBeCalledWith(ORDER_ID);
      expect(pendingGeneticAnalysisOrdersByGeneticAnalystIdSpy).toBeCalledTimes(1);
      expect(pendingGeneticAnalysisOrdersByGeneticAnalystIdSpy).toBeCalledWith(ACCOUNT_ID);
    });

    it('queryLastGeneticAnalysisOrderByCustomerId should return', async () => {
      // Arrange
      const ORDER_ID = "ORDER_ID";
      const ACCOUNT_ID = "ACCOUNT_ID";
      const EXPECTED_VALUE = new GeneticAnalysisOrder(geneticAnalysisOrdersDataMock);
  
      when(mockFunction)
        .calledWith(ACCOUNT_ID)
        .mockReturnValue([
          ORDER_ID
        ]);
      when(mockFunction)
        .calledWith(ORDER_ID)
        .mockReturnValue(geneticAnalysisOrdersDataMock);
  
      // Assert
      expect(await queryLastGeneticAnalysisOrderByCustomerId(API_PROMISE_MOCK as any, ACCOUNT_ID))
        .toEqual(EXPECTED_VALUE);
      expect(mockFunction).toBeCalledTimes(2);
      expect(mockFunction).toBeCalledWith(ACCOUNT_ID);
      expect(mockFunction).toBeCalledWith(ORDER_ID);
      expect(geneticAnalysisOrderByIdSpy).toBeCalledTimes(1);
      expect(geneticAnalysisOrderByIdSpy).toBeCalledWith(ORDER_ID);
      expect(lastGeneticAnalysisOrderByCustomerIdSpy).toBeCalledTimes(1);
      expect(lastGeneticAnalysisOrderByCustomerIdSpy).toBeCalledWith(ACCOUNT_ID);
    });

    it('queryGeneticAnalysisOrderByGeneticAnalystId should return', async () => {
      // Arrange
      const ORDER_ID = "ORDER_ID";
      const ACCOUNT_ID = "ACCOUNT_ID";
      const EXPECTED_VALUE = new GeneticAnalysisOrder(geneticAnalysisOrdersDataMock);
  
      when(mockFunction)
        .calledWith(ACCOUNT_ID)
        .mockReturnValue([
          ORDER_ID
        ]);
      when(mockFunction)
        .calledWith(ORDER_ID)
        .mockReturnValue(geneticAnalysisOrdersDataMock);
  
      // Assert
      expect(await queryGeneticAnalysisOrderBySeller(API_PROMISE_MOCK as any, ACCOUNT_ID))
        .toEqual([EXPECTED_VALUE]);
      expect(mockFunction).toBeCalledTimes(2);
      expect(mockFunction).toBeCalledWith(ACCOUNT_ID);
      expect(mockFunction).toBeCalledWith(ORDER_ID);
      expect(geneticAnalysisOrderByIdSpy).toBeCalledTimes(1);
      expect(geneticAnalysisOrderByIdSpy).toBeCalledWith(ORDER_ID);
      expect(geneticAnalysisOrdersByGeneticAnalystIdSpy).toBeCalledTimes(1);
      expect(geneticAnalysisOrdersByGeneticAnalystIdSpy).toBeCalledWith(ACCOUNT_ID);
    });
  
    it('queryGeneticAnalysisOrderAdminKey should return', async () => {
      // Arrange
      const EXPECTED_VALUE = "VALUE";
      (mockFunction as jest.Mock).mockReturnValue(EXPECTED_VALUE);
  
      // Assert
      expect(await queryGeneticAnalysisOrderAdminKey(API_PROMISE_MOCK as any))
        .toEqual(EXPECTED_VALUE);
      expect(mockFunction).toBeCalledTimes(1);
      expect(adminKeySpy).toBeCalledTimes(1);
    });
  
    it('queryGeneticAnalysisOrderPalletId should return', async () => {
      // Arrange
      const EXPECTED_VALUE = "VALUE";
      (mockFunction as jest.Mock).mockReturnValue(EXPECTED_VALUE);
  
      // Assert
      expect(await queryGeneticAnalysisOrderPalletId(API_PROMISE_MOCK as any))
        .toEqual(EXPECTED_VALUE);
      expect(mockFunction).toBeCalledTimes(1);
      expect(palletIdSpy).toBeCalledTimes(1);
    });
  
    it('queryGeneticAnalysisOrderTotalEscrowAmount should return', async () => {
      // Arrange
      const EXPECTED_VALUE = 0;
      (mockFunction as jest.Mock).mockReturnValue(EXPECTED_VALUE);
  
      // Assert
      expect(await queryGeneticAnalysisOrderTotalEscrowAmount(API_PROMISE_MOCK as any))
        .toEqual(EXPECTED_VALUE);
      expect(mockFunction).toBeCalledTimes(1);
      expect(totalEscrowAmountSpy).toBeCalledTimes(1);
    });
  });
  