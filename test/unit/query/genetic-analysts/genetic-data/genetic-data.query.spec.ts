import { 
  queryGeneticDataById,
  queryGeneticDataByOwnerId,
  queryGeneticDataCount,
  queryGeneticDataCountByOwner
} from "../../../../../src/query/genetic-analysts/genetic-data";
import { geneticData } from "./genetic-data.query.mock";
import { ApiPromise } from "../../../@polkadot-api.mock";
import { mockFunction } from "../../../mock";
import { GeneticData } from "../../../../../src/models/genetic-analysts/genetic-data";
import { when } from 'jest-when';
import { geneticDataMock } from "../../../models/genetic-analysts/genetic-data.mock";

jest.mock('../../../mock', () => ({
  mockFunction: jest.fn(),
}));

describe('Electronic Medical Record Unit Tests', () => {
  const API_PROMISE_MOCK: ApiPromise = new ApiPromise();
  API_PROMISE_MOCK.query = {
      geneticData: geneticData
  };

  const geneticDataByIdSpy = jest.spyOn(geneticData, 'geneticDataById');
  const geneticDataByOwnerIdSpy = jest.spyOn(geneticData, 'geneticDataByOwnerId');
  const geneticDataCountByOwnerSpy = jest.spyOn(geneticData, 'geneticDataCountByOwner');
  const geneticDataCountSpy = jest.spyOn(geneticData, 'geneticDataCount');
  
  beforeEach(() => {
    (mockFunction as jest.Mock).mockClear();
    geneticDataByIdSpy.mockClear();
    geneticDataByOwnerIdSpy.mockClear();
    geneticDataCountByOwnerSpy.mockClear();
    geneticDataCountSpy.mockClear();
  });

  it('queryGeneticDataByOwnerId should return', async () => {
    // Arrange
    const DATA_ID = "DATA_ID";
    const OWNER_ID = "OWNER_ID";
    const EXPECTED_VALUE = new GeneticData(geneticDataMock);

    when(mockFunction)
      .calledWith(OWNER_ID)
      .mockReturnValue([
        DATA_ID
      ]);
    when(mockFunction)
      .calledWith(DATA_ID)
      .mockReturnValue(geneticDataMock);

    // Assert
    expect(await queryGeneticDataByOwnerId(API_PROMISE_MOCK as any, OWNER_ID))
      .toEqual([EXPECTED_VALUE]);
    expect(mockFunction).toBeCalledTimes(2);
    expect(mockFunction).toBeCalledWith(OWNER_ID);
    expect(mockFunction).toBeCalledWith(DATA_ID);
    expect(geneticDataByIdSpy).toBeCalledTimes(1);
    expect(geneticDataByIdSpy).toBeCalledWith(DATA_ID);
    expect(geneticDataByOwnerIdSpy).toBeCalledTimes(1);
    expect(geneticDataByOwnerIdSpy).toBeCalledWith(OWNER_ID);
  });

  it('queryGeneticDataById should return', async () => {
    // Arrange
    const DATA_ID = "DATA_ID";
    const EXPECTED_VALUE = new GeneticData(geneticDataMock);
    (mockFunction as jest.Mock).mockReturnValue(geneticDataMock);

    // Assert
    expect(await queryGeneticDataById(API_PROMISE_MOCK as any, DATA_ID))
      .toEqual(EXPECTED_VALUE);
    expect(mockFunction).toBeCalledTimes(1);
    expect(mockFunction).toBeCalledWith(DATA_ID);
    expect(geneticDataByIdSpy).toBeCalledTimes(1);
    expect(geneticDataByIdSpy).toBeCalledWith(DATA_ID);
  });

  it('queryGeneticDataCountByOwner should return', async () => {
    // Arrange
    const OWNER_ID = "OWNER_ID";
    const EXPECTED_VALUE = 0;
    (mockFunction as jest.Mock).mockReturnValue(EXPECTED_VALUE);

    // Assert
    expect(await queryGeneticDataCountByOwner(API_PROMISE_MOCK as any, OWNER_ID))
      .toEqual(EXPECTED_VALUE);
    expect(mockFunction).toBeCalledTimes(1);
    expect(mockFunction).toBeCalledWith(OWNER_ID);
    expect(geneticDataCountByOwnerSpy).toBeCalledTimes(1);
    expect(geneticDataCountByOwnerSpy).toBeCalledWith(OWNER_ID);
  });

  it('queryGeneticDataCount should return', async () => {
    // Arrange
    const EXPECTED_VALUE = 0;
    (mockFunction as jest.Mock).mockReturnValue(EXPECTED_VALUE);

    // Assert
    expect(await queryGeneticDataCount(API_PROMISE_MOCK as any))
      .toEqual(EXPECTED_VALUE);
    expect(mockFunction).toBeCalledTimes(1);
    expect(geneticDataCountSpy).toBeCalledTimes(1);
  });
});
