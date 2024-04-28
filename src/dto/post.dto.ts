import { CommonTools } from "tools/commontools";

export class PostDto {
  id: string;
  title: string;
  content: string;

  constructor(title?: string, content?: string) {
    this.id = CommonTools.generateRandomString(10);
    this.title = title || "";
    this.content = content || "";
  }

  static filter(posts: Array<PostDto>, searchText: string): Array<PostDto> {
    return posts.filter(
      (item) =>
        item.title.toLowerCase().includes(searchText.toLowerCase()) ||
        item.content.toLowerCase().includes(searchText.toLowerCase())
    );
  }
}
