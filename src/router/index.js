import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import Cars from '../pages/Cars.vue';
import VintageRacing from '../pages/VintageRacing.vue';

const routes = [
    { path: '/', component: Home },
    { path: '/Cars', component: Cars },
    { path: '/VintageRacing', component: VintageRacing },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router;