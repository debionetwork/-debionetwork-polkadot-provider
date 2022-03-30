import { ApiPromise } from '@polkadot/api';
import { queryLabById } from './index';
import { DnaSample } from '../../models/labs/genetic-testing/dna-sample';
import { TestResult } from '../../models/labs/genetic-testing/test-result';
import { queryOrderDetailByOrderID } from './orders';
import { queryServiceById } from './services';

export async function queryDnaSamples(api: ApiPromise, trackingId: string): Promise<DnaSample> {
  const res = (await api.query.geneticTesting.dnaSamples(trackingId)).toHuman();
  return new DnaSample(res);
}

export async function queryDnaSamplesByLab(api: ApiPromise, accountId: string): Promise<DnaSample[]> {
  const trackingIds = (await api.query.geneticTesting.dnaSamplesByLab(accountId)).toHuman() as string[];
  const dnaSamples: DnaSample[] = new Array<DnaSample>();

  for (const trackingId of trackingIds) {
    const dnaSample = await queryDnaSamples(api, trackingId);
    dnaSamples.push(dnaSample);
  }

  return dnaSamples;
}

export async function queryDnaSamplesByOwner(api: ApiPromise, accountId: string): Promise<DnaSample[]> {
  const trackingIds = (await api.query.geneticTesting.dnaSamplesByOwner(accountId)).toHuman() as string[];
  const dnaSamples: DnaSample[] = new Array<DnaSample>();

  for (const trackingId of trackingIds) {
    const dnaSample = await queryDnaSamples(api, trackingId);
    dnaSamples.push(dnaSample);
  }

  return dnaSamples;
}

export async function queryDnaTestResults(api: ApiPromise, trackingId: string): Promise<TestResult> {
  const res = (await api.query.geneticTesting.dnaTestResults(trackingId)).toHuman();
  return new TestResult(res);
}

export async function queryDnaTestResultsByLab(api: ApiPromise, accountId: string) {
  const trackingIds = (await api.query.geneticTesting.dnaTestResultsByLab(accountId)).toHuman() as string[];
  const testResults: TestResult[] = new Array<TestResult>();

  for (const trackingId of trackingIds) {
    const testResult = await queryDnaTestResults(api, trackingId);
    testResults.push(testResult);
  }

  return testResults;
}

export async function queryDnaTestResultsByOwner(api: ApiPromise, accountId: string): Promise<TestResult[]> {
  const trackingIds = (await api.query.geneticTesting.dnaTestResultsByOwner(accountId)).toHuman() as string[];
  const testResults: TestResult[] = new Array<TestResult>();

  for (const trackingId of trackingIds) {
    const testResult = await queryDnaTestResults(api, trackingId);
    testResults.push(testResult);
  }

  return testResults;
}

export async function queryStakedDataByAccountId(api: ApiPromise, accountId: string): Promise<string[]> {
  const res = (await api.query.geneticTesting.stakedDataByAccountId(accountId)).toHuman() as string[];
  return res;
}

export async function queryStakedDataByOrderId(api: ApiPromise, orderId: string): Promise<string[]> {
  const res = (await api.query.geneticTesting.stakedDataByOrderId(orderId)).toHuman() as string[];
  return res;
}

export async function getDnaTestResultsDetailByLab(api: ApiPromise, labId: string): Promise<any[]> {
  const resultIds = await queryDnaTestResultsByLab(api, labId);

  const resultsWithDetail = [];

  if (resultIds != null) {
    for (const resultId of resultIds) {
      const resultDetail = await queryDnaSamples(api, resultId.trackingId);
      const orderDetail = await queryOrderDetailByOrderID(api, resultDetail.orderId);

      const service = await queryServiceById(api, orderDetail.serviceId);
      const lab = await queryLabById(api, service.ownerId);

      /* tslint:disable-next-line */
      orderDetail['labName'] = lab.info.name;
      /* tslint:disable-next-line */
      orderDetail['serviceName'] = service.info.name;

      resultsWithDetail.push(orderDetail);
    }
  }

  return resultsWithDetail;
}
