import { queryHospitalById, queryHospitalsByCountryRegionCity, queryHospitalCount, queryHospitalsCountByCountryRegionCity, queryHospitalsAdminKey } from "../../../../src/query/hospitals";
import { ApiPromise } from "../../@polkadot-api.mock";
import { mockFunction } from "../../mock";
import { hospitals } from "./hospitals.query.mock";
import { hospitalDataMock } from "../../models/hospitals/hospitals.mock";
import { Hospital } from "../../../../src/models/hospitals";
import { when } from 'jest-when';

jest.mock('../../mock', () => ({
  mockFunction: jest.fn(),
}));

describe('Hospital Queries Unit Tests', () => {
  const API_PROMISE_MOCK: ApiPromise = new ApiPromise();
  API_PROMISE_MOCK.query = {
    hospitals: hospitals
  };
  
  const hospitalsSpy = jest.spyOn(hospitals, 'hospitals');
  const hospitalsByCountryRegionCitySpy = jest.spyOn(hospitals, 'hospitalsByCountryRegionCity');
  const hospitalCountSpy = jest.spyOn(hospitals, 'hospitalCount');
  const hospitalCountByCountryRegionCitySpy = jest.spyOn(hospitals, 'hospitalCountByCountryRegionCity');
  const adminKeySpy = jest.spyOn(hospitals, 'adminKey');
  
  beforeEach(() => {
    (mockFunction as jest.Mock).mockClear();
    hospitalsSpy.mockClear();
    hospitalsByCountryRegionCitySpy.mockClear();
    hospitalCountSpy.mockClear();
    hospitalCountByCountryRegionCitySpy.mockClear();
    adminKeySpy.mockClear();
  });

  it('queryHospitalById should return', async () => {
    // Arrange
    const HOSPITAL_ID = "HOSPITAL_ID";
    const EXPECTED_VALUE = new Hospital(hospitalDataMock);
    (mockFunction as jest.Mock).mockReturnValue(hospitalDataMock);

    // Assert
    expect(await queryHospitalById(API_PROMISE_MOCK as any, HOSPITAL_ID))
      .toEqual(EXPECTED_VALUE);
    expect(mockFunction).toBeCalledTimes(1);
    expect(mockFunction).toBeCalledWith(HOSPITAL_ID);
    expect(hospitalsSpy).toBeCalledTimes(1);
    expect(hospitalsSpy).toBeCalledWith(HOSPITAL_ID);
  });

  it('queryHospitalsByCountryRegionCity should return', async () => {
    // Arrange
    const HOSPITAL_ID = "HOSPITAL_ID";
    const COUNTRY_ID = "COUNTRY_ID";
    const REGION_ID = "REGION_ID";
    const EXPECTED_VALUE = new Hospital(hospitalDataMock);

    when(mockFunction)
      .calledWith({COUNTRY_ID, REGION_ID})
      .mockReturnValue([
        HOSPITAL_ID
      ]);
    when(mockFunction)
      .calledWith(HOSPITAL_ID)
      .mockReturnValue(hospitalDataMock);

    // Assert
    expect(await queryHospitalsByCountryRegionCity(API_PROMISE_MOCK as any, COUNTRY_ID, REGION_ID))
      .toEqual([EXPECTED_VALUE]);
    expect(mockFunction).toBeCalledTimes(2);
    expect(mockFunction).toBeCalledWith({COUNTRY_ID, REGION_ID});
    expect(mockFunction).toBeCalledWith(HOSPITAL_ID);
    expect(hospitalsSpy).toBeCalledTimes(1);
    expect(hospitalsSpy).toBeCalledWith(HOSPITAL_ID);
    expect(hospitalsByCountryRegionCitySpy).toBeCalledTimes(1);
    expect(hospitalsByCountryRegionCitySpy).toBeCalledWith(COUNTRY_ID, REGION_ID);
  });

  it('queryHospitalCount should return', async () => {
      // Arrange
      const EXPECTED_VALUE = 0;
      (mockFunction as jest.Mock).mockReturnValue(EXPECTED_VALUE);

      // Assert
      expect(await queryHospitalCount(API_PROMISE_MOCK as any))
        .toEqual(EXPECTED_VALUE);
      expect(mockFunction).toBeCalledTimes(1);
      expect(hospitalCountSpy).toBeCalledTimes(1);
  });

  it('queryHospitalsCountByCountryRegionCity should return', async () => {
      // Arrange
    const COUNTRY_ID = "COUNTRY_ID";
    const REGION_ID = "REGION_ID";
      const EXPECTED_VALUE = 0;
      (mockFunction as jest.Mock).mockReturnValue(EXPECTED_VALUE);

      // Assert
      expect(await queryHospitalsCountByCountryRegionCity(API_PROMISE_MOCK as any, COUNTRY_ID, REGION_ID))
        .toEqual(EXPECTED_VALUE);
      expect(mockFunction).toBeCalledTimes(1);
      expect(hospitalCountByCountryRegionCitySpy).toBeCalledTimes(1);
      expect(hospitalCountByCountryRegionCitySpy).toBeCalledWith(COUNTRY_ID, REGION_ID);
  });
  
  it('queryHospitalsAdminKey should return', async () => {
    // Arrange
    const EXPECTED_VALUE = "VALUE";
    (mockFunction as jest.Mock).mockReturnValue(EXPECTED_VALUE);

    // Assert
    expect(await queryHospitalsAdminKey(API_PROMISE_MOCK as any))
      .toEqual(EXPECTED_VALUE);
    expect(mockFunction).toBeCalledTimes(1);
    expect(adminKeySpy).toBeCalledTimes(1);
  });
});