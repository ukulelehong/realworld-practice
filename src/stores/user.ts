import { defineStore } from "pinia"
import { authentication, Author, getCurrentUser, LoginUser } from "../apis/user"

export const useUserStore = defineStore<
  "user",
  { user: Author; isLogin: boolean; loading: boolean },
  any,
  {
    getUser(): void
    login(user: LoginUser): void
    signOut(): void
  }
>({
  id: "user",
  state: () => ({
    user: {
      bio: null,
      following: false,
      image: "",
      username: "",
    },
    isLogin: false,
    loading: false,
  }),
  actions: {
    async login(result: LoginUser) {
      this.loading = true
      const data = await authentication(result)
      localStorage.setItem("token", data.user.token)
      delete data.user.token
      this.user = data.user
      this.loading = false
      this.isLogin = true
    },
    async getUser() {
      const data = await getCurrentUser()
      this.user = data.user
    },
    signOut() {
      localStorage.removeItem("token")
      this.isLogin = false
    },
  },
})
