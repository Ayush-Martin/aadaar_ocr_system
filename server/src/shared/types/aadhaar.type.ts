export interface IAadhaarFrontPage {
  name: string;
  dob: Date;
  gender: string;
  uid: string;
}

export interface IAadhaarBackPage {
  uid: string;
  address: string;
  pincode: string;
  maskedMobileNumber: string;
}
