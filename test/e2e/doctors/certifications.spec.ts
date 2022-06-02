import { ApiPromise } from '@polkadot/api';
import 'regenerator-runtime/runtime';
import { queryDoctorCertificationById, queryDoctorCertificationsByMultipleIds } from '../../../src/query/doctors/certifications';
import { createDoctorCertification, createDoctorCertificationFee, updateDoctorCertification, updateDoctorCertificationFee, deleteDoctorCertification, deleteDoctorCertificationFee } from "../../../src/command/doctors/certifications";
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

  it('createDoctorCertification should return', async () => {
    const doctorPromise: Promise<Doctor> = new Promise((resolve, reject) => { // eslint-disable-line
      registerDoctor(api, pair, doctorDataMock.info, () => {
        queryDoctorById(api, pair.address)
          .then((res) => {
            resolve(res)
          });
      });
    });

    expect((await doctorPromise).info).toEqual(doctorDataMock.info);

    const promise: Promise<DoctorCertification[]> = new Promise((resolve, reject) => { // eslint-disable-line
      createDoctorCertification(api, pair, doctorCertificationDataMock.info, () => {
        queryDoctorById(api, pair.address)
          .then((doctor) => {
            queryDoctorCertificationsByMultipleIds(api, doctor.certifications)
              .then((res) => {
                resolve(res)
              });
          });
      });
    });

    expect((await promise)[0].info).toEqual(doctorCertificationDataMock.info);
  });

  it('createDoctorCertificationFee should return', async () => {
    expect(await createDoctorCertificationFee(api, pair, doctorCertificationDataMock.info)).toHaveProperty('partialFee')
  })


  it('updateDoctorCertification should return', async () => {
    const doctor = await queryDoctorById(api, pair.address);

    const promise: Promise<DoctorCertification> = new Promise((resolve, reject) => { // eslint-disable-line
      updateDoctorCertification(api, pair, doctor.certifications[0], doctorCertificationDataMock.info, () => {
        queryDoctorCertificationById(api, doctor.certifications[0])
          .then((res) => {
            resolve(res)
          });
      });
    });

    expect((await promise).info).toEqual(doctorCertificationDataMock.info);
  });

  it('updateDoctorCertificationFee should return', async () => {
    const doctor = await queryDoctorById(api, pair.address);
    expect(await updateDoctorCertificationFee(api, pair, doctor.certifications[0], doctorCertificationDataMock.info)).toHaveProperty('partialFee')
  })

  it('deleteDoctorCertificationFee should return', async () => {
    const doctor = await queryDoctorById(api, pair.address)
    expect(await deleteDoctorCertificationFee(api, pair, doctor.certifications[0])).toHaveProperty('partialFee')
  })

  it('deleteDoctorCertification should return', async () => {
    const doctor = await queryDoctorById(api, pair.address);

    const promise: Promise<number> = new Promise((resolve, reject) => { // eslint-disable-line
      deleteDoctorCertification(api, pair, doctor.certifications[0], () => {
        queryDoctorById(api, pair.address)
          .then((res) => {
            deregisterDoctor(api, pair, () => {
              resolve(res.certifications.length);
            });
          });
      });
    });

    expect(await promise).toEqual(0);
  });
});
