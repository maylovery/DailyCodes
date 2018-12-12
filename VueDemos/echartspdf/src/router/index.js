import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/pages/Home/Home'
import Test from '@/pages/Test/Test'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/test',
      name: '',
      component: Test
    },
  ]
})
