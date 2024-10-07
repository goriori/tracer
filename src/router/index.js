import {createRouter, createWebHistory} from 'vue-router'

const Main = () => import('@/pages/Main.vue')
const Editor = () => import('@/pages/Editor.vue')
const Ui = () => import('@/pages/Ui.vue')
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Main,
            meta: {
                name: 'Главная страница',
                isVisibility: false
            }
        },
        {
            path: '/editor',
            name: 'Editor',
            component: Editor,
            meta: {
                name: 'Редактор ',
                isVisibility: true
            }
        },
        {
            path: '/ui',
            name: 'Ui',
            component: Ui,
            meta: {
                isVisibility: false
            }
        }
    ],
})
router.beforeEach((to, from, next) => {
    next()
})
export default router
