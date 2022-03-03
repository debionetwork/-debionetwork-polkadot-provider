export const dbioUnit: number = 10 ** 18;

export function convertToDbioUnit(_number: number): number {
  return _number * dbioUnit;
}

export function convertToDbioUnitString(_number: number): string {
  return (_number * dbioUnit).toString();
}

export function convertSubstrateNumberToNumber(data: any): number {
  return Number(data.toString().split(',').join(''));
}

export function convertSubstrateBalanceToNumber(bal: any): number {
  return convertSubstrateNumberToNumber(bal) / dbioUnit;
}

export * from './query';
export * from './models';
export * from './command';
