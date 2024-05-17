import RequestListDTO from "dto/app/requestlist.dto";
import GeneralRepository from "./general.repository";

export default class PostRepository extends GeneralRepository {
  private mainUrl: string = "post";

  add = async (cb: any, params: any, data: any) => {
    const url = `${this.mainUrl}`;
    return await this.postAxios(url, cb, data, params);
  };

  get = async (id: string, cb?: any, cbparameters?: any): Promise<any> => {
    const url = `${this.mainUrl}/${id}`;
    return await this._get(url, cb, cbparameters);
  };

  getList = async (
    cb?: any,
    cbparameters?: any,
    data?: RequestListDTO
  ): Promise<any> => {
    const url = `${this.mainUrl}`;
    return await this._getList(url, cb, cbparameters, data);
  };

  update = async (id: string, cb: any, params: any,data:any) => {
    const url = `${this.mainUrl}/${id}`;
    return await this.putAxios(url, cb, data,params);
  };

  delete = async (id: string, cb: any, params: any) => {
    const url = `${this.mainUrl}/${id}`;
    return await this.deleteAxios(url, cb, params);
  };
}
