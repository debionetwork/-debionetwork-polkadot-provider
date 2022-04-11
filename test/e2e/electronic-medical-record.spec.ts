import { ApiPromise } from '@polkadot/api';
import 'regenerator-runtime/runtime';
import { queryElectronicMedicalRecordByOwnerId, queryElectronicMedicalRecordById, queryElectronicMedicalRecordFileById, queryElectronicMedicalRecordCountByOwner, queryElectronicMedicalRecordCount } from '../../src/query/electronic-medical-record';
import { registerElectronicMedicalRecord, updateElectronicMedicalRecord, deregisterElectronicMedicalRecord, registerElectronicMedicalRecordFee, deregisterElectronicMedicalRecordFee } from "../../src/command/electronic-medical-record";
import { initializeApi } from './polkadot-init';
import { electronicMedicalRecordInputDataMock } from '../unit/models/electronic-medical-record/electronic-medical-record.mock';
import { ElectronicMedicalRecord } from '../../src/models/electronic-medical-record';
import { ElectronicMedicalRecordInput } from '../../src/models/electronic-medical-record/electronic-medical-record-input';

describe('ElectronicMedicalRecord Pallet Integration Tests', () => {
  let api: ApiPromise;
  let pair: any;

  beforeAll(async () => {
    const { api: _api, pair: _pair } = await initializeApi();
    api = _api;
    pair = _pair;
  });

  afterAll(() => {
    api.disconnect();
  });

  it('registerElectronicMedicalRecord should return', async () => {
    const promise: Promise<ElectronicMedicalRecord[]> = new Promise((resolve, reject) => { // eslint-disable-line
      registerElectronicMedicalRecord(api, pair, new ElectronicMedicalRecordInput(electronicMedicalRecordInputDataMock), () => {
        queryElectronicMedicalRecordByOwnerId(api, pair.address)
          .then((res) => {
            resolve(res)
          });
      });
    });

    const result = await promise;
    expect(result[0].title).toEqual(electronicMedicalRecordInputDataMock.title);
    expect(result[0].category).toEqual(electronicMedicalRecordInputDataMock.category);
  });

  it('queryElectronicMedicalRecordById should return', async () => {
    const emrByOwner = await queryElectronicMedicalRecordByOwnerId(api, pair.address);
    const emrById = await queryElectronicMedicalRecordById(api, emrByOwner[0].id);

    expect(emrByOwner[0]).toEqual(emrById);
  });

  it('queryElectronicMedicalRecordFileById should return', async () => {
    const emrByOwner = await queryElectronicMedicalRecordByOwnerId(api, pair.address);
    const emrFileById = await queryElectronicMedicalRecordFileById(api, emrByOwner[0].files[0]);

    expect(emrFileById.id).toEqual(emrByOwner[0].files[0]);
    expect(emrFileById.electronicMedicalRecordId).toEqual(emrByOwner[0].id);
    expect(emrFileById.title).toEqual(electronicMedicalRecordInputDataMock.files[0].title);
    expect(emrFileById.description).toEqual(electronicMedicalRecordInputDataMock.files[0].description);
    expect(emrFileById.recordLink).toEqual(electronicMedicalRecordInputDataMock.files[0].title);
  });

  it('queryElectronicMedicalRecordCountByOwner should return', async () => {
    expect(await queryElectronicMedicalRecordCountByOwner(api, pair.address)).toEqual(1);
  });

  it('queryElectronicMedicalRecordCount should return', async () => {
    expect(await queryElectronicMedicalRecordCount(api)).toEqual(1);
  });

  it('updateElectronicMedicalRecord should return', async () => {
    const emrByOwner = await queryElectronicMedicalRecordByOwnerId(api, pair.address);
    const emrFileById = await queryElectronicMedicalRecordFileById(api, emrByOwner[0].files[0]);

    const emr = new ElectronicMedicalRecordInput({
      ...emrByOwner[0],
      files: [emrFileById]
    });
    const promise: Promise<ElectronicMedicalRecord[]> = new Promise((resolve, reject) => { // eslint-disable-line
      updateElectronicMedicalRecord(api, pair, emr, () => {
        queryElectronicMedicalRecordByOwnerId(api, pair.address)
          .then((res) => {
            resolve(res)
          });
      });
    });

    const result = await promise;
    expect(result[0].title).toEqual(electronicMedicalRecordInputDataMock.title);
    expect(result[0].category).toEqual(electronicMedicalRecordInputDataMock.category);
  });

  it('registerElectronicMedicalRecordFee should return', async () => {
    await registerElectronicMedicalRecordFee(api, pair, new ElectronicMedicalRecordInput(electronicMedicalRecordInputDataMock));
  });

  it('deregisterElectronicMedicalRecordFee should return', async () => {
    const emrByOwner = await queryElectronicMedicalRecordByOwnerId(api, pair.address);
    await deregisterElectronicMedicalRecordFee(api, pair, emrByOwner[0].id);
  });

  it('deregisterElectronicMedicalRecord should return', async () => {
    const emrByOwner = await queryElectronicMedicalRecordByOwnerId(api, pair.address);
    const promise: Promise<number> = new Promise((resolve, reject) => { // eslint-disable-line
      deregisterElectronicMedicalRecord(api, pair, emrByOwner[0].id, () => {
        queryElectronicMedicalRecordCount(api)
          .then((res) => {
            resolve(res)
          });
      });
    });

    expect(await promise).toEqual(0);
  });
});
