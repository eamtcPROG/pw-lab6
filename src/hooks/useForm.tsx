import {  useEffect,  useState } from "react";
import IValidator from "interfaces/validator.interface";
import ValidatorResult from "dto/validatorresult.dto";
import ValidateTools from "tools/validatetools";

type UseFormProps = <T>(
  defaultValue: T,
  validators: IValidator[],
  customValidation?: () => boolean
) => [T, boolean, (field: string, value: any) => void];

const useForm: UseFormProps = (defaultValue, validators, customValidation) => {
  const [obj, setObj] = useState(defaultValue);
  const [isDisabled, setIsDisabled] = useState(true);
  const [vResult, setVResult] = useState<ValidatorResult>(
    new ValidatorResult()
  );

  const setObjField = (field: string, value: any) => {
    let t = JSON.parse(JSON.stringify(obj));
    t[field] = value;
    setObj(t);
  };

  const validateField = (field: string, value: any, v?: ValidatorResult) => {
    
    v = v ? v : JSON.parse(JSON.stringify(vResult));
    if (!v) v = {};
    v[field] = ValidateTools.validate(field, value, validators, vResult);
    setVResult(v);
    return v;
  };

  const validateObject = () => {
    let v = JSON.parse(JSON.stringify(vResult));

    for (const key in obj) {
      if (validators.hasOwnProperty(key)) v = validateField(key, obj[key],v);
    }

    setVResult(v);
  };

  useEffect(() => {
    validateObject();
  }, [obj]);

  const checkIsDisabled = () => {
    
    let rez = false;
    for (const key in vResult) {
      
      rez = ValidateTools.vForm(vResult, key, rez);
    }
    if (customValidation) rez = customValidation();
    setIsDisabled(rez);
  };

  useEffect(() => {
    checkIsDisabled();
  }, [vResult]);

  return [obj, isDisabled, setObjField];
};

export default useForm;
