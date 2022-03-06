import { queryDoctorById, queryDoctorsByCountryRegionCity, queryDoctorCount, queryDoctorsCountByCountryRegionCity, queryDoctorsAdminKey } from "../../../../src/query/doctors";
import { ApiPromise } from "../../@polkadot-api.mock";
import { mockFunction } from "../../mock";
import { doctors } from "./doctors.query.mock";
import { doctorDataMock } from "../../models/doctors/doctors.mock";
import { Doctor } from "../../../../src/models/doctors";
import { when } from 'jest-when';

jest.mock('../../mock', () => ({
  mockFunction: jest.fn(),
}));

describe('Doctor Queries Unit Tests', () => {
  const API_PROMISE_MOCK: ApiPromise = new ApiPromise();
  API_PROMISE_MOCK.query = {
    doctors: doctors
  };
  
  const doctorsSpy = jest.spyOn(doctors, 'doctors');
  const doctorsByCountryRegionCitySpy = jest.spyOn(doctors, 'doctorsByCountryRegionCity');
  const doctorCountSpy = jest.spyOn(doctors, 'doctorCount');
  const doctorCountByCountryRegionCitySpy = jest.spyOn(doctors, 'doctorCountByCountryRegionCity');
  const adminKeySpy = jest.spyOn(doctors, 'adminKey');
  
  beforeEach(() => {
    (mockFunction as jest.Mock).mockClear();
    doctorsSpy.mockClear();
    doctorsByCountryRegionCitySpy.mockClear();
    doctorCountSpy.mockClear();
    doctorCountByCountryRegionCitySpy.mockClear();
    adminKeySpy.mockClear();
  });

  it('queryDoctorById should return', async () => {
    // Arrange
    const LAB_ID = "LAB_ID";
    const EXPECTED_VALUE = new Doctor(doctorDataMock);
    (mockFunction as jest.Mock).mockReturnValue(doctorDataMock);

    // Assert
    expect(await queryDoctorById(API_PROMISE_MOCK as any, LAB_ID))
      .toEqual(EXPECTED_VALUE);
    expect(mockFunction).toBeCalledTimes(1);
    expect(mockFunction).toBeCalledWith(LAB_ID);
    expect(doctorsSpy).toBeCalledTimes(1);
    expect(doctorsSpy).toBeCalledWith(LAB_ID);
  });

  it('queryDoctorsByCountryRegionCity should return', async () => {
    // Arrange
    const LAB_ID = "LAB_ID";
    const COUNTRY_ID = "COUNTRY_ID";
    const REGION_ID = "REGION_ID";
    const EXPECTED_VALUE = new Doctor(doctorDataMock);

    when(mockFunction)
      .calledWith({COUNTRY_ID, REGION_ID})
      .mockReturnValue([
        LAB_ID
      ]);
    when(mockFunction)
      .calledWith(LAB_ID)
      .mockReturnValue(doctorDataMock);

    // Assert
    expect(await queryDoctorsByCountryRegionCity(API_PROMISE_MOCK as any, COUNTRY_ID, REGION_ID))
      .toEqual([EXPECTED_VALUE]);
    expect(mockFunction).toBeCalledTimes(2);
    expect(mockFunction).toBeCalledWith({COUNTRY_ID, REGION_ID});
    expect(mockFunction).toBeCalledWith(LAB_ID);
    expect(doctorsSpy).toBeCalledTimes(1);
    expect(doctorsSpy).toBeCalledWith(LAB_ID);
    expect(doctorsByCountryRegionCitySpy).toBeCalledTimes(1);
    expect(doctorsByCountryRegionCitySpy).toBeCalledWith(COUNTRY_ID, REGION_ID);
  });

  it('queryDoctorCount should return', async () => {
      // Arrange
      const EXPECTED_VALUE = 0;
      (mockFunction as jest.Mock).mockReturnValue(EXPECTED_VALUE);

      // Assert
      expect(await queryDoctorCount(API_PROMISE_MOCK as any))
        .toEqual(EXPECTED_VALUE);
      expect(mockFunction).toBeCalledTimes(1);
      expect(doctorCountSpy).toBeCalledTimes(1);
  });

  it('queryDoctorsCountByCountryRegionCity should return', async () => {
      // Arrange
    const COUNTRY_ID = "COUNTRY_ID";
    const REGION_ID = "REGION_ID";
      const EXPECTED_VALUE = 0;
      (mockFunction as jest.Mock).mockReturnValue(EXPECTED_VALUE);

      // Assert
      expect(await queryDoctorsCountByCountryRegionCity(API_PROMISE_MOCK as any, COUNTRY_ID, REGION_ID))
        .toEqual(EXPECTED_VALUE);
      expect(mockFunction).toBeCalledTimes(1);
      expect(doctorCountByCountryRegionCitySpy).toBeCalledTimes(1);
      expect(doctorCountByCountryRegionCitySpy).toBeCalledWith(COUNTRY_ID, REGION_ID);
  });
  
  it('queryDoctorsAdminKey should return', async () => {
    // Arrange
    const EXPECTED_VALUE = "VALUE";
    (mockFunction as jest.Mock).mockReturnValue(EXPECTED_VALUE);

    // Assert
    expect(await queryDoctorsAdminKey(API_PROMISE_MOCK as any))
      .toEqual(EXPECTED_VALUE);
    expect(mockFunction).toBeCalledTimes(1);
    expect(adminKeySpy).toBeCalledTimes(1);
  });
});