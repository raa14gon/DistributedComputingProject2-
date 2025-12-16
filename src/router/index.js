import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import Cars from '../pages/Cars.vue';
import VintageRacing from '../pages/VintageRacing.vue';
import Login from '../pages/Login.vue';
import SignUp from '../pages/SignUp.vue';
import Admin from '../pages/Admin.vue';

const routes = [
    { path: '/', component: Login },
    { path: '/Home', component: Home },
    { path: '/Login', component: Login },
    { path: '/SignUp', component: SignUp },
    { path: '/Admin', component: Admin },
    { path: '/Cars', component: Cars },
    { path: '/VintageRacing', component: VintageRacing },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router;