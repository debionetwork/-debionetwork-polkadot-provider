import { ApiPromise } from '@polkadot/api';
import 'regenerator-runtime/runtime';
import { queryCertificationById, queryCertificationsByMultipleIds } from '../../../src/query/labs/certifications';
import { createCertification, updateCertification, deleteCertification } from "../../../src/command/labs/certifications";
import { initializeApi } from '../polkadot-init';
import { queryLabById } from '../../../src/query/labs';
import { Lab } from '../../../src/models/labs';
import { deregisterLab, registerLab } from "../../../src/command/labs";
import { labDataMock } from '../../unit/models/labs/labs.mock';
import { Certification } from '../../../src/models/labs/certifications';
import { certificationDataMock } from '../../unit/models/labs/certifications.mock';

describe('Certifications Pallet Integration Tests', () => {
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
    const labPromise: Promise<Lab> = new Promise((resolve, reject) => { // eslint-disable-line
      registerLab(api, pair, labDataMock.info, () => {
        queryLabById(api, pair.address)
          .then((res) => {
            resolve(res)
          });
      });
    });

    expect((await labPromise).info).toEqual(labDataMock.info);

    const promise: Promise<Certification[]> = new Promise((resolve, reject) => { // eslint-disable-line
      createCertification(api, pair, certificationDataMock.info, () => {
        queryLabById(api, pair.address)
          .then((lab) => {
            queryCertificationsByMultipleIds(api, lab.certifications)
              .then((res) => {
                resolve(res)
              });
          });
      });
    });

    expect((await promise)[0].info).toEqual(certificationDataMock.info);
  });

  it('updateCertification should return', async () => {
    const lab = await queryLabById(api, pair.address);

    const promise: Promise<Certification> = new Promise((resolve, reject) => { // eslint-disable-line
      updateCertification(api, pair, lab.certifications[0], certificationDataMock.info, () => {
        queryCertificationById(api, lab.certifications[0])
          .then((res) => {
            resolve(res)
          });
      });
    });

    expect((await promise).info).toEqual(certificationDataMock.info);
  });

  it('deleteCertification should return', async () => {
    const lab = await queryLabById(api, pair.address);

    const promise: Promise<number> = new Promise((resolve, reject) => { // eslint-disable-line
      deleteCertification(api, pair, lab.certifications[0], () => {
        queryLabById(api, pair.address)
          .then((res) => {
            deregisterLab(api, pair, () => {
              resolve(res.certifications.length);
            });
          });
      });
    });

    expect(await promise).toEqual(0);
  });
});
