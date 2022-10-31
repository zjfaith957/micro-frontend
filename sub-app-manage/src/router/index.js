import { createRouter, createWebHashHistory } from 'vue-router'

// ↓定义路由
const routes = [
    {
        path: '/',
        redirect: '/applicationManage'
    },
    // ↓登录页
    {
        path: '/applicationManage',
        name: 'ApplictionManage',
        component: () => import('@/views/ApplicationManage.vue')
    }
]

// ↓创建路由实例并传递routes
const router = createRouter({
    // ↓router内部提供了history模式的实现，使用hash模式
    history: createWebHashHistory(),
    routes,
})

export default router