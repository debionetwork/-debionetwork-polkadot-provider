import { ApiPromise } from '@polkadot/api';
import 'regenerator-runtime/runtime';
import { queryHospitalCertificationById, queryHospitalCertificationsByMultipleIds } from '../../../src/query/hospitals/certifications';
import { createCertification, createCertificationFee, updateCertification, updateCertificationFee, deleteCertification, deleteCertificationFee } from "../../../src/command/hospitals/certifications";
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

  it('createCertification should return', async () => {
    const hospitalPromise: Promise<Hospital> = new Promise((resolve, reject) => { // eslint-disable-line
      registerHospital(api, pair, hospitalDataMock.info, () => {
        queryHospitalById(api, pair.address)
          .then((res) => {
            resolve(res)
          });
      }).catch(e => reject(e));
    });

    expect((await hospitalPromise).info).toEqual(hospitalDataMock.info);

    const promise: Promise<HospitalCertification[]> = new Promise((resolve, reject) => { // eslint-disable-line
      createCertification(api, pair, hospitalCertificationDataMock.info, () => {
        queryHospitalById(api, pair.address)
          .then((hospital) => {
            queryHospitalCertificationsByMultipleIds(api, hospital.certifications)
              .then((res) => {
                resolve(res)
              });
          });
      }).catch(e => reject(e));
    });

    expect((await promise)[0].info).toEqual(hospitalCertificationDataMock.info);
  });

  it('createCertificationFee should return', async () => {
    expect(await createCertificationFee(api, pair, hospitalCertificationDataMock.info)).toHaveProperty('partialFee')
  })


  it('updateCertification should return', async () => {
    const hospital = await queryHospitalById(api, pair.address);

    const promise: Promise<HospitalCertification> = new Promise((resolve, reject) => { // eslint-disable-line
      updateCertification(api, pair, hospital.certifications[0], hospitalCertificationDataMock.info, () => {
        queryHospitalCertificationById(api, hospital.certifications[0])
          .then((res) => {
            resolve(res)
          });
      }).catch(e => reject(e));
    });

    expect((await promise).info).toEqual(hospitalCertificationDataMock.info);
  });

  it('updateCertificationFee should return', async () => {
    const hospital = await queryHospitalById(api, pair.address);
    expect(await updateCertificationFee(api, pair, hospital.certifications[0], hospitalCertificationDataMock.info)).toHaveProperty('partialFee')
  })

  it('deleteCertificationFee should return', async () => {
    const hospital = await queryHospitalById(api, pair.address)
    expect(await deleteCertificationFee(api, pair, hospital.certifications[0])).toHaveProperty('partialFee')
  })

  it('deleteCertification should return', async () => {
    const hospital = await queryHospitalById(api, pair.address);

    const promise: Promise<number> = new Promise((resolve, reject) => { // eslint-disable-line
      deleteCertification(api, pair, hospital.certifications[0], () => {
        queryHospitalById(api, pair.address)
          .then((res) => {
            deregisterHospital(api, pair, () => {
              resolve(res.certifications.length);
            });
          });
      }).catch(e => reject(e));
    });

    expect(await promise).toEqual(0);
  });
});
