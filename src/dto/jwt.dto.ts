import Idto from "interfaces/idto.interface";
import { UserDto } from "./user.dto";

export class JWTDto implements Idto{
    accesstoken?: string;
}

export class ResultLoginDto implements Idto{
    accesstoken?: JWTDto;
    obj?:UserDto
}