import { queryGeneticAnalystQualificationsByHashId, queryGeneticAnalystQualificationsCount, queryGeneticAnalystQualificationsCountByOwner } from "../../../../../src/query/genetic-analysts/genetic-analyst-qualification";
import { ApiPromise } from "../../../@polkadot-api.mock";
import { geneticAnalystQualifications } from "./genetic-analyst-qualifications.mock";
import { mockFunction } from "../../../mock";
import { GeneticAnalystQualification } from "../../../../../src/models/genetic-analysts/genetic-analyst-qualification";
import { geneticAnalystQualificationsDataMock } from "../../../models/genetic-analysts/genetic-analyst-qualifications.mock";
import { when } from 'jest-when';

jest.mock('../../../mock', () => ({
  mockFunction: jest.fn(),
}));

describe('Genetic Analyst Service Qualifications Queries Unit Tests', () => {
  const API_PROMISE_MOCK: ApiPromise = new ApiPromise();
  API_PROMISE_MOCK.query = {
    geneticAnalystQualifications: geneticAnalystQualifications
  };

  const geneticAnalystQualificationsSpy = jest.spyOn(geneticAnalystQualifications, "geneticAnalystQualifications");
  const geneticAnalystQualificationsCountSpy = jest.spyOn(geneticAnalystQualifications, "geneticAnalystQualificationsCount");
  const geneticAnalystQualificationsCountByOwnerSpy = jest.spyOn(geneticAnalystQualifications, "geneticAnalystQualificationsCountByOwner");

  beforeEach(() => {
    (mockFunction as jest.Mock).mockClear();
    geneticAnalystQualificationsSpy.mockClear();
    geneticAnalystQualificationsCountSpy.mockClear();
    geneticAnalystQualificationsCountByOwnerSpy.mockClear();
  });

  it("queryGeneticAnalystQualificationsByHashId should return", async () => {
    // Arrange
    const HASH_ID = "HASH_ID";
    const EXPECTED_VALUE = new GeneticAnalystQualification(geneticAnalystQualificationsDataMock);

    (mockFunction as jest.Mock).mockReturnValue(geneticAnalystQualificationsDataMock);

    // Assert
    expect(await queryGeneticAnalystQualificationsByHashId(API_PROMISE_MOCK as any, HASH_ID))
      .toEqual(EXPECTED_VALUE);

    expect(mockFunction).toBeCalledTimes(1);
    expect(mockFunction).toBeCalledWith(HASH_ID);
    expect(geneticAnalystQualificationsSpy).toBeCalledTimes(1);
    expect(geneticAnalystQualificationsSpy).toBeCalledWith(HASH_ID);
  });

  it("queryGeneticAnalystQualificationsCount should return", async () => {
    // Arrange
    const EXPECTED_VALUE = 0;
    (mockFunction as jest.Mock).mockReturnValue(EXPECTED_VALUE);

    // Assert
    expect(await queryGeneticAnalystQualificationsCount(API_PROMISE_MOCK as any))
      .toEqual(EXPECTED_VALUE);
    expect(mockFunction).toBeCalledTimes(1);
    expect(geneticAnalystQualificationsCountSpy).toBeCalledTimes(1);
  });

  it("queryGeneticAnalystQualificationsCountByOwner should return", async () => {
    // Arrange
    const OWNER_ID = "OWNER_ID";
    const EXPECTED_VALUE = 0;
    (mockFunction as jest.Mock).mockReturnValue(EXPECTED_VALUE);

    // Assert
    expect(await queryGeneticAnalystQualificationsCountByOwner(API_PROMISE_MOCK as any, OWNER_ID))
      .toEqual(EXPECTED_VALUE);

    expect(mockFunction).toBeCalledTimes(1);
    expect(mockFunction).toBeCalledWith(OWNER_ID);
    expect(geneticAnalystQualificationsCountByOwnerSpy).toBeCalledTimes(1);
    expect(geneticAnalystQualificationsCountByOwnerSpy).toBeCalledWith(OWNER_ID);
  });
});