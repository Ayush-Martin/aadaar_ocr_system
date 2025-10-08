import AgeBand from "../valueObjects/AgeBand.vo";
import DOB from "../valueObjects/DOB.vo";

class AadhaarEntity {
  constructor(
    public name: string,
    public dob: DOB,
    public gender: string,
    public uid: string,
    public address: string,
    public pincode: string,
    public age: number,
    public maskedMobileNumber: string,
    public isUidSame: boolean,
    public ageBand: AgeBand,
  ) {}
}

export default AadhaarEntity;
