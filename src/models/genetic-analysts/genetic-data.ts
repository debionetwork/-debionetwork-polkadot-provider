export class GeneticData {
  constructor(anyJson: any) {
    this.id = anyJson.id;
    this.ownerId = anyJson.ownerId;
    this.title = anyJson.title;
    this.description = anyJson.description;
    this.reportLink = anyJson.reportLink;
    this.createdAt = anyJson.createdAt;
    this.updatedAt = anyJson.updatedAt;
  }

  id: string;
  ownerId: string;
  title: string;
  description: string;
  reportLink: string;
  createdAt: Date;
  updatedAt: Date;
}
