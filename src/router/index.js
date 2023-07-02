import { createRouter, createWebHistory } from 'vue-router'
import PageHome from '@/views/PageHome.vue'
import BoardList from '@/views/board/BoardList.vue'
import PostWrite from '@/views/board/PostWrite.vue';

const routes = [
  {
    path: '/',
    name: 'PageHome',
    component: PageHome
  },
  {
    path: '/board/list',
    name: 'BoardList',
    component: BoardList
  },
  {
    path:'/board/PostWrite'
    ,name:'PostWrite'
    ,component: PostWrite
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router