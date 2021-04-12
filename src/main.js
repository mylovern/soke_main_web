import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router'
Vue.use(ElementUI);
import VueClipBoard from 'vue-clipboard2'
import Web3 from 'web3'
Vue.prototype.Web3 = Web3

Vue.use(VueClipBoard);

Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {
        if (localStorage.getItem('token') !== null) {
            next()
        } else {
            next({ path: '/main' })
            location.reload()

        }
    } else {
        next()
    }


})
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')