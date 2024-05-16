import { LoginDto } from "dto/login.dto";
import GeneralRepository from "./general.repository";

export default class AuthRepository extends GeneralRepository {
  private mainUrl: string = "auth";

  login = async (cb: any, params: any, data: LoginDto) => {
    const url = `${this.mainUrl}/login`;
    return await this.postAxios(url, cb, data, params);
  };

  token = async (cb?: any, cbparameters?: any): Promise<any> => {
    const url = `${this.mainUrl}/token`;
    return await this._get(url, cb, cbparameters);
  };
}
