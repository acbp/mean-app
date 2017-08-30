import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Product from '@/components/product'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Product
    },
    {
      path: '/produtos',
      name: 'Produtos',
      component: Hello
    }
  ]
})
