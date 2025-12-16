import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import Home from '../pages/Home.vue';
import Cars from '../pages/Cars.vue';
import VintageRacing from '../pages/VintageRacing.vue';
import Login from '../pages/Login.vue';
import SignUp from '../pages/SignUp.vue';
import Admin from '../pages/Admin.vue';

const routes = [
    { path: '/', redirect: '/login' },
    { path: '/home', component: Home, meta: { requiresAuth: true } },
    { path: '/login', component: Login },
    { path: '/signup', component: SignUp },
    { path: '/admin', component: Admin, meta: { requiresAuth: true, requiresAdmin: true } },
    { path: '/cars', component: Cars, meta: { requiresAuth: true } },
    { path: '/vintageracing', component: VintageRacing, meta: { requiresAuth: true } },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    const isAuthenticated = authStore.isAuthenticated;
    
    if (to.meta.requiresAuth && !isAuthenticated) {
        next('/login');
    } else if (to.meta.requiresAdmin && !authStore.isAdmin) {
        next('/home'); 
    } else {
        next();
    }
});

export default router;
