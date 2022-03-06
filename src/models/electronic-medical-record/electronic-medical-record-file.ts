import { convertSubstrateNumberToNumber } from '../../index';

export class ElectronicMedicalRecordFile {
  constructor(anyJson: any) {
    this.id = anyJson.id;
    this.electronicMedicalRecordId = anyJson.electronicMedicalRecordId;
    this.title = anyJson.title;
    this.description = anyJson.description;
    this.recordLink = anyJson.recordLink;
    this.uploadedAt = anyJson.uploadedAt;
  }

  id: string;
  electronicMedicalRecordId: string;
  title: string;
  description: string;
  recordLink: string;
  uploadedAt: Date;

  normalize() {
    const emrFile: ElectronicMedicalRecordFile = this; // eslint-disable-line

    if (emrFile.uploadedAt) {
      emrFile.uploadedAt = new Date(convertSubstrateNumberToNumber(emrFile.uploadedAt));
    }

    return emrFile;
  }
}
