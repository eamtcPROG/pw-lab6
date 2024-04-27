import ValidatorResult from "dto/validatorresult.dto";
import IValidator from "interfaces/validator.interface";

export default class RequiredValidator implements IValidator {
    messageErr: string;
    messageOk: string;
  
    constructor(mE: string, mO: string) {
      this.messageErr = mE;
      this.messageOk = mO;
    }

    static getValidators(keys: Array<string>): Array<IValidator> {
      let rez: any = {};
      for (const i of keys) {
        rez[i] = [new RequiredValidator(`Field_${i}_required`, "")];
      }
      return rez;
    }
  
    validate = (value: any): ValidatorResult => {
      let rez: ValidatorResult = new ValidatorResult();
  
      value = value.toString().trim();
      if (value) {
        rez.isOk = true;
        rez.message = this.messageOk;
      } else {
        rez.isOk = false;
        rez.message = this.messageErr;
      }
  
      return rez;
    }
  }