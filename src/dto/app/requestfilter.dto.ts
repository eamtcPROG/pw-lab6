import Idto from "interfaces/idto.interface";

export default class RequestFilterDTO implements Idto {
  field?: string;
  values?: string[];
}
