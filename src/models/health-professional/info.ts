export class HealthProfessionalInfo {
  constructor(data: any) {
    this.boxPublicKey = data.boxPublicKey;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.myriadUsername = data.myriadUsername;
    this.gender = data.gender;
    this.dateOfBirth = data.dateOfBirth;
    this.email = data.email;
    this.phoneNumber = data.phoneNumber;
    this.role = data.role;
    this.category = data.category;
    this.profileLink = data.profileLink;
    this.profileImage = data.profileImage;
    this.anonymous = data.anonymous;
  }
  boxPublicKey: string;
  firstName: string;
  lastName: string;
  myriadUsername: string;
  gender: string;
  dateOfBirth: string;
  email: string;
  phoneNumber: string;
  role: string;
  category: string;
  profileLink: string;
  profileImage: string;
  anonymous: boolean;
}
