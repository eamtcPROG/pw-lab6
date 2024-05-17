import RequestListDTO from "dto/app/requestlist.dto";
import ResultListDTO from "dto/app/resultlist.dto";
import ResultObjectDTO from "dto/app/resultobject.dto";
import { LoginDto } from "dto/login.dto";
import CommentRepository from "repositories/comment.repository";

export default class CommentService {
  repository: CommentRepository = new CommentRepository();

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

  add = async (cb: any, cbparameters: any, data: any) => {
    cbparameters = cbparameters ? cbparameters : {};
    cbparameters._cb = cb;
    const t = await this.repository.add(this.handleGet, cbparameters, data);
    if (cb === undefined) {
      return this.handleGet(t);
    }
  };

  get = async (id: string, cb: any, cbparameters: any) => {
    cbparameters = cbparameters ? cbparameters : {};
    cbparameters._cb = cb;
    const t = await this.repository.get(id, this.handleGet, cbparameters);
    if (cb === undefined) {
      return this.handleGet(t);
    }
  };

  getByPost = async (id: string, cb: any, cbparameters: any) => {
    cbparameters = cbparameters ? cbparameters : {};
    cbparameters._cb = cb;
    const t = await this.repository.getByPostId(id, this.handleGet, cbparameters);
    if (cb === undefined) {
      return this.handleGet(t);
    }
  };

  getList = async (cb: any, cbparameters: any, data?: RequestListDTO) => {
    cbparameters = cbparameters ? cbparameters : {};
    cbparameters._cb = cb;
    const t = await this.repository.getList(
      this.handleGetList,
      cbparameters,
      data
    );
    if (cb === undefined) {
      return this.handleGetList(t);
    }
  };



  update = async (id: string, cb: any, cbparameters: any, data: any) => {
    cbparameters = cbparameters ? cbparameters : {};
    cbparameters._cb = cb;
    const t = await this.repository.update(
      id,
      this.handleGet,
      cbparameters,
      data
    );
    if (cb === undefined) {
      return this.handleGet(t);
    }
  };

    delete = async (id: string, cb: any, cbparameters: any) => {
        cbparameters = cbparameters ? cbparameters : {};
        cbparameters._cb = cb;
        const t = await this.repository.delete(id, this.handleGet, cbparameters);
        if (cb === undefined) {
        return this.handleGet(t);
        }
    };
}
