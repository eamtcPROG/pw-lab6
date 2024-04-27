import { CommonTools } from "tools/commontools";

export class PostDto {
    id:string;
    title: string;
    content: string;
    

    constructor(title?: string, content?: string) {
        this.id = CommonTools.generateRandomString(10);
        this.title = title || '';
        this.content = content || '';
        
    }
}