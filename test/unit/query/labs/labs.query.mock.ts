import { returnToHumanMockWithParam } from "../../@polkadot-types.mock";

export const labs = {
  labs(param) {
    return returnToHumanMockWithParam(param);
  },
}

export const labDataMock = {
  accountId: "ACCOUNT_ID",
  services: [
    "ID"
  ],
  certifications: [
    "ID"
  ],
  verificationStatus: "Unverified",
  info: {
    boxPublicKey: "string",
    name: "string",
    email: "string",
    phoneNumber: "string",
    website: "string",
    country: "string",
    region: "string",
    city: "string",
    address: "string",
    latitude: "string",
    longitude: "string",
    profileImage: "string",
  }  
}