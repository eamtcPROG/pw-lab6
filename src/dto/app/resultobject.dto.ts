import Idto from "interfaces/idto.interface";
import MessageDto from "dto/app/message.dto";

export default class ResultObjectDTO implements Idto {
  err?: boolean;
  messages?: MessageDto[];
  obj?: Idto;
}
