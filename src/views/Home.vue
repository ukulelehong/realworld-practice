<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <a class="nav-link disabled" href="">Your Feed</a>
              </li>
              <li class="nav-item">
                <router-link class="nav-link active" to="/"
                  >Global Feed</router-link
                >
              </li>
            </ul>
          </div>
          <!-- Global Feed -->
          <div
            class="article-preview"
            v-for="(article, idx) in articles"
            :key="idx"
          >
            <div class="article-meta">
              <router-link :to="`/profile/${article.author.username}`"
                ><img :src="article.author.image"
              /></router-link>
              <div class="info">
                <router-link
                  :to="`/profile/${article.author.username}`"
                  class="author"
                  >{{ article.author.username }}</router-link
                >
                <span class="date">{{ article.createdAt }}</span>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right">
                <i class="ion-heart"></i> {{ article.favoritesCount }}
              </button>
            </div>
            <router-link :to="`/article/${article.slug}`" class="preview-link">
              <h1 class="article-title">{{ article.title }}</h1>
              <p>{{ article.description }}</p>
              <span>Read more...</span>
            </router-link>
          </div>
        </div>
        <!-- Popular Tags -->
        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>
            <div class="tag-list">
              <router-link
                v-for="(tag, idx) in tags"
                :key="idx"
                :to="`/?tag=${tag}`"
                class="tag-pill tag-default"
                >{{ tag }}</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watchEffect } from "vue";
import { LocationQueryValue, useRoute, useRouter } from "vue-router";
import {
  ListArticles,
  listArticles,
  ListArticlesParams,
} from "../apis/Article";
import { getTags, Tags } from "../apis/tags";

const articles = ref<ListArticles>([]);
const tags = ref<Tags>([]);
const currentTag = ref<string | LocationQueryValue[]>("");
const offset = ref(0);
const limit = 20;
//设置loading防止重复加载
const loading = ref(true);

const router = useRouter();

// 存在问题，滚动时同样会调取一次
watchEffect(async () => {
  if (!router.currentRoute.value.query.tag) {
    listArticles({
      offset: offset.value,
      limit,
    }).then(data => {
      articles.value = data.articles
    }).finally(() => {
      loading.value = false
    })
    return
  }
  currentTag.value = router.currentRoute.value.query.tag as string || '';
  loading.value = true;
  offset.value = 0;
  const params: ListArticlesParams = {
    offset: offset.value,
    tag: currentTag.value,
  };
  if (params.tag === "") {
    delete params.tag;
  }
  const data = await listArticles(params);
  articles.value = data.articles;
  loading.value = false;
});

getTags().then((data) => {
  tags.value = data.tags;
});

/* 理解：
scrollTop为滚动条在Y轴上的滚动距离。
 
clientHeight为内容可视区域的高度。
 
scrollHeight为内容可视区域的高度加上溢出（滚动）的距离。
 
从这个三个属性的介绍就可以看出来，滚动条到底部的条件即为scrollTop + clientHeight == scrollHeight。 */

const onScroll = async (e: Event) => {
  if (loading.value) {
    return;
  }
  const clientHeight: number = document.documentElement.clientHeight;
  const scrollTop: number | undefined = document.scrollingElement?.scrollTop;
  const scrollHeight: number | undefined =
    document.scrollingElement?.scrollHeight;
  if (scrollTop && scrollHeight) {
    if (scrollHeight - 100 <= scrollTop + clientHeight) {
      loading.value = true;
      offset.value += 1;
      const params: ListArticlesParams = {
        offset: offset.value,
        limit,
        tag: currentTag.value,
      };
      if (params.tag === "") {
        delete params.tag;
      }
      const data = await listArticles(params);
      articles.value = [...articles.value, ...data.articles];
      loading.value = false;
    }
  }
};

onMounted(() => {
  document.addEventListener("scroll", onScroll);
});

onUnmounted(() => {
  document.removeEventListener("scroll", onScroll);
});
</script>

<style scoped>
/* 超3行文本出现省略号 */
.article-title {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
</style>
