import { ElectronicMedicalRecordFile } from "../../../../src/models/electronic-medical-record/electronic-medical-record-file";
import { electronicMedicalRecordFileDataMock } from "./electronic-medical-record-file.mock";

export const electronicMedicalRecordDataMock = {
  id: "string",
  ownerId: "string",
  title: "string",
  category: "string",
  files: ["string"],
}

export const electronicMedicalRecordInputDataMock = {
  id: "string",
  ownerId: "string",
  title: "string",
  category: "string",
  files: [
    new ElectronicMedicalRecordFile(electronicMedicalRecordFileDataMock)
  ]
}