import { ApiPromise } from "../../../@polkadot-api.mock";
import { geneticTesting } from "./genetic-testing.mock";
import { mockFunction } from "../../../mock";
import { queryDnaSamples, 
  queryDnaSamplesByLab, 
  queryDnaSamplesByOwner, 
  queryDnaTestResults, 
  queryDnaTestResultsByLab, 
  queryDnaTestResultsByOwner, 
  queryStakedDataByAccountId, 
  queryStakedDataByOrderId,
  getDnaTestResultsDetailByLab
} from "../../../../../src/query/labs/genetic-testing";
import { queryOrderDetailByOrderID } from "../../../../../src/query/labs/orders";
import { queryServiceById } from "../../../../../src/query/labs/services";
import { queryLabById } from "../../../../../src/query/labs";
import { DnaSample } from "../../../../../src/models/labs/genetic-testing/dna-sample";
import { DnaSampleDataMock, TestResultDataMock } from "../../../models/labs/genetic-testing.mock";
import { when } from 'jest-when';
import { TestResult } from "../../../../../src/models/labs/genetic-testing/test-result";
import { labDataMock } from "../../../models/labs/labs.mock";
import { serviceDataMock } from "../../../models/labs/services.mock";
import { orderDataMock } from "../../../models/labs/orders.mock";

jest.mock('../../../../../src/query/labs/orders', () => ({
  queryOrderDetailByOrderID: jest.fn()
}));

jest.mock('../../../../../src/query/labs/services', () => ({
  queryServiceById: jest.fn()
}));

jest.mock('../../../../../src/query/labs', () => ({
  queryLabById: jest.fn()
}));

jest.mock('../../../mock', () => ({
  mockFunction: jest.fn(),
}));

