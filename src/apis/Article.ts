import { LocationQueryValue } from "vue-router";
import { instance } from "./request";
import { Author } from "./user";

//知识点：type和interface的区别
export type ListArticlesParams = {
  tag?: string|LocationQueryValue[];
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


//获取文章列表
export function listArticles(params: ListArticlesParams = {}) {
  return instance.get<ListArticlesRes>(`/articles`,{
    params,
  });
}

//获取文章详情
export function getArticle(slug: string) {
  return instance.get(`/articles/${slug}`);
}


