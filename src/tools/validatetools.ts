import ValidatorResult from "dto/validatorresult.dto";

class ValidateTools {
    // -----------------------------------------
    static validate(
      field: string,
      value: any,
      validators: any,
      vresults: ValidatorResult
    ): ValidatorResult {
      if (!validators) return {};
      if (!validators[field]) return {};
  
      let rez: any = {};
      rez.isOk = true;
      rez.objects = [];
      for (var i in validators[field]) {
        let t = validators[field][i].validate(value);
        if (!t.isOk) rez.isOk = false;
        rez.objects.push(t);
      }
      
      // console.log("validate-------------------", vresults,rez);
      // if (!vresults || vresults[field] == undefined) {
      //   rez.isOk = -1;
      // }
  
      return rez;
    }
  
    // -----------------------------------------
    static vForm(vresults: any, field: string, result?: boolean): boolean {
      result = result == undefined ? false : result;
      if (result) return true;
      if (!vresults) return true;
  
      if (!vresults[field]) return true;
      if (!vresults[field].isOk) return true;
      if (vresults[field].isOk == "-1") return true;
  
      return false;
    }
  
    // -----------------------------------------
  }
  
  export default ValidateTools;
  