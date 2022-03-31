export class TestResult {
  constructor(anyJson: any) {
    this.trackingId = anyJson.trackingId;
    this.labId = anyJson.labId;
    this.ownerId = anyJson.ownerId;
    this.comments = anyJson.comments;
    this.resultLink = anyJson.resultLink;
    this.reportLink = anyJson.reportLink;
    this.orderId = anyJson.orderId;
    this.createdAt = anyJson.createdAt;
    this.updatedAt = anyJson.updatedAt;
  }

  trackingId: string;
  labId: string;
  ownerId: string;
  comments?: string;
  resultLink: string;
  reportLink: string;
  orderId: string;
  createdAt: string;
  updatedAt: string;
}
