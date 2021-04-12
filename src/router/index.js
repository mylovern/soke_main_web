import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home,
        children: [{
            path: '/main',
            component: () =>
                import ('../views/Main.vue'),
            meta: {
                requireAuth: false
            }


        }, {
            path: '/personal',
            component: () =>
                import ('../views/Personal.vue'),
            meta: {
                requireAuth: true
            }

        }, {
            path: '/flow',
            component: () =>
                import ('../views/FlowPool.vue'),
            meta: {
                requireAuth: true
            }

        }, {
            path: '/flowdata',
            component: () =>
                import ('../views/Flowpooldata.vue'),
            meta: {
                requireAuth: true
            }

        }, {
            path: '/indexfund',
            component: () =>
                import ('../views/Indexfund.vue'),
            meta: {
                requireAuth: true
            }

        }, {
            path: '/fundhistory',
            component: () =>
                import ('../views/Fundhistory.vue'),
            meta: {
                requireAuth: true
            }

        }, {
            path: '/buy',
            component: () =>
                import ('../views/Buy.vue'),
            meta: {
                requireAuth: true
            }

        }, {
            path: '/redemption',
            component: () =>
                import ('../views/Redemption.vue'),
            meta: {
                requireAuth: true
            }

        }, {
            path: '/indexmarket',
            component: () =>
                import ('../views/IndexMarket.vue'),
            meta: {
                requireAuth: true
            }

        }, {
            path: '/charts',
            component: () =>
                import ('../views/Chart.vue'),
            meta: {
                requireAuth: true
            }

        }, {
            path: '/indexs',
            component: () =>
                import ('../views/Index.vue'),
            meta: {
                requireAuth: true
            }

        }, {
            path: '/trade',
            component: () =>
                import ('../views/Indexhistory.vue'),
            meta: {
                requireAuth: true
            }

        }, {
            path: '/profit-loss',
            component: () =>
                import ('../views/Profitandloss.vue'),
            meta: {
                requireAuth: true
            }

        }],
        redirect: '/main'
    },

]

const router = new VueRouter({
    mode: 'hash',
    routes
})

export default router