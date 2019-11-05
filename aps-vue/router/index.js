import Vue from 'vue'
import VueRouter from 'vue-router'
import abnormalLivingBody from '../views/abnormal_living_body'

Vue.use(VueRouter)

const routes = [
  {
    path: '/abnormal_living_body',
    name: 'Abnormal_Living_Body',
    component: abnormalLivingBody
  },
  {
    path: '/abnormal_ocr',
    name: 'Abnormal_ocr',
    component: () => import(/* webpackChunkName: "Abnormal_ocr" */ '../views/abnormal_ocr')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
