import Vue from 'vue'
import VueRouter from 'vue-router'
import abnormalLivingBody from '../views/abnormal_face'

Vue.use(VueRouter)

const routes = [
  {
    path: '/abnormal_face',
    name: 'Abnormal_face',
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
