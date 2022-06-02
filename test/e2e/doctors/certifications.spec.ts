import { ApiPromise } from '@polkadot/api';
import 'regenerator-runtime/runtime';
import { queryDoctorCertificationById, queryDoctorCertificationsByMultipleIds } from '../../../src/query/doctors/certifications';
import { createCertification, createCertificationFee, updateCertification, updateCertificationFee, deleteCertification, deleteCertificationFee } from "../../../src/command/doctors/certifications";
import { initializeApi } from '../polkadot-init';
import { queryDoctorById } from '../../../src/query/doctors';
import { Doctor } from '../../../src/models/doctors';
import { deregisterDoctor, registerDoctor } from "../../../src/command/doctors";
import { doctorDataMock } from '../../unit/models/doctors/doctors.mock';
import { DoctorCertification } from '../../../src/models/doctors/certifications';
import { doctorCertificationDataMock } from '../../unit/models/doctors/certifications.mock';

describe('DoctorCertifications Pallet Integration Tests', () => {
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
    const doctorPromise: Promise<Doctor> = new Promise((resolve, reject) => { // eslint-disable-line
      registerDoctor(api, pair, doctorDataMock.info, () => {
        queryDoctorById(api, pair.address)
          .then((res) => {
            resolve(res)
          });
      }).catch(e => reject(e));
    });

    expect((await doctorPromise).info).toEqual(doctorDataMock.info);

    const promise: Promise<DoctorCertification[]> = new Promise((resolve, reject) => { // eslint-disable-line
      createCertification(api, pair, doctorCertificationDataMock.info, () => {
        queryDoctorById(api, pair.address)
          .then((doctor) => {
            queryDoctorCertificationsByMultipleIds(api, doctor.certifications)
              .then((res) => {
                resolve(res)
              });
          });
      }).catch(e => reject(e));
    });

    expect((await promise)[0].info).toEqual(doctorCertificationDataMock.info);
  });

  it('createCertificationFee should return', async () => {
    expect(await createCertificationFee(api, pair, doctorCertificationDataMock.info)).toHaveProperty('partialFee')
  })


  it('updateCertification should return', async () => {
    const doctor = await queryDoctorById(api, pair.address);

    const promise: Promise<DoctorCertification> = new Promise((resolve, reject) => { // eslint-disable-line
      updateCertification(api, pair, doctor.certifications[0], doctorCertificationDataMock.info, () => {
        queryDoctorCertificationById(api, doctor.certifications[0])
          .then((res) => {
            resolve(res)
          });
      }).catch(e => reject(e));
    });

    expect((await promise).info).toEqual(doctorCertificationDataMock.info);
  });

  it('updateCertificationFee should return', async () => {
    const doctor = await queryDoctorById(api, pair.address);
    expect(await updateCertificationFee(api, pair, doctor.certifications[0], doctorCertificationDataMock.info)).toHaveProperty('partialFee')
  })

  it('deleteCertificationFee should return', async () => {
    const doctor = await queryDoctorById(api, pair.address)
    expect(await deleteCertificationFee(api, pair, doctor.certifications[0])).toHaveProperty('partialFee')
  })

  it('deleteCertification should return', async () => {
    const doctor = await queryDoctorById(api, pair.address);

    const promise: Promise<number> = new Promise((resolve, reject) => { // eslint-disable-line
      deleteCertification(api, pair, doctor.certifications[0], () => {
        queryDoctorById(api, pair.address)
          .then((res) => {
            deregisterDoctor(api, pair, () => {
              resolve(res.certifications.length);
            });
          });
      }).catch(e => reject(e));
    });

    expect(await promise).toEqual(0);
  });
});
