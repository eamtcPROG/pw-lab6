import ValidatorResult from "dto/validatorresult.dto";

export default interface IValidator {
    messageErr: string;
    messageOk: string;
    validate(value: any): ValidatorResult;
}