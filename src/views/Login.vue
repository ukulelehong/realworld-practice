<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign in</h1>
          <p class="text-xs-center">
            <router-link to="/register">Have an account?</router-link>
          </p>

          <ul class="error-messages">
            <li v-for="msg in errorsMessage">{{ msg }}</li>
          </ul>

          <form>
            <fieldset class="form-group">
              <input
                v-model="userFormData.email"
                class="form-control form-control-lg"
                type="text"
                placeholder="Email"
                :disabled = "userStore.loading"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="userFormData.password"
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
                :disabled = "userStore.loading"
              />
            </fieldset>
            <button
              class="btn btn-lg btn-primary pull-xs-right"
              @click="signIn"
              :disabled = "userStore.loading"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue"
//这是表单数据校验的第三方库
import Schema, { InternalRuleItem, Rules } from "async-validator"
import { LoginUser } from "../apis/user"
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
const descriptor: Rules = {
  email: {
    type: "string",
    required: true,
    asyncValidator: (rule: InternalRuleItem, value: string) => {
      return new Promise((resolve, reject) => {
        const reg = /^([A-z0-9_-]+)@([A-z0-9_-]+)+(\.([A-z0-9_-]+))+$/g
        if (value.match(reg)) {
          resolve()
        } else {
          reject("输入的邮箱有误，请重新输入") // reject with error message
        }
      })
    },
  },
  password: {
    type: "string",
    required: true,
    asyncValidator: (rule: InternalRuleItem, value: string) => {
      return new Promise((resolve, reject) => {
        const reg = /^(?=.*[a-zA-Z])(?=.*\d).{1,9}$/g
        if (value.match(reg)) {
          resolve()
        } else {
          reject("至少包含字母、数字，1-9位") // reject with error message
        }
      })
    },
  },
}
const validator = new Schema(descriptor)

//创建响应式数据用于存储用户信息
const userFormData = reactive<LoginUser>({
  email: "",
  password: ""
})

const router = useRouter()
const userStore  = useUserStore()

// 收集错误提示信息
const errorsMessage = reactive<string[]>([])

async function signIn(e: Event) {
  e.preventDefault()
  errorsMessage.splice(0, errorsMessage.length)
  try {
    const result = await validator.validate(userFormData)
    try {
      userStore.login(result as LoginUser)
      router.push('/')
    } catch (err) {
      return alert("登录失败！")
    }
  } catch ({ errors, fields }) {
    Object.keys(fields as any).forEach((key) => {
      errorsMessage.push((fields as any)[key][0].message)
    })
  }
}
</script>
