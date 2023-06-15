import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
    {
        path: '/login',
        component: () => import('@/views/login/index'),
        hidden: true,
        meta: { title: 'Login' }
    },

    {
        path: '/404',
        component: () => import('@/views/404'),
        hidden: true
    },
    {
        path: '/location',
        component: Layout,
        name: 'Location',
        meta: { title: 'Danh sách thông báo', icon: 'el-icon-location' },
        children: [
            {
                path: '/location',
                name: 'Location',
                component: () => import('@/views/location'),
                meta: {
                    title: 'Danh sách thông báo'
                }
            },
        ]
    },
    { path: '*', redirect: '/location', hidden: true }
]

const createRouter = () => new Router({
    // mode: 'history', // require service support
    mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {

    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router
