import { defineStore } from "pinia"
import { getArticle } from "../apis/Article"


export const useArticleStore = defineStore({
  id: "article",
  state: () => ({
    article: {}
  }),
  actions: {
    async getCurrentArticle(slug: string){
      const getArticleRes = await getArticle(slug)
      console.log(getArticleRes)
    }
  },
})
