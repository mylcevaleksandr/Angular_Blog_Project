import {ArticleResponseType} from "./article-response.type";

export type BlogResponseType = {
  count: number,
  pages: number,
  items: ArticleResponseType[]
}
