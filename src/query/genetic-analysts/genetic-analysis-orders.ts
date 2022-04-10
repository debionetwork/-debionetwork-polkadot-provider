import { ApiPromise } from '@polkadot/api';
import { GeneticAnalysisOrder } from '../../models/genetic-analysts/genetic-analysis-orders';

export async function queryGeneticAnalysisOrderById(api: ApiPromise, orderId: string): Promise<GeneticAnalysisOrder> {
  const res = (await api.query.geneticAnalysisOrders.geneticAnalysisOrderById(orderId)).toHuman();
  return new GeneticAnalysisOrder(res);
}

export async function queryGeneticAnalysisOrderByCustomerId(
  api: ApiPromise,
  accountId: string,
): Promise<GeneticAnalysisOrder[]> {
  const orderIds: any = (await api.query.geneticAnalysisOrders.geneticAnalysisOrdersByCustomerId(accountId)).toHuman();
  const orders: GeneticAnalysisOrder[] = new Array<GeneticAnalysisOrder>();
  for (const orderId of orderIds) {
    orders.push(await queryGeneticAnalysisOrderById(api, orderId));
  }
  return orders;
}

export async function queryGeneticAnalysisOrderByGeneticAnalystId(
  api: ApiPromise,
  accountId: string,
): Promise<GeneticAnalysisOrder[]> {
  const orderIds: any = (
    await api.query.geneticAnalysisOrders.geneticAnalysisOrdersByGeneticAnalystId(accountId)
  ).toHuman();
  const orders: GeneticAnalysisOrder[] = new Array<GeneticAnalysisOrder>();
  for (const orderId of orderIds) {
    orders.push(await queryGeneticAnalysisOrderById(api, orderId));
  }
  return orders;
}

export async function queryPendingGeneticAnalysisOrderByGeneticAnalystId(
  api: ApiPromise,
  accountId: string,
): Promise<GeneticAnalysisOrder[]> {
  const orderIds: any = (
    await api.query.geneticAnalysisOrders.pendingGeneticAnalysisOrdersByGeneticAnalystId(accountId)
  ).toHuman();
  const orders: GeneticAnalysisOrder[] = new Array<GeneticAnalysisOrder>();
  for (const orderId of orderIds) {
    orders.push(await queryGeneticAnalysisOrderById(api, orderId));
  }
  return orders;
}

export async function queryLastGeneticAnalysisOrderByCustomerId(
  api: ApiPromise,
  accountId: string,
): Promise<GeneticAnalysisOrder[]> {
  const orderIds: any = (
    await api.query.geneticAnalysisOrders.lastGeneticAnalysisOrderByCustomerId(accountId)
  ).toHuman();
  const orders: GeneticAnalysisOrder[] = new Array<GeneticAnalysisOrder>();
  for (const orderId of orderIds) {
    orders.push(await queryGeneticAnalysisOrderById(api, orderId));
  }
  return orders;
}

export async function queryGeneticAnalysisOrderAdminKey(api: ApiPromise): Promise<string> {
  return (await api.query.geneticAnalysisOrders.adminKey()).toString();
}

export async function queryGeneticAnalysisOrderPalletId(api: ApiPromise): Promise<string> {
  return (await api.query.geneticAnalysisOrders.palletId()).toString();
}

export async function queryGeneticAnalysisOrderTotalEscrowAmount(api: ApiPromise): Promise<number> {
  const res: any = (await api.query.geneticAnalysisOrders.totalEscrowAmount()).toHuman();
  return parseInt(res, 0);
}
