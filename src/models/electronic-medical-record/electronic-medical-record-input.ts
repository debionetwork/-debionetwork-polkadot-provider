import { ElectronicMedicalRecordFile } from './electronic-medical-record-file';

export class ElectronicMedicalRecordInput {
  constructor(anyJson: any) {
    this.id = anyJson.id;
    this.ownerId = anyJson.ownerId;
    this.title = anyJson.title;
    this.category = anyJson.category;
    this.files = [];

    anyJson.files.forEach((element) => {
      this.files.push(new ElectronicMedicalRecordFile(element));
    });
  }

  id: string;
  ownerId: string;
  title: string;
  category: string;
  files: ElectronicMedicalRecordFile[];
}
