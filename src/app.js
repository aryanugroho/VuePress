import Vue from 'vue'
import App from './App.vue'
import store from './vuex/store'
import router from './router.js'
import { sync } from 'vuex-router-sync'
import {createApolloClient} from './apollo'
import VueApollo from 'vue-apollo'
import VueResource from 'vue-resource'

Vue.use(VueApollo)
Vue.use(VueResource)

export function createApp (context) {
  console.log(context)
  // 同步路由状态(route state)到 store
  const apolloClient = createApolloClient(context.ssr)
  const apolloProvider = new VueApollo({
    defaultClient: apolloClient
  })
  sync(store, router)
  // 创建应用程序实例，将 router 和 store 注入
  const app = new Vue({
    el: '#app',
    store,
    router,
    apolloProvider,
    ...App,
    render: h => h(App)
  })
  // 暴露 app, router 和 store。
  return { app, router, store }
}