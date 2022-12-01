<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <a class="navbar-brand" href="index.html">conduit</a>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <!-- Add "active" class when you're on that page" -->
          <router-link class="nav-link active" to="/">Home</router-link>
        </li>
        <template v-if="userStore.isLogin">
          <li class="nav-item">
            <router-link class="nav-link" to="/article/article-slug-here">
              <i class="ion-compose"></i>&nbsp;New Article
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/settings">
              <i class="ion-gear-a"></i>&nbsp;Settings
            </router-link>
          </li>
        </template>
        <li class="nav-item">
          <router-link class="nav-link" to="/login">Sign in</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/register">Sign up</router-link>
        </li>
        <li class="nav-item avatar" v-if="userStore.isLogin">
          <router-link class="nav-link" to=""
            ><img :src="userStore.user?.image" class="user-pic" alt="user-img" />&nbsp;{{
              userStore.user?.username
            }}</router-link
          >
          <div class="menu">
            <ul>
              <li @click="userStore.signOut">退出登录</li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useUserStore } from "../../stores/user";
const userStore = useUserStore()
</script>

<style scoped>
.menu {
  display: none;
}

.menu ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.menu ul li{
  cursor: pointer;
}

.avatar:hover .menu {
  display: flex;
  position: absolute;
  background-color: white;
  border-radius: 4px;
}
</style>
