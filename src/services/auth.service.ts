import ResultListDTO from "dto/app/resultlist.dto";
import ResultObjectDTO from "dto/app/resultobject.dto";
import { LoginDto } from "dto/login.dto";
import AuthRepository from "repositories/auth.repository";

export default class AuthService {
  repository: AuthRepository = new AuthRepository();

  handleGet(result?: any, cbparameters?: any, data?: any): any {
    let rez = new ResultObjectDTO();
    rez = result;
    if (result.err) return;

    if (cbparameters && cbparameters._cb) {
      cbparameters._cb(rez, cbparameters, data);
    }

    return rez;
  }

  handleGetList(result?: any, cbparameters?: any, data?: any): any {
    let rez = new ResultListDTO();

    rez = result;
    if (result.err) return;

    if (cbparameters && cbparameters._cb) {
      cbparameters._cb(rez, cbparameters, data);
    }

    return rez;
  }

  login = async (cb: any, cbparameters: any, data: LoginDto) => {
    cbparameters = cbparameters ? cbparameters : {};
    cbparameters._cb = cb;
    const t = await this.repository.login(this.handleGet, cbparameters, data);
    if (cb === undefined) {
      return this.handleGet(t);
    }
  };

  token = async (cb: any, cbparameters: any) => {
    cbparameters = cbparameters ? cbparameters : {};
    cbparameters._cb = cb;
    const t = await this.repository.token(this.handleGet, cbparameters);
    if (cb === undefined) {
      return this.handleGet(t);
    }
  };
}
