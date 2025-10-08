import { IParseAadhaarDTO } from "../../DTO/aadhaar.dto";

export interface IParseAadhaarUseCase {
  parseAadhaar(frontImage: string, backImage: string): Promise<IParseAadhaarDTO>;
}
