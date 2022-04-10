import { ApiPromise } from '@polkadot/api';
import 'regenerator-runtime/runtime';
import { initializeApi } from '../polkadot-init';
import { bulkCreateQualification, createQualification, deleteQualification, updateQualification } from "../../../src/command/genetic-analyst/genetic-analyst-qualification";
import { GeneticAnalyst, GeneticAnalystQualification } from '../../../src/models/genetic-analysts';
import { geneticAnalystsDataMock } from '../../unit/models/genetic-analysts/genetic-analysts.mock';
import { queryGeneticAnalystByAccountId, queryGeneticAnalystCount, queryGeneticAnalystQualificationsByHashId, queryGeneticAnalystQualificationsCount, queryGeneticAnalystQualificationsCountByOwner } from '../../../src/query/genetic-analysts';
import { deregisterGeneticAnalyst, registerGeneticAnalyst } from '../../../src/command/genetic-analyst';
import { geneticAnalystQualificationsDataMock } from '../../unit/models/genetic-analysts/genetic-analyst-qualifications.mock';

describe('Genetic Analyst Qualifications Pallet Integration Tests', () => {
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

  it('createQualification should return', async () => {
    const gaPromise: Promise<GeneticAnalyst> = new Promise((resolve, reject) => { // eslint-disable-line
      registerGeneticAnalyst(api, pair, geneticAnalystsDataMock.info, () => {
        queryGeneticAnalystByAccountId(api, pair.address)
          .then((res) => {
            resolve(res)
          });
      });
    });

    expect((await gaPromise).info).toEqual({
        ...geneticAnalystsDataMock.info,
        dateOfBirth: "0"
    });

    const promise: Promise<GeneticAnalystQualification> = new Promise((resolve, reject) => { // eslint-disable-line
      createQualification(api, pair, geneticAnalystQualificationsDataMock.info, () => {
        queryGeneticAnalystByAccountId(api, pair.address)
          .then((ga) => {
            queryGeneticAnalystQualificationsByHashId(api, ga.qualifications[0])
              .then((res) => {
                resolve(res)
              });
          });
      });
    });

    expect((await promise).info).toEqual(geneticAnalystQualificationsDataMock.info);
  });

  it('queryGeneticAnalystQualificationsCount should return', async () => {
    expect(await queryGeneticAnalystQualificationsCount(api)).toEqual(1);
  });

  it('updateQualification should return', async () => {
    const ga = await queryGeneticAnalystByAccountId(api, pair.address);

    const promise: Promise<GeneticAnalystQualification> = new Promise((resolve, reject) => { // eslint-disable-line
      updateQualification(api, pair, ga.qualifications[0], geneticAnalystQualificationsDataMock.info, () => {
        queryGeneticAnalystQualificationsByHashId(api, ga.qualifications[0])
          .then((res) => {
            resolve(res)
          });
      });
    });

    expect((await promise).info).toEqual(geneticAnalystQualificationsDataMock.info);
  });

  it('deleteQualification should return', async () => {
    const ga = await queryGeneticAnalystByAccountId(api, pair.address);

    const promise: Promise<number> = new Promise((resolve, reject) => { // eslint-disable-line
      deleteQualification(api, pair, ga.qualifications[0], () => {
        queryGeneticAnalystQualificationsCountByOwner(api, pair.address)
          .then((res) => {
            resolve(res);
          });
      });
    });

    expect(await promise).toEqual(0);
  });

  it('bulkCreateQualification should return', async () => {
    const promise: Promise<number> = new Promise((resolve, reject) => { // eslint-disable-line
      bulkCreateQualification(api, pair, [geneticAnalystQualificationsDataMock.info], () => {
        queryGeneticAnalystQualificationsCountByOwner(api, pair.address)
          .then((res) => {
            resolve(res);
          });
      });
    });

    expect(await promise).toEqual(1);

    const gaPromise: Promise<Number> = new Promise((resolve, reject) => { // eslint-disable-line
      deregisterGeneticAnalyst(api, pair, () => {
        queryGeneticAnalystCount(api)
          .then((res) => {
            resolve(res);
          });
      });
    });
    
    expect(await gaPromise).toEqual(0);
  });
});
