export class DnaSample {
  constructor(anyJson: any) {
    this.trackingId = anyJson.trackingId;
    this.labId = anyJson.labId;
    this.ownerId = anyJson.ownerId;
    this.status = anyJson.status;
    this.orderId = anyJson.orderId;
    this.rejectedTitle = anyJson.rejectedTitle;
    this.rejectedDescription = anyJson.rejectedDescription;
    this.createdAt = anyJson.createdAt;
    this.updatedAt = anyJson.updatedAt;
  }

  trackingId: string;
  labId: string;
  ownerId: string;
  status: string;
  orderId: string;
  rejectedTitle: string;
  rejectedDescription: string;
  createdAt: string;
  updatedAt: string;
}