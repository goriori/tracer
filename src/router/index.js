import {createRouter, createWebHistory} from 'vue-router'

const Main = () => import('@/pages/Main.vue')
const Download = () => import('@/pages/DownloadSVG.vue')
const EditorMap = () => import('@/pages/EditorMap.vue')
const EditorSVG = () => import('@/pages/EditorSVG.vue')
const Ui = () => import('@/pages/Ui.vue')
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Main,
        },
        {
            path: '/download',
            name: 'download',
            component: Download,
        },
        {
            path: '/editor/map',
            name: 'editor',
            component: EditorMap,
        },
        {
            path: '/editor/svg',
            name: 'editor',
            component: EditorSVG,
        },
        {
            path: '/ui',
            name: 'ui',
            component: Ui,
        }
    ],
})
router.beforeEach((to, from, next) => {
    next()
})
export default router
