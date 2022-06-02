import { ApiPromise } from '@polkadot/api';
import 'regenerator-runtime/runtime';
import { queryHospitalCertificationById, queryHospitalCertificationsByMultipleIds } from '../../../src/query/hospitals/certifications';
import { createHospitalCertification, createHospitalCertificationFee, updateHospitalCertification, updateHospitalCertificationFee, deleteHospitalCertification, deleteHospitalCertificationFee } from "../../../src/command/hospitals/certifications";
import { initializeApi } from '../polkadot-init';
import { queryHospitalById } from '../../../src/query/hospitals';
import { Hospital } from '../../../src/models/hospitals';
import { deregisterHospital, registerHospital } from "../../../src/command/hospitals";
import { hospitalDataMock } from '../../unit/models/hospitals/hospitals.mock';
import { HospitalCertification } from '../../../src/models/hospitals/certifications';
import { hospitalCertificationDataMock } from '../../unit/models/hospitals/certifications.mock';

describe('HospitalCertifications Pallet Integration Tests', () => {
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

  it('createHospitalCertification should return', async () => {
    const hospitalPromise: Promise<Hospital> = new Promise((resolve, reject) => { // eslint-disable-line
      registerHospital(api, pair, hospitalDataMock.info, () => {
        queryHospitalById(api, pair.address)
          .then((res) => {
            resolve(res)
          });
      });
    });

    expect((await hospitalPromise).info).toEqual(hospitalDataMock.info);

    const promise: Promise<HospitalCertification[]> = new Promise((resolve, reject) => { // eslint-disable-line
      createHospitalCertification(api, pair, hospitalCertificationDataMock.info, () => {
        queryHospitalById(api, pair.address)
          .then((hospital) => {
            queryHospitalCertificationsByMultipleIds(api, hospital.certifications)
              .then((res) => {
                resolve(res)
              });
          });
      });
    });

    expect((await promise)[0].info).toEqual(hospitalCertificationDataMock.info);
  });

  it('createHospitalCertificationFee should return', async () => {
    expect(await createHospitalCertificationFee(api, pair, hospitalCertificationDataMock.info)).toHaveProperty('partialFee')
  })


  it('updateHospitalCertification should return', async () => {
    const hospital = await queryHospitalById(api, pair.address);

    const promise: Promise<HospitalCertification> = new Promise((resolve, reject) => { // eslint-disable-line
      updateHospitalCertification(api, pair, hospital.certifications[0], hospitalCertificationDataMock.info, () => {
        queryHospitalCertificationById(api, hospital.certifications[0])
          .then((res) => {
            resolve(res)
          });
      });
    });

    expect((await promise).info).toEqual(hospitalCertificationDataMock.info);
  });

  it('updateHospitalCertificationFee should return', async () => {
    const hospital = await queryHospitalById(api, pair.address);
    expect(await updateHospitalCertificationFee(api, pair, hospital.certifications[0], hospitalCertificationDataMock.info)).toHaveProperty('partialFee')
  })

  it('deleteHospitalCertificationFee should return', async () => {
    const hospital = await queryHospitalById(api, pair.address)
    expect(await deleteHospitalCertificationFee(api, pair, hospital.certifications[0])).toHaveProperty('partialFee')
  })

  it('deleteHospitalCertification should return', async () => {
    const hospital = await queryHospitalById(api, pair.address);

    const promise: Promise<number> = new Promise((resolve, reject) => { // eslint-disable-line
      deleteHospitalCertification(api, pair, hospital.certifications[0], () => {
        queryHospitalById(api, pair.address)
          .then((res) => {
            deregisterHospital(api, pair, () => {
              resolve(res.certifications.length);
            });
          });
      });
    });

    expect(await promise).toEqual(0);
  });
});
