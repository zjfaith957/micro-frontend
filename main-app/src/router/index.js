import { createRouter, createWebHashHistory } from 'vue-router'

// ↓定义路由
const routes = [
    // ↓layout父路由
    {
        // ↓路由地址
        path: '/',
        // ↓路由名称（唯一值），在路由跳转时能用到
        name: '',
        // ↓路由渲染组件
        component: () => import('@/views/layout/index.vue'),
        // ↓重定向
        redirect: { name: 'ApplicationManage' },
        // ↓子路由
        children: [
            // ↓应用管理
            {
                path: '/applicationManage',
                name: 'ApplicationManage',
                component: () => import('@/views/base-manage/ApplicationManage.vue')
            },
            // ↓vue3
            {
                path: '/vue3',
                name: 'vue3',
                component: () => import('@/views/vue3.vue')
            },
        ]
    },
    // ↓登录页
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/Login.vue')
    },
]

// ↓创建路由实例并传递routes
const router = createRouter({
    // ↓router内部提供了history模式的实现，使用hash模式
    history: createWebHashHistory(),
    routes,
})

export default router