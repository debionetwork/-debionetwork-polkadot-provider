export class ServicePrice {
  constructor(anyJson: any) {
    this.assetId = anyJson.assetId;
    this.testingPrice = anyJson.testingPrice;
    this.qcPrice = anyJson.qcPrice;
  }

  assetId: string;
  testingPrice: BigInt;
  qcPrice: BigInt;
}