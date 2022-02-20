export class ServiceInvoice {
  constructor(anyJson: any) {
    this.requestHash = anyJson.requestHash;
    this.orderId = anyJson.orderId;
    this.serviceId = anyJson.serviceId;
    this.customerAddress = anyJson.customerAddress;
    this.sellerAddress = anyJson.sellerAddress;
    this.dnaSampleTrackingId = anyJson.dnaSampleTrackingId;
    this.testingPrice = anyJson.testingPrice;
    this.qcPrice = anyJson.qcPrice;
    this.payAmount = anyJson.payAmount;
  }

  requestHash: string;
  orderId: string;
  serviceId: string;
  customerAddress: string;
  sellerAddress: string;
  dnaSampleTrackingId: string;
  testingPrice: number;
  qcPrice: number;
  payAmount: number;
}
