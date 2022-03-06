import { 
  queryElectronicMedicalRecordByOwnerId,
  queryElectronicMedicalRecordById,
  queryElectronicMedicalRecordFileById,
  queryElectronicMedicalRecordCountByOwner,
  queryElectronicMedicalRecordCount  
} from "../../../../src/query/electronic-medical-record";
import { electronicMedicalRecord } from "./electronic-medical-record.query.mock";
import { ApiPromise } from "../../@polkadot-api.mock";
import { mockFunction } from "../../mock";
import { ElectronicMedicalRecord, ElectronicMedicalRecordFile } from "../../../../src/models/electronic-medical-record";
import { electronicMedicalRecordDataMock } from "../../models/electronic-medical-record/electronic-medical-record.mock";
import { electronicMedicalRecordFileDataMock } from "../../models/electronic-medical-record/electronic-medical-record-file.mock";
import { when } from 'jest-when';

jest.mock('../../mock', () => ({
  mockFunction: jest.fn(),
}));

describe('Electronic Medical Record Unit Tests', () => {
  const API_PROMISE_MOCK: ApiPromise = new ApiPromise();
  API_PROMISE_MOCK.query = {
      electronicMedicalRecord: electronicMedicalRecord
  };

  const electronicMedicalRecordByOwnerIdSpy = jest.spyOn(electronicMedicalRecord, 'electronicMedicalRecordByOwnerId');
  const electronicMedicalRecordByIdSpy = jest.spyOn(electronicMedicalRecord, 'electronicMedicalRecordById');
  const electronicMedicalRecordFileByIdSpy = jest.spyOn(electronicMedicalRecord, 'electronicMedicalRecordFileById');
  const electronicMedicalRecordCountByOwnerSpy = jest.spyOn(electronicMedicalRecord, 'electronicMedicalRecordCountByOwner');
  const electronicMedicalRecordCountSpy = jest.spyOn(electronicMedicalRecord, 'electronicMedicalRecordCount');
  
  beforeEach(() => {
    (mockFunction as jest.Mock).mockClear();
    electronicMedicalRecordByOwnerIdSpy.mockClear();
    electronicMedicalRecordByIdSpy.mockClear();
    electronicMedicalRecordFileByIdSpy.mockClear();
    electronicMedicalRecordCountByOwnerSpy.mockClear();
    electronicMedicalRecordCountSpy.mockClear();
  });

  it('queryElectronicMedicalRecordByOwnerId should return', async () => {
    // Arrange
    const EMR_ID = "EMR_ID";
    const OWNER_ID = "OWNER_ID";
    const EXPECTED_VALUE = new ElectronicMedicalRecord(electronicMedicalRecordDataMock);

    when(mockFunction)
      .calledWith(OWNER_ID)
      .mockReturnValue([
        EMR_ID
      ]);
    when(mockFunction)
      .calledWith(EMR_ID)
      .mockReturnValue(electronicMedicalRecordDataMock);

    // Assert
    expect(await queryElectronicMedicalRecordByOwnerId(API_PROMISE_MOCK as any, OWNER_ID))
      .toEqual([EXPECTED_VALUE]);
    expect(mockFunction).toBeCalledTimes(2);
    expect(mockFunction).toBeCalledWith(OWNER_ID);
    expect(mockFunction).toBeCalledWith(EMR_ID);
    expect(electronicMedicalRecordByIdSpy).toBeCalledTimes(1);
    expect(electronicMedicalRecordByIdSpy).toBeCalledWith(EMR_ID);
    expect(electronicMedicalRecordByOwnerIdSpy).toBeCalledTimes(1);
    expect(electronicMedicalRecordByOwnerIdSpy).toBeCalledWith(OWNER_ID);
  });

  it('queryElectronicMedicalRecordById should return', async () => {
    // Arrange
    const EMR_ID = "EMR_ID";
    const EXPECTED_VALUE = new ElectronicMedicalRecord(electronicMedicalRecordDataMock);
    (mockFunction as jest.Mock).mockReturnValue(electronicMedicalRecordDataMock);

    // Assert
    expect(await queryElectronicMedicalRecordById(API_PROMISE_MOCK as any, EMR_ID))
      .toEqual(EXPECTED_VALUE);
    expect(mockFunction).toBeCalledTimes(1);
    expect(mockFunction).toBeCalledWith(EMR_ID);
    expect(electronicMedicalRecordByIdSpy).toBeCalledTimes(1);
    expect(electronicMedicalRecordByIdSpy).toBeCalledWith(EMR_ID);
  });

  it('queryElectronicMedicalRecordFileById should return', async () => {
    // Arrange
    const EMR_FILE_ID = "EMR_FILE_ID";
    const EXPECTED_VALUE = new ElectronicMedicalRecordFile(electronicMedicalRecordFileDataMock);
    (mockFunction as jest.Mock).mockReturnValue(electronicMedicalRecordFileDataMock);

    // Assert
    expect(await queryElectronicMedicalRecordFileById(API_PROMISE_MOCK as any, EMR_FILE_ID))
      .toEqual(EXPECTED_VALUE);
    expect(mockFunction).toBeCalledTimes(1);
    expect(mockFunction).toBeCalledWith(EMR_FILE_ID);
    expect(electronicMedicalRecordFileByIdSpy).toBeCalledTimes(1);
    expect(electronicMedicalRecordFileByIdSpy).toBeCalledWith(EMR_FILE_ID);
  });

  it('queryElectronicMedicalRecordCountByOwner should return', async () => {
    // Arrange
    const OWNER_ID = "OWNER_ID";
    const EXPECTED_VALUE = 0;
    (mockFunction as jest.Mock).mockReturnValue(EXPECTED_VALUE);

    // Assert
    expect(await queryElectronicMedicalRecordCountByOwner(API_PROMISE_MOCK as any, OWNER_ID))
      .toEqual(EXPECTED_VALUE);
    expect(mockFunction).toBeCalledTimes(1);
    expect(mockFunction).toBeCalledWith(OWNER_ID);
    expect(electronicMedicalRecordCountByOwnerSpy).toBeCalledTimes(1);
    expect(electronicMedicalRecordCountByOwnerSpy).toBeCalledWith(OWNER_ID);
  });

  it('queryElectronicMedicalRecordCount should return', async () => {
    // Arrange
    const EXPECTED_VALUE = 0;
    (mockFunction as jest.Mock).mockReturnValue(EXPECTED_VALUE);

    // Assert
    expect(await queryElectronicMedicalRecordCount(API_PROMISE_MOCK as any))
      .toEqual(EXPECTED_VALUE);
    expect(mockFunction).toBeCalledTimes(1);
    expect(electronicMedicalRecordCountSpy).toBeCalledTimes(1);
  });
});
