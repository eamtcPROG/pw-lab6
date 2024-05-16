import Idto from "interfaces/idto.interface";
import MessageDto from "./message.dto";

export default class ResultDeleteDTO implements Idto {
  err?: boolean;
  messages?: MessageDto[];
  deleted?: boolean;
}
