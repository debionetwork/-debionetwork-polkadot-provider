export class ElectronicMedicalRecord {
  constructor(anyJson: any) {
    this.id = anyJson.id;
    this.ownerId = anyJson.ownerId;
    this.title = anyJson.title;
    this.category = anyJson.category;
    this.files = anyJson.files;
  }

  id: string;
  ownerId: string;
  title: string;
  category: string;
  files: string[];
}

export * from './electronic-medical-record-file';