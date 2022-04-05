import { ApiPromise } from '@polkadot/api';
import { GeneticAnalysisOrder } from '../../models/genetic-analysts/genetic-analysis-orders';

export async function queryGeneticAnalysisOrder(api: ApiPromise, orderId: string): Promise<GeneticAnalysisOrder> {
  const res = (await api.query.geneticAnalysisOrders.geneticAnalysisOrder(orderId)).toHuman();
  return new GeneticAnalysisOrder(res);
}

export async function queryGeneticAnalysisOrderByCustomerId(
  api: ApiPromise,
  accountId: string,
): Promise<GeneticAnalysisOrder[]> {
  const orderIds: any = (await api.query.geneticAnalysisOrders.geneticAnalysisOrdersByCustomer(accountId)).toHuman();
  const orders: GeneticAnalysisOrder[] = new Array<GeneticAnalysisOrder>();
  for (const orderId of orderIds) {
    orders.push(await queryGeneticAnalysisOrder(api, orderId));
  }
  return orders;
}

export async function queryGeneticAnalysisOrderBySellerId(
  api: ApiPromise,
  accountId: string,
): Promise<GeneticAnalysisOrder[]> {
  const orderIds: any = (await api.query.geneticAnalysisOrders.geneticAnalysisOrdersBySeller(accountId)).toHuman();
  const orders: GeneticAnalysisOrder[] = new Array<GeneticAnalysisOrder>();
  for (const orderId of orderIds) {
    orders.push(await queryGeneticAnalysisOrder(api, orderId));
  }
  return orders;
}

export async function queryPendingGeneticAnalysisOrdersBySellerId(
  api: ApiPromise,
  accountId: string,
): Promise<GeneticAnalysisOrder[]> {
  const orderIds: any = (
    await api.query.geneticAnalysisOrders.pendingGeneticAnalysisOrdersBySeller(accountId)
  ).toHuman();
  const orders: GeneticAnalysisOrder[] = new Array<GeneticAnalysisOrder>();
  for (const orderId of orderIds) {
    orders.push(await queryGeneticAnalysisOrder(api, orderId));
  }
  return orders;
}

export async function queryLastGeneticAnalysisOrderByCustomerId(
  api: ApiPromise,
  accountId: string,
): Promise<GeneticAnalysisOrder[]> {
  const orderIds: any = (await api.query.geneticAnalysisOrders.lastGeneticAnalysisOrderByCustomer(accountId)).toHuman();
  const orders: GeneticAnalysisOrder[] = new Array<GeneticAnalysisOrder>();
  for (const orderId of orderIds) {
    orders.push(await queryGeneticAnalysisOrder(api, orderId));
  }
  return orders;
}

export async function queryGeneticAnalysisOrderEscrowKey(api: ApiPromise): Promise<string> {
  return (await api.query.geneticAnalysisOrders.escrowKey()).toString();
}

export async function queryGeneticAnalysisOrderPalletAccount(api: ApiPromise): Promise<string> {
  return (await api.query.geneticAnalysisOrders.palletAccount()).toString();
}

export async function queryGeneticAnalysisOrderTotalEscrowAmount(api: ApiPromise): Promise<number> {
  const res: any = (await api.query.geneticAnalysisOrders.totalEscrowAmount()).toHuman();
  return parseInt(res, 0);
}
