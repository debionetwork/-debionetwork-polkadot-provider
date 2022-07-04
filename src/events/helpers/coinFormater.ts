import { queryAccountBalance } from '../../query/account';

export const toFormatDebioCoin = async (valueCoin: any, store: any) => {
  let addCoin = '';

  if (valueCoin.toString().includes('0x')) {
    const decimal = parseInt(valueCoin.toString(), 16).toString();
    addCoin = decimal.replace('000000000000000', '');
  } else {
    addCoin = valueCoin.toString().replace('000000000000000', '');
  }

  if (addCoin !== '') {
    const balance = await queryAccountBalance(
      store.getters['substrate/getAPI'],
      store.getters['substrate/wallet'].address,
    );
    store.state.substrate.walletBalance = balance;
  }

  return addCoin;
};
