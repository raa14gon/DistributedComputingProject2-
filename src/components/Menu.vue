<template>
    <nav>
        <div class="logo">
            <h2>70's</h2>
            <h3>CarCulture</h3>
        </div>

        <div class="links">
            <router-link to="/">Home</router-link>
            <router-link to="/Cars">Cars </router-link>
            <router-link to="/VintageRacing">Vintage Racing</router-link>
            <router-link to="/Admin" v-if="authStore.isAdmin">Admin</router-link>
        </div>

    </nav>
</template>

<script setup>
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();
</script>

<style>
nav {
    align-items: center;
    border-top: 8px solid black;
    border-bottom: 8px solid black;
    display: flex;
    height: 70px;
    background-color: #F58F56;
    justify-content: space-between;
    padding-right: 20px;
}

.logo {
    margin-left: 20px;
    gap: 0px !important;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 65px;
    height: 65px;
    background-color: white;
    border-radius: 50%;
}

.logo h2 {
    font-weight: bold;
    font-size: 20px;

}

.logo h3 {

    font-weight: bold;
    font-size: 12px;
}

.links {
    display: flex;
    margin-left: 30px;
    gap: 20px;
    flex: 1;
}

.links a {
    font-weight: bold;
    text-decoration: underline;
    text-decoration: none;
    color: black;
    font-weight: bold;
    font-size: 20px;

    &:hover {
        color: white;
    }
}

.admin-link {
    display: flex;
    align-items: center;
}

.admin-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 20px;
    background-color: #1a1a1a;
    color: white;
    text-decoration: none;
    border-radius: 8px;
    font-weight: bold;
    font-size: 18px;
    transition: all 0.3s ease;
    border: 2px solid #1a1a1a;
}

.admin-btn:hover {
    background-color: white;
    color: #1a1a1a;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.admin-icon {
    font-size: 20px;
    display: inline-block;
    transition: transform 0.3s ease;
}

.admin-btn:hover .admin-icon {
    transform: rotate(90deg);
}

@media (max-width: 768px) {
    nav {
        padding-right: 10px;
    }

    .links {
        margin-left: 15px;
        gap: 15px;
    }

    .links a {
        font-size: 16px;
    }

    .admin-btn {
        padding: 8px 15px;
        font-size: 16px;
        gap: 6px;
    }

    .admin-icon {
        font-size: 18px;
    }
}

@media (max-width: 480px) {
    nav {
        flex-wrap: wrap;
        height: auto;
        padding: 10px;
    }

    .logo {
        margin-left: 10px;
        width: 50px;
        height: 50px;
    }

    .logo h2 {
        font-size: 16px;
    }

    .logo h3 {
        font-size: 10px;
    }

    .links {
        order: 3;
        width: 100%;
        justify-content: center;
        margin: 10px 0 0 0;
        gap: 10px;
    }

    .links a {
        font-size: 14px;
    }

    .admin-link {
        margin-left: auto;
    }

    .admin-btn {
        padding: 6px 12px;
        font-size: 14px;
    }

    .admin-icon {
        font-size: 16px;
    }
}
</style>