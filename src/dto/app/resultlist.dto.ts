import Idto from "interfaces/idto.interface";
import MessageDto from "dto/app/message.dto";
import RequestListDTO from "dto/app/requestlist.dto";

export default class ResultListDTO implements Idto {
  err?: boolean;
  messages?: MessageDto[];
  objects?: Idto[];
  requestinfo?: RequestListDTO;
  total?: number;
  totalpages?: number;

  roles?: string[];
}
