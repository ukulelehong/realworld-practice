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
                <a class="nav-link active" href="">Global Feed</a>
              </li>
            </ul>
          </div>

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

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <a href="" class="tag-pill tag-default">programming</a>
              <a href="" class="tag-pill tag-default">javascript</a>
              <a href="" class="tag-pill tag-default">emberjs</a>
              <a href="" class="tag-pill tag-default">angularjs</a>
              <a href="" class="tag-pill tag-default">react</a>
              <a href="" class="tag-pill tag-default">mean</a>
              <a href="" class="tag-pill tag-default">node</a>
              <a href="" class="tag-pill tag-default">rails</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { ListArticles, listArticles } from "../apis/Article";

const articles = ref<ListArticles>([]);
const offset = ref(0);
//设置loading防止重复加载
const loading = ref(true);

listArticles({
  offset: offset.value,
})
  .then((data) => {
    // console.log(data.articles);
    articles.value = data.articles;
  })
  .finally(() => {
    loading.value = false;
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
    offset.value++;
    if (scrollHeight - 100 <= scrollTop + clientHeight) {
      loading.value = true;
      const data = await listArticles({
        offset: offset.value,
      });
      articles.value = [...articles.value, ...data.articles];
      
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
.article-title {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
</style>
