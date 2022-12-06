import { defineStore } from "pinia"
import { Article, getArticle } from "../apis/article"

export const useArticleStore = defineStore<
  "article",
  { article: Article },
  any,
  {
    getCurrentArticle(slug: string): void
  }
>({
  id: "article",
  state: () => ({
    article: {
      author: {
        username: "",
        bio: null,
        image: "",
        following: false,
      },
      body: "",
      createdAt: "",
      description: "",
      favorited: false,
      favoritesCount: 0,
      slug: "",
      tagList: [],
      title: "",
      updatedAt: "",
    },
  }),
  actions: {
    async getCurrentArticle(slug: string) {
      const getArticleRes = await getArticle(slug)
      this.article = getArticleRes.article
    },
  },
})
