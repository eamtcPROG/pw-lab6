import Idto from "interfaces/idto.interface";

export class UserDto implements Idto {
  id?: string;
  email?: string;
  password?: string;
  roles?: string[];
  name?: string;
  surname?: string;

  static parseFromToken(payload: any): UserDto | null {
    if (!payload.hasOwnProperty("id") || !payload.id) return null;
    const user = new UserDto();

    user.id = payload.id;
    user.email = payload.email ? payload.email : "";
    user.roles = payload.roles ? payload.roles : [];
    user.name = payload.name ? payload.name : "";
    user.surname = payload.surname ? payload.surname : "";
    return user;
  }
}
