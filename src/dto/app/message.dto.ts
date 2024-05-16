import Idto from "interfaces/idto.interface";

export default class MessageDto implements Idto {
  id?: string; 
  code?: string;
  message?: string;
  mestype?: number;
}
