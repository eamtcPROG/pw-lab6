import { CommonTools } from "tools/commontools";

export class PostDto {
  id?: string;
  title: string;
  content: string;
  iduser: string;

  constructor(iduser: string, title?: string, content?: string) {
    
    this.title = title || "";
    this.content = content || "";
    this.iduser = iduser || "";
  }

  static filter(posts: Array<PostDto>, searchText: string): Array<PostDto> {
    return posts.filter(
      (item) =>
        item.title.toLowerCase().includes(searchText.toLowerCase()) ||
        item.content.toLowerCase().includes(searchText.toLowerCase())
    );
  }
}
