import { instance } from "./request";
import { Author } from "./user";

//知识点：type和interface的区别
export type ListArticlesParams = {
  tag?: string;
  author?: string;
  favorited?: string;
  limit?: number;
  offset?: number;
}

export type ListArticlesRes = {
  articles: ListArticles;
  articlesCount: number;
}

export type ListArticles = {
  author: Author;
  body: string;
  createdAt: string;
  description: string;
  favorited: boolean;
  favoritesCount: number;
  slug: string;
  tagList: (string)[];
  title: string;
  updatedAt: string;
}[]



export function listArticles(params: ListArticlesParams = {}) {
  return instance.get<ListArticlesRes>(`/articles`,{
    params,
  });
}


