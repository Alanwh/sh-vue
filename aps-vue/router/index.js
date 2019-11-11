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
  },
  {
    path: '/order_list',
    name: 'Order_list',
    component: () => import(/* webpackChunkName: "Order_list" */ '../views/order_list')
  },
  {
    path: '/iou_list',
    name: 'Iou_list',
    component: () => import(/* webpackChunkName: "Iou_list" */ '../views/iou_list')
  },
  {
    path: '/repay_list',
    name: 'Repay_list',
    component: () => import(/* webpackChunkName: "Repay_list" */ '../views/repay_list')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
