<!-- 主页 -->
<template>
    <q-layout view="hHh Lpr lff" container style="height: 100%" class="rounded-borders">
      <q-header elevated>
        <q-toolbar>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
          <q-toolbar-title>Header</q-toolbar-title>
        </q-toolbar>
      </q-header>
      <!-- 菜单栏 -->
      <MenuBar @updateSubTitle="updateSubTitle"></MenuBar>
      <!-- 通常，QPageContainer 是布局模板的一部分(其中仅包含<router view/>子元素)，其内容放入/src/pages 下的单独 vue 文件中。 -->
      <q-page-container>
        <div class="sub-title">{{subTitle}}</div>
        <router-view />
      </q-page-container>
    </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import MenuBar from './MenuBar.vue'

const subTitle =ref('应用管理')

const updateSubTitle = (val) => {
  subTitle.value = val
}

</script>

<style lang="scss" scoped>
.q-header{
  background:#fff; 
}
.sub-title{
  position:relative;
  height:46px;
  line-height:46px;
  padding-left:30px;
  background:#f5f5f5;
  font-size:14px;
  font-weight: 900;
  color:#495060;
  &::after{
    content: "";
    position: absolute;
    background: #495060;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    top:50%;
    left:18px;
    margin-top:-3px;
  }
}
</style>
