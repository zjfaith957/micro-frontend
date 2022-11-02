<!-- 菜单栏 -->
<template>
    <q-drawer
    v-model="drawer"
    show-if-above
    :width="200"
    :breakpoint="500"
  >
    <q-scroll-area class="fit">
      <q-list padding class="menu-list">
        <q-item clickable v-ripple v-for="(item,index) in menuList" :key="index"  :active="index === currentIndex" @click="change(item,index)">
          <q-item-section avatar>
            <q-icon :name="item.icon" />
          </q-item-section>
          <q-item-section>
            {{item.name}}
          </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<script setup>
import { ref,reactive,toRefs } from 'vue'
import { useRouter } from 'vue-router'

const state = reactive({
  menuList:[
    {
      name:'应用管理',
      icon:'inbox',
      url:'/applicationManage',
    },
    {
      name:'业务主体管理',
      icon:'star',
      url:'/businessManage'
    },
    {
      name:'数据查询',
      icon:'send',
      url:'/dataQuery'
    },
    {
      name:'vue3',
      icon:'send',
      url:'/vue3'
    }
  ],
  currentIndex:0,
})

const { menuList,currentIndex } = toRefs(state)

const router = useRouter()
const emit = defineEmits(['updateSubTitle'])

const change = (item,index) => {
  currentIndex.value = index
  emit('updateSubTitle',item.name)
  router.push({ path: item.url})
}

</script>

<style lang="scss" scoped>
:deep(.q-drawer){
  background:#304156;
  .q-item{
    color:#bfcbd9;
  }
  .q-item--active{
    color:#409eff;
  }
}
</style>