import { queryLabById, queryLabsByCountryRegionCity, queryLabCount, queryLabsCountByCountryRegionCity, queryLabsAdminKey } from "../../../../src/query/labs";
import { ApiPromise } from "../../@polkadot-api.mock";
import { mockFunction } from "../../mock";
import { labs } from "./labs.query.mock";
import { labDataMock } from "../../models/labs/labs.mock";
import { Lab } from "../../../../src/models/labs";
import { when } from 'jest-when';

jest.mock('../../mock', () => ({
  mockFunction: jest.fn(),
}));

describe('Lab Queries Unit Tests', () => {
  const API_PROMISE_MOCK: ApiPromise = new ApiPromise();
  API_PROMISE_MOCK.query = {
    labs: labs
  };
  
  const labsSpy = jest.spyOn(labs, 'labs');
  const labsByCountryRegionCitySpy = jest.spyOn(labs, 'labsByCountryRegionCity');
  const labCountSpy = jest.spyOn(labs, 'labCount');
  const labCountByCountryRegionCitySpy = jest.spyOn(labs, 'labCountByCountryRegionCity');
  const labVerifierKeySpy = jest.spyOn(labs, 'labVerifierKey');
  const palletIdSpy = jest.spyOn(labs, 'palletId');
  const totalStakedAmountSpy = jest.spyOn(labs, 'totalStakedAmount');
  const minimumStakeAmountSpy = jest.spyOn(labs, 'minimumStakeAmount');
  
  beforeEach(() => {
    (mockFunction as jest.Mock).mockClear();
    labsSpy.mockClear();
    labsByCountryRegionCitySpy.mockClear();
    labCountSpy.mockClear();
    labCountByCountryRegionCitySpy.mockClear();
    labVerifierKeySpy.mockClear();
    palletIdSpy.mockClear();
    totalStakedAmountSpy.mockClear();
    minimumStakeAmountSpy.mockClear();
  });

  it('queryLabById should return', async () => {
    // Arrange
    const LAB_ID = "LAB_ID";
    const EXPECTED_VALUE = new Lab(labDataMock);
    (mockFunction as jest.Mock).mockReturnValue(labDataMock);

    // Assert
    expect(await queryLabById(API_PROMISE_MOCK as any, LAB_ID))
      .toEqual(EXPECTED_VALUE);
    expect(mockFunction).toBeCalledTimes(1);
    expect(mockFunction).toBeCalledWith(LAB_ID);
    expect(labsSpy).toBeCalledTimes(1);
    expect(labsSpy).toBeCalledWith(LAB_ID);
  });

  it('queryLabsByCountryRegionCity should return', async () => {
    // Arrange
    const LAB_ID = "LAB_ID";
    const COUNTRY_ID = "COUNTRY_ID";
    const REGION_ID = "REGION_ID";
    const EXPECTED_VALUE = new Lab(labDataMock);

    when(mockFunction)
      .calledWith({COUNTRY_ID, REGION_ID})
      .mockReturnValue([
        LAB_ID
      ]);
    when(mockFunction)
      .calledWith(LAB_ID)
      .mockReturnValue(labDataMock);

    // Assert
    expect(await queryLabsByCountryRegionCity(API_PROMISE_MOCK as any, COUNTRY_ID, REGION_ID))
      .toEqual([EXPECTED_VALUE]);
    expect(mockFunction).toBeCalledTimes(2);
    expect(mockFunction).toBeCalledWith({COUNTRY_ID, REGION_ID});
    expect(mockFunction).toBeCalledWith(LAB_ID);
    expect(labsSpy).toBeCalledTimes(1);
    expect(labsSpy).toBeCalledWith(LAB_ID);
    expect(labsByCountryRegionCitySpy).toBeCalledTimes(1);
    expect(labsByCountryRegionCitySpy).toBeCalledWith(COUNTRY_ID, REGION_ID);
  });

  it('queryLabCount should return', async () => {
      // Arrange
      const EXPECTED_VALUE = 0;
      (mockFunction as jest.Mock).mockReturnValue(EXPECTED_VALUE);

      // Assert
      expect(await queryLabCount(API_PROMISE_MOCK as any))
        .toEqual(EXPECTED_VALUE);
      expect(mockFunction).toBeCalledTimes(1);
      expect(labCountSpy).toBeCalledTimes(1);
  });

  it('queryLabsCountByCountryRegionCity should return', async () => {
      // Arrange
    const COUNTRY_ID = "COUNTRY_ID";
    const REGION_ID = "REGION_ID";
      const EXPECTED_VALUE = 0;
      (mockFunction as jest.Mock).mockReturnValue(EXPECTED_VALUE);

      // Assert
      expect(await queryLabsCountByCountryRegionCity(API_PROMISE_MOCK as any, COUNTRY_ID, REGION_ID))
        .toEqual(EXPECTED_VALUE);
      expect(mockFunction).toBeCalledTimes(1);
      expect(labCountByCountryRegionCitySpy).toBeCalledTimes(1);
      expect(labCountByCountryRegionCitySpy).toBeCalledWith(COUNTRY_ID, REGION_ID);
  });
  
  it('queryLabsAdminKey should return', async () => {
    // Arrange
    const EXPECTED_VALUE = "VALUE";
    (mockFunction as jest.Mock).mockReturnValue(EXPECTED_VALUE);

    // Assert
    expect(await queryLabsAdminKey(API_PROMISE_MOCK as any))
      .toEqual(EXPECTED_VALUE);
    expect(mockFunction).toBeCalledTimes(1);
    expect(labVerifierKeySpy).toBeCalledTimes(1);
  });
});