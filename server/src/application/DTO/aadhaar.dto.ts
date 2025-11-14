import AadhaarEntity from "../../domain/entities/aadhaar.entity";

export interface IParseAadhaarDTO {
  name: string;
  dob: string;
  gender: string;
  uid: string;
  address: string;
  pincode: string;
  age: number;
  ageBand: string;
}

class ParseAadhaarDTO {
  /**
   * method to convert AadhaarEntity to DTO
   * @param entity
   * @returns
   */
  static toDTO(entity: AadhaarEntity): IParseAadhaarDTO {
    return {
      name: entity.name,
      dob: entity.dob.value,
      gender: entity.gender,
      uid: entity.uid,
      address: entity.address,
      pincode: entity.pincode,
      age: entity.age,
      ageBand: entity.ageBand.value,
    };
  }
}

export default ParseAadhaarDTO;
