import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: '*',
        redirect: {
            path: '/home'
        }
    },
    {
        path: '/home',
        component: () => import(/* webpackChunkName: 'home' */ '@views/home/Home.vue')
    },
    {
        path: '/blog',
        component: () => import(/* webpackChunkName: 'blog' */ '@views/blog/Blog.vue')
    },
    {
        path: '/detail',
        component: () => import(/* webpackChunkName: 'detail' */ '@views/blog/Detail.vue')
    }
];

const router = new VueRouter({
    routes
});

export default router;
