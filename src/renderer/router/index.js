import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'master-barcode',
      component: require('@/components/MasterBarcode').default
    },
    {
      path: '/compare',
      name: 'compare-barcode',
      component: require('@/components/CompareBarcode').default
    },
    {
      path: '/lock',
      name: 'lock-program',
      component: require('@/components/LockProgram').default
    },
    {
      path: '/logdata',
      name: 'log-data',
      component: require('@/components/LogData').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
