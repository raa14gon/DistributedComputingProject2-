import { defineStore } from 'pinia';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: localStorage.getItem('token') || null,
        user: JSON.parse(localStorage.getItem('user')) || null,
    }),
    getters: {
        isAuthenticated: (state) => !!state.token,
        isAdmin: (state) => state.user?.role === 'admin'
    },
    actions: {
        async login(username, password) {
            try {
                const response = await axios.post('http://localhost:8000/auth/login', { username, password });
                const { access_token, user } = response.data;

                this.token = access_token;
                this.user = user;

                localStorage.setItem('token', access_token);
                localStorage.setItem('user', JSON.stringify(user));

                axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;

                return true;
            } catch (error) {
                console.error("Login failed", error);
                return false;
            }
        },
        async register(userData) {
            try {
                await axios.post('http://localhost:8000/auth/register', userData);
                return true;
            } catch (error) {
                console.error("Registration failed", error);
                throw error;
            }
        },
        logout() {
            this.token = null;
            this.user = null;
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            delete axios.defaults.headers.common['Authorization'];
        }
    }
});
