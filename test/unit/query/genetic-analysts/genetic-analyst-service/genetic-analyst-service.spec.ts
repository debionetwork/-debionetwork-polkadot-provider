import { queryGeneticAnalystServicesByHashId, queryGeneticAnalystServicesCount, queryGeneticAnalystServicesCountByOwner } from "../../../../../src/query/genetic-analysts/genetic-analyst-service";
import { ApiPromise } from "../../../@polkadot-api.mock";
import { geneticAnalystServices } from "./genetic-analyst-service.mock";
import { mockFunction } from "../../../mock";
import { GeneticAnalystService } from "../../../../../src/models/genetic-analysts/genetic-analyst-service";
import { geneticAnalystServiceDataMock } from "../../../models/genetic-analysts/genetic-analyst-service.mock";
import { when } from 'jest-when';

jest.mock('../../../mock', () => ({
  mockFunction: jest.fn(),
}));

describe('Genetic Analyst Service Qualifications Queries Unit Tests', () => {
  const API_PROMISE_MOCK: ApiPromise = new ApiPromise();
  API_PROMISE_MOCK.query = {
    geneticAnalystServices: geneticAnalystServices
  };

  const geneticAnalystServicesSpy = jest.spyOn(geneticAnalystServices, "geneticAnalystServices");
  const geneticAnalystServicesCountSpy = jest.spyOn(geneticAnalystServices, "geneticAnalystServicesCount");
  const geneticAnalystServicesCountByOwnerSpy = jest.spyOn(geneticAnalystServices, "geneticAnalystServicesCountByOwner");

  beforeEach(() => {
    (mockFunction as jest.Mock).mockClear();
    geneticAnalystServicesSpy.mockClear();
    geneticAnalystServicesCountSpy.mockClear();
    geneticAnalystServicesCountByOwnerSpy.mockClear();
  });

  it("queryGeneticAnalystServicesByHashId should return", async () => {
    // Arrange
    const HASH_ID = "HASH_ID";
    const EXPECTED_VALUE = new GeneticAnalystService(geneticAnalystServiceDataMock);

    (mockFunction as jest.Mock).mockReturnValue(geneticAnalystServiceDataMock);

    // Assert
    expect(await queryGeneticAnalystServicesByHashId(API_PROMISE_MOCK as any, HASH_ID))
      .toEqual(EXPECTED_VALUE);

    expect(mockFunction).toBeCalledTimes(1);
    expect(mockFunction).toBeCalledWith(HASH_ID);
    expect(geneticAnalystServicesSpy).toBeCalledTimes(1);
    expect(geneticAnalystServicesSpy).toBeCalledWith(HASH_ID);
  });

  it("queryGeneticAnalystServicesCount should return", async () => {
    // Arrange
    const EXPECTED_VALUE = 0;
    (mockFunction as jest.Mock).mockReturnValue(EXPECTED_VALUE);

    // Assert
    expect(await queryGeneticAnalystServicesCount(API_PROMISE_MOCK as any))
      .toEqual(EXPECTED_VALUE);
    expect(mockFunction).toBeCalledTimes(1);
    expect(geneticAnalystServicesCountSpy).toBeCalledTimes(1);
  });

  it("queryGeneticAnalystServicesCountByOwner should return", async () => {
    // Arrange
    const OWNER_ID = "OWNER_ID";
    const EXPECTED_VALUE = 0;
    (mockFunction as jest.Mock).mockReturnValue(EXPECTED_VALUE);

    // Assert
    expect(await queryGeneticAnalystServicesCountByOwner(API_PROMISE_MOCK as any, OWNER_ID))
      .toEqual(EXPECTED_VALUE);

    expect(mockFunction).toBeCalledTimes(1);
    expect(mockFunction).toBeCalledWith(OWNER_ID);
    expect(geneticAnalystServicesCountByOwnerSpy).toBeCalledTimes(1);
    expect(geneticAnalystServicesCountByOwnerSpy).toBeCalledWith(OWNER_ID);
  });
});