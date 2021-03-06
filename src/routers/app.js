import Vue from 'vue';
import VueRouter from 'vue-router';
import { isAuthenticated } from '../lib/auth';
import Home from '../pages/Home.vue';
import Callback from '../pages/Callback.vue';
import Register from '../pages/Register.vue';
import Login from '../pages/Login.vue';

Vue.use(VueRouter);

const router = new VueRouter({
    linkActiveClass: 'active',
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/calls',
            name: 'calls',
            component: Home,
            props: { tab: 'calls' },
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/profile',
            name: 'profile',
            component: Home,
            props: { tab: 'profile' },
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/callback',
            name: 'auth-callback',
            component: Callback
        },
        {
            path: '/register',
            name: 'register',
            component: Register
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        }
    ]
});

/**
 * Provide navigation guard for authenticated routes
 * @param  {Function} (to, from, next)
 * @return {void}
 */
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        console.log('authenticated route');
        isAuthenticated()
            .then(() => {
                console.log('authenticated', to);
                next();
            })
            .catch(() => {
                console.log('not authenticated', to);
                next({ name: 'login' });
            });
        return;
    }
    console.log('unauthenticated route');
    next();
});

export default router;
