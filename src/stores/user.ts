import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => {
    return { isLogin: false }
  },
  // 也可以定义为
  // state: () => ({ count: 0 })
  actions: {
    async login() {
      this.isLogin = true
    },
  },
})