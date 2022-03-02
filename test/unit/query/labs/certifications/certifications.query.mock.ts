import { returnToHumanMockWithParam } from "../../../@polkadot-types.mock";

export const certifications = {
  certifications(param) {
    return returnToHumanMockWithParam(param);
  },
}

export const certificationDataMock = {
  id: "ID",
  ownerId: "OWNER_ID",
  info: {
    title: "TITLE",
    issuer: "ISSUER",
    month: "MONTH",
    year: "YEAR",
    description: "DESCRIPTION",
    supportingDocument: "SUPPORTING_DOCUMENT",
  }
}