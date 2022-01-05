import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/profilExample',
    name : 'ProfilExample',
    component: () => import(/* webpackChunkName: "about" */ '../views/profileExample.vue')
  },
  {
    path: '/postExample',
    name : 'PostExample',
    component: () => import(/* webpackChunkName: "about" */ '../views/postExample.vue')
  },
  {
    path: '/login',
    name: 'loginPage',
    component: () => import(/* webpackChunkName: "about" */ '../views/loginPage.vue')
  },
  {
    path: '/signup',
    name: 'signupPage',
    component: () => import(/* webpackChunkName: "about" */ '../views/signupPage.vue')
  },
  {
    path: '/postCreationPage',
    name: 'postCreationPage',
    component: () => import(/* webpackChunkName: "about" */ '../views/postCreationPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
