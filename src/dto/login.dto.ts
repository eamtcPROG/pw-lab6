import Idto from "interfaces/idto.interface";

export class LoginDto implements Idto {
  email: string;
  password: string;

  constructor(email?: string, password?: string) {
    this.email = email || "";
    this.password = password || "";
  }
}