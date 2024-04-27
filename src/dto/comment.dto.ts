import { CommonTools } from "tools/commontools";

export class CommentDto {
    id:string;
    idpost: string;
    content: string;

    constructor(idpost: string, content?: string) {
        this.id = CommonTools.generateRandomString(10);
        this.idpost = idpost;
        this.content = content || '';
    }
}