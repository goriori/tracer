import { createRouter, createWebHistory } from 'vue-router'

const Main = () => import('@/pages/Main.vue')
const Download  = ()  => import('@/pages/DownloadSVG.vue')
const Editor =  ()  => import('@/pages/Editor.vue')
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component:Main,
    },
    {
      path:'/download',
      name:  'download',
      component:Download,
    },
    {
      path:'/editor',
      name:  'editor',
      component:Editor,
    }
  ],
})
router.beforeEach((to, from, next) => {
  next()
})
export default router
