import { createRouter, createWebHistory } from 'vue-router'
import ThreeModelLoader from '../views/ThreeModelLoader.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'ThreeModelLoader',
      component: ThreeModelLoader
    }
  ]
})

export default router
