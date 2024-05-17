import { CommonTools } from "tools/commontools";

export class CommentDto {
  id?: string;
  idpost: string;
  content: string;
  iduser: string;

  constructor(idpost: string, iduser: string, content?: string) {
    this.iduser = iduser;
    this.idpost = idpost;
    this.content = content || "";
  }

  static filterByIdPost(
    comments: Array<CommentDto>,
    idpost: string
  ): Array<CommentDto> {
    return comments.filter((item) => item.idpost === idpost);
  }
}
