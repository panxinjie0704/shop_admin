<template>
  <div id="app" class="app">
    <!-- <router-view></router-view>  -->

    <!--
      keep-alive 组件：能够帮我们缓存组件的状态
     -->
    <keep-alive>
      <!-- 这里是会被缓存的视图组件 -->
      <router-view v-if="$route.meta.keepAlive">
      </router-view>
    </keep-alive>

    <!-- 这里是不被缓存的视图组件 -->
    <router-view v-if="!$route.meta.keepAlive">
    </router-view>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.app {
  width: 100%;
  height: 100%;
}
</style>
