import { ApiPromise } from '@polkadot/api';
import { GeneticAnalysisOrder } from '../../models/genetic-analysts/genetic-analysis-orders';

export async function queryGeneticAnalysisOrderById(api: ApiPromise, orderId: string): Promise<GeneticAnalysisOrder> {
  const res = (await api.query.geneticAnalysisOrders.geneticAnalysisOrderById(orderId)).toHuman();
  return new GeneticAnalysisOrder(res);
}

export async function queryGeneticAnalystOrderByCustomerId(api: ApiPromise, accountId: string): Promise<GeneticAnalysisOrder[]> {
  const orderIds: any = (await api.query.geneticAnalysisOrders.geneticAnalysisOrdersByCustomerId(accountId)).toHuman();
  const orders: GeneticAnalysisOrder[] = new Array<GeneticAnalysisOrder>();
  for (const orderId of orderIds) {
    orders.push(await queryGeneticAnalysisOrderById(api, orderId));
  }
  return orders;
}

export async function queryGeneticAnalystOrderByGeneticAnalystId(api: ApiPromise, accountId: string): Promise<GeneticAnalysisOrder[]> {
  const orderIds: any = (await api.query.geneticAnalysisOrders.geneticAnalysisOrdersByGeneticAnalystId(accountId)).toHuman();
  const orders: GeneticAnalysisOrder[] = new Array<GeneticAnalysisOrder>();
  for (const orderId of orderIds) {
    orders.push(await queryGeneticAnalysisOrderById(api, orderId));
  }
  return orders;
}

export async function queryPendingGeneticAnalystOrderByGeneticAnalystId(api: ApiPromise, accountId: string): Promise<GeneticAnalysisOrder[]> {
  const orderIds: any = (await api.query.geneticAnalysisOrders.pendingGeneticAnalysisOrdersByGeneticAnalystId(accountId)).toHuman();
  const orders: GeneticAnalysisOrder[] = new Array<GeneticAnalysisOrder>();
  for (const orderId of orderIds) {
    orders.push(await queryGeneticAnalysisOrderById(api, orderId));
  }
  return orders;
}

export async function queryLastGeneticAnalystOrderByCustomerId(api: ApiPromise, accountId: string): Promise<GeneticAnalysisOrder[]> {
  const orderIds: any = (await api.query.geneticAnalysisOrders.lastGeneticAnalysisOrderByCustomerId(accountId)).toHuman();
  const orders: GeneticAnalysisOrder[] = new Array<GeneticAnalysisOrder>();
  for (const orderId of orderIds) {
    orders.push(await queryGeneticAnalysisOrderById(api, orderId));
  }
  return orders;
}

export async function queryGeneticAnalystOrderAdminKey(api: ApiPromise): Promise<string> {
  return (await api.query.geneticAnalysisOrders.adminKey()).toString();
}

export async function queryGeneticAnalystOrderPalletId(api: ApiPromise): Promise<string> {
  return (await api.query.geneticAnalysisOrders.palletId()).toString();
}

export async function queryGeneticAnalystOrderTotalEscrowAmount(api: ApiPromise): Promise<number> {
  const res: any = (await api.query.geneticAnalysisOrders.totalEscrowAmount()).toHuman();
  return parseInt(res, 0);
}
