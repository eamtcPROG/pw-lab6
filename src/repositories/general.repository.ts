import axios from "axios";
import MessageDto from "dto/app/message.dto";
import RequestListDTO from "dto/app/requestlist.dto";

import { MessageTypes } from "tools/messagetypes";

const processAxiosResult = (data: any): any => {
  if (
    data &&
    data != undefined &&
    data != null &&
    data.messages &&
    data.messages != undefined &&
    data.messages != null
  ) {
    if (GeneralRepository.messagesF) {
      for (var i in data.messages) {
        GeneralRepository.messagesF(data.messages[i]);
      }
    }
  }
};

const processAxiosSuccess = (
  data: any,
  url: string,
  cb?: any,
  options?: any,
  cbparameters?: any
): any => {
  const result = data.data ? data.data : null;

  processAxiosResult(result);

  if (!cb || cb == undefined || cb == null) return result;

  cb(result, cbparameters, data);

  return result;
};

const processAxiosError = (
  error: any,
  url: string,
  cb?: any,
  options?: any,
  cbparameters?: any
): any => {
  if (
    error &&
    error != undefined &&
    error != null &&
    error.response &&
    error.response != undefined &&
    error.response != null &&
    error.response.data &&
    error.response.data != undefined &&
    error.response.data != null
  ) {
    if (error.response.data.statusCode) {
      const obj = new MessageDto();
      obj.code = error.response.data.statusCode;
      obj.message = error.response.data.message;
      obj.mestype = MessageTypes.MESSAGE_ERROR;

      if (GeneralRepository.messagesF) {
        GeneralRepository.messagesF(obj);
      }
    } else {
      if (error.response.data.messages) {
        if (GeneralRepository.messagesF) {
          for (var i in error.response.data.messages) {
            GeneralRepository.messagesF(error.response.data.messages[i]);
          }
        }
      }
    }
  }

  return "";
};

export default class GeneralRepository {
  private static tokenF: any = false;

  public static messagesF: any = false;

  static setToken(tokenF: any) {
    GeneralRepository.tokenF = tokenF;
  }

  static setMessagesF(mF: any) {
    GeneralRepository.messagesF = mF;
  }

  // ---------------------------------------

  static getToken() {
    if (GeneralRepository.tokenF) {
      return GeneralRepository.tokenF();
    }
    return "";
  }

  // ---------------------------------------

  getAxiosInstance(): any {
    const h: any = {};
    h["Content-Type"] = "application/json";

    const token = GeneralRepository.getToken();
    if (token) {
      h["Authorization"] = "Bearer " + token;
    }

    const instance = axios.create({
      baseURL: process.env.REACT_APP_API_SERVER,
      //   timeout: 1000,
      headers: h,
    });

    return instance;
  }

  // ---------------------------------------

  async getAxios(
    url: string,
    cb?: any,
    options?: any,
    cbparameters?: any
  ): Promise<any> {
    const instance = this.getAxiosInstance();

    try {
      const response = await instance.get(url, options);
      return processAxiosSuccess(response, url, cb, options, cbparameters);
    } catch (error) {
      return processAxiosError(error, url, cb, options, cbparameters);
    }
  }

  async postAxios(
    url: string,
    cb?: any,
    options?: any,
    cbparameters?: any
  ): Promise<any> {
    const instance = this.getAxiosInstance();

    return instance
      .post(url, JSON.stringify(options))
      .then(function (data: any) {
        return processAxiosSuccess(data, url, cb, options, cbparameters);
      })
      .catch(function (error: any) {
        return processAxiosError(error, url, cb, options, cbparameters);
      })
      .finally(function () {});
  }

  async putAxios(
    url: string,
    cb?: any,
    options?: any,
    cbparameters?: any
  ): Promise<any> {
    const instance = this.getAxiosInstance();

    return instance
      .put(url, JSON.stringify(options))
      .then(function (data: any) {
        return processAxiosSuccess(data, url, cb, options, cbparameters);
      })
      .catch(function (error: any) {
        return processAxiosError(error, url, cb, options, cbparameters);
      })
      .finally(function () {});
  }
  async deleteAxios(url: string, cb?: any, cbparameters?: any): Promise<any> {
    const instance = this.getAxiosInstance();

    return instance
      .delete(url)
      .then(function (data: any) {
        return processAxiosSuccess(data, url, cb, undefined, cbparameters);
      })
      .catch(function (error: any) {
        return processAxiosError(error, url, cb, undefined, cbparameters);
      })
      .finally(function () {});
  }

  // ---------------------------------------

  static processListData(data?: RequestListDTO) {
    var rez: any = {};
    rez.params = {};

    data = data ?? new RequestListDTO();

    if (data.page != null && data.page !== undefined) {
      rez.params.page = data.page;
    }

    if (data.onpage != null && data.onpage !== undefined) {
      rez.params.onpage = data.onpage;
    }

    if (data.sortcriteria != null && data.sortcriteria !== undefined) {
      var str = "";
      for (var i in data.sortcriteria) {
        str += str ? "|" : "";
        str += data.sortcriteria[i].field;
        str += ",";
        str += data.sortcriteria[i].asc ? "asc" : "";
      }
      rez.params.order = str;
    }

    if (data.filters != null && data.filters !== undefined) {
      var str = "";
      for (var i in data.filters) {
        str += str ? "|" : "";
        str += data.filters[i].field;
        str += ",";
        str += data.filters[i].values ? data.filters[i].values?.join(",") : "";
      }
      rez.params.filters = str;
    }

    return rez;
  }

  async _get(url: string, cb?: any, cbparameters?: any): Promise<any> {
    return await this.getAxios(url, cb, {}, cbparameters);
  }

  async _getList(
    url: string,
    cb?: any,
    cbparameters?: any,
    data?: RequestListDTO
  ): Promise<any> {
    const _data = GeneralRepository.processListData(data);
    return await this.getAxios(url, cb, _data, cbparameters);
  }
}