describe('Orders Queries Unit Tests', () => {
  const API_PROMISE_MOCK: ApiPromise = new ApiPromise();
  API_PROMISE_MOCK.query = {
    geneticTesting: geneticTesting
  };

  const dnaSamplesSpy = jest.spyOn(geneticTesting, "dnaSamples");
  const dnaSamplesByLabSpy = jest.spyOn(geneticTesting, "dnaSamplesByLab");
  const dnaSamplesByOwnerSpy = jest.spyOn(geneticTesting, "dnaSamplesByOwner");
  const dnaTestResultsSpy = jest.spyOn(geneticTesting, "dnaTestResults");
  const dnaTestResultsByLabSpy = jest.spyOn(geneticTesting, "dnaTestResultsByLab");
  const dnaTestResultsByOwnerSpy = jest.spyOn(geneticTesting, "dnaTestResultsByOwner");
  const stakedDataByAccountIdSpy = jest.spyOn(geneticTesting, "stakedDataByAccountId");
  const stakedDataByOrderIdSpy = jest.spyOn(geneticTesting, "stakedDataByOrderId");

  beforeEach(() => {
    (mockFunction as jest.Mock).mockClear();
    dnaSamplesSpy.mockClear();
    dnaSamplesByLabSpy.mockClear();
    dnaSamplesByOwnerSpy.mockClear();
    dnaTestResultsSpy.mockClear();
    dnaTestResultsByLabSpy.mockClear();
    dnaTestResultsByOwnerSpy.mockClear();
    stakedDataByAccountIdSpy.mockClear();
    stakedDataByOrderIdSpy.mockClear();
  });

  it("queryDnaSamples should return", async () => {
    // Arrange
    const TRACKING_ID = "TRACKING_ID";
    const EXPECTED_VALUE = new DnaSample(DnaSampleDataMock);
    (mockFunction as jest.Mock).mockReturnValue(EXPECTED_VALUE);

    // Assert
    expect(await queryDnaSamples(API_PROMISE_MOCK as any, TRACKING_ID))
      .toEqual(EXPECTED_VALUE);
    expect(mockFunction).toBeCalledTimes(1);
    expect(mockFunction).toBeCalledWith(TRACKING_ID);
    expect(dnaSamplesSpy).toBeCalledTimes(1);
    expect(dnaSamplesSpy).toBeCalledWith(TRACKING_ID);
  });

  it("queryDnaSamplesByLab should return", async () => {
    // Arrange
    const LAB_ID = "LAB_ID";
    const TRACKING_ID = "TRACKING_ID";
    const TRACKING_IDS = [ TRACKING_ID ];
    const EXPECTED_VALUE = new DnaSample(DnaSampleDataMock);

    when(mockFunction)
      .calledWith(LAB_ID)
      .mockReturnValue(TRACKING_IDS);
    when(mockFunction)
      .calledWith(TRACKING_ID)
      .mockReturnValue(EXPECTED_VALUE);

    // Assert
    expect(await queryDnaSamplesByLab(API_PROMISE_MOCK as any, LAB_ID))
      .toEqual([EXPECTED_VALUE]);
    expect(mockFunction).toBeCalledTimes(2);
    expect(mockFunction).toBeCalledWith(LAB_ID);
    expect(dnaSamplesByLabSpy).toBeCalledTimes(1);
    expect(dnaSamplesByLabSpy).toBeCalledWith(LAB_ID);
    expect(dnaSamplesSpy).toBeCalledTimes(1);
    expect(dnaSamplesSpy).toBeCalledWith(TRACKING_ID);
  });

  it("queryDnaSamplesByOwner should return", async () => {
    // Arrange
    const OWNER_ID = "OWNER_ID";
    const TRACKING_ID = "TRACKING_ID";
    const TRACKING_IDS = [ TRACKING_ID ];
    const EXPECTED_VALUE = new DnaSample(DnaSampleDataMock);

    when(mockFunction)
      .calledWith(OWNER_ID)
      .mockReturnValue(TRACKING_IDS);
    when(mockFunction)
      .calledWith(TRACKING_ID)
      .mockReturnValue(EXPECTED_VALUE);

    // Assert
    expect(await queryDnaSamplesByOwner(API_PROMISE_MOCK as any, OWNER_ID))
      .toEqual([EXPECTED_VALUE]);
    expect(mockFunction).toBeCalledTimes(2);
    expect(mockFunction).toBeCalledWith(OWNER_ID);
    expect(dnaSamplesByOwnerSpy).toBeCalledTimes(1);
    expect(dnaSamplesByOwnerSpy).toBeCalledWith(OWNER_ID);
    expect(dnaSamplesSpy).toBeCalledTimes(1);
    expect(dnaSamplesSpy).toBeCalledWith(TRACKING_ID);
  });

  it("queryDnaTestResults should return", async () => {
    // Arrange
    const TRACKING_ID = "TRACKING_ID";
    const EXPECTED_VALUE = new TestResult(TestResultDataMock);
    (mockFunction as jest.Mock).mockReturnValue(EXPECTED_VALUE);

    // Assert
    expect(await queryDnaTestResults(API_PROMISE_MOCK as any, TRACKING_ID))
      .toEqual(EXPECTED_VALUE);
    expect(mockFunction).toBeCalledTimes(1);
    expect(mockFunction).toBeCalledWith(TRACKING_ID);
    expect(dnaTestResultsSpy).toBeCalledTimes(1);
    expect(dnaTestResultsSpy).toBeCalledWith(TRACKING_ID);
  });

  it("queryDnaTestResultsByLab should return", async () => {
    // Arrange
    const LAB_ID = "LAB_ID";
    const TRACKING_ID = "TRACKING_ID";
    const TRACKING_IDS = [ TRACKING_ID ];
    const EXPECTED_VALUE = new TestResult(TestResultDataMock);

    when(mockFunction)
      .calledWith(LAB_ID)
      .mockReturnValue(TRACKING_IDS);
    when(mockFunction)
      .calledWith(TRACKING_ID)
      .mockReturnValue(EXPECTED_VALUE);

    // Assert
    expect(await queryDnaTestResultsByLab(API_PROMISE_MOCK as any, LAB_ID))
      .toEqual([EXPECTED_VALUE]);
    expect(mockFunction).toBeCalledTimes(2);
    expect(mockFunction).toBeCalledWith(LAB_ID);
    expect(dnaTestResultsByLabSpy).toBeCalledTimes(1);
    expect(dnaTestResultsByLabSpy).toBeCalledWith(LAB_ID);
    expect(dnaTestResultsSpy).toBeCalledTimes(1);
    expect(dnaTestResultsSpy).toBeCalledWith(TRACKING_ID);
  });

  it("queryDnaTestResultsByOwner should return", async () => {
    // Arrange
    const OWNER_ID = "OWNER_ID";
    const TRACKING_ID = "TRACKING_ID";
    const TRACKING_IDS = [ TRACKING_ID ];
    const EXPECTED_VALUE = new TestResult(TestResultDataMock);

    when(mockFunction)
      .calledWith(OWNER_ID)
      .mockReturnValue(TRACKING_IDS);
    when(mockFunction)
      .calledWith(TRACKING_ID)
      .mockReturnValue(EXPECTED_VALUE);

    // Assert
    expect(await queryDnaTestResultsByOwner(API_PROMISE_MOCK as any, OWNER_ID))
      .toEqual([EXPECTED_VALUE]);
    expect(mockFunction).toBeCalledTimes(2);
    expect(mockFunction).toBeCalledWith(OWNER_ID);
    expect(dnaTestResultsByOwnerSpy).toBeCalledTimes(1);
    expect(dnaTestResultsByOwnerSpy).toBeCalledWith(OWNER_ID);
    expect(dnaTestResultsSpy).toBeCalledTimes(1);
    expect(dnaTestResultsSpy).toBeCalledWith(TRACKING_ID);
  });

  it("queryStakedDataByAccountId should return", async () => {
    // Arrange
    const ACCOUNT_ID = "ACCOUNT_ID";
    const HASH_ID = "HASH_ID";
    const EXPECTED_VALUE = [ HASH_ID ];
    (mockFunction as jest.Mock).mockReturnValue(EXPECTED_VALUE);

    expect(await queryStakedDataByAccountId(API_PROMISE_MOCK as any, ACCOUNT_ID))
      .toEqual(EXPECTED_VALUE);
    expect(mockFunction).toBeCalledTimes(1);
    expect(mockFunction).toBeCalledWith(ACCOUNT_ID);
    expect(stakedDataByAccountIdSpy).toBeCalledTimes(1);
    expect(stakedDataByAccountIdSpy).toBeCalledWith(ACCOUNT_ID);
  });

  it("queryStakedDataByOrderId should return", async () => {
    // Arrange
    const ORDER_ID = "ORDER_ID";
    const HASH_ID = "HASH_ID";
    const EXPECTED_VALUE = [ HASH_ID ];
    (mockFunction as jest.Mock).mockReturnValue(EXPECTED_VALUE);

    expect(await queryStakedDataByOrderId(API_PROMISE_MOCK as any, ORDER_ID))
      .toEqual(EXPECTED_VALUE);
    expect(mockFunction).toBeCalledTimes(1);
    expect(mockFunction).toBeCalledWith(ORDER_ID);
    expect(stakedDataByOrderIdSpy).toBeCalledTimes(1);
    expect(stakedDataByOrderIdSpy).toBeCalledWith(ORDER_ID);
  });

  it("getDnaTestResultsDetailByLab should return", async () => {
    // Arrange
    const LAB_ID = "LAB_ID";
    const TRACKING_ID = "TRACKING_ID";
    const TRACKING_IDS = [ TRACKING_ID ];
    const TEST_RESULT = new TestResult(TestResultDataMock);
    (queryLabById as jest.Mock).mockReturnValue(labDataMock);
    (queryServiceById as jest.Mock).mockReturnValue(serviceDataMock);
    (queryOrderDetailByOrderID as jest.Mock).mockReturnValue(orderDataMock);
    const EXPECTED_RESULT = {
      ...orderDataMock,
      labName: labDataMock.info.name,
      serviceName: serviceDataMock.info.name,
    };

    when(mockFunction)
      .calledWith(LAB_ID)
      .mockReturnValue(TRACKING_IDS);
    when(mockFunction)
      .calledWith(TRACKING_ID)
      .mockReturnValue(TEST_RESULT);

    // Assert
    expect(await getDnaTestResultsDetailByLab(API_PROMISE_MOCK as any, LAB_ID))
      .toEqual([EXPECTED_RESULT]);
    expect(mockFunction).toBeCalledTimes(3);
    expect(mockFunction).toBeCalledWith(LAB_ID);
    expect(mockFunction).toBeCalledWith(TRACKING_ID);
    expect(mockFunction).toBeCalledWith(TestResultDataMock.trackingId);
    expect(queryLabById).toBeCalledTimes(1);
    expect(queryLabById).toBeCalledWith(API_PROMISE_MOCK, serviceDataMock.ownerId);
    expect(queryServiceById).toBeCalledTimes(1);
    expect(queryServiceById).toBeCalledWith(API_PROMISE_MOCK, orderDataMock.serviceId);
    expect(queryOrderDetailByOrderID).toBeCalledTimes(1);
    expect(queryOrderDetailByOrderID).toBeCalledWith(API_PROMISE_MOCK, TestResultDataMock.orderId);
    expect(dnaTestResultsByLabSpy).toBeCalledTimes(1);
    expect(dnaTestResultsByLabSpy).toBeCalledWith(LAB_ID);
    expect(dnaTestResultsSpy).toBeCalledTimes(1);
    expect(dnaTestResultsSpy).toBeCalledWith(TRACKING_ID);
  });
});