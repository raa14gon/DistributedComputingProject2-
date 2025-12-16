<template>
    <div class="login-page">
        <div class="login-container">
            <div class="login-header">
                <h1>70s Car Culture</h1>
                <p>Welcome Back to the Golden Era</p>
            </div>

            <div class="login-card">
                <h2>Login</h2>
                <form @submit.prevent="handleLogin">
                    <div class="form-group">
                        <label for="username">Username</label>
                        <input type="text" id="username" v-model="username" placeholder="Enter your username" required>
                    </div>

                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" v-model="password" placeholder="Enter your password"
                            required>
                    </div>

                    <button type="submit" class="btn-login">
                        Sign In
                    </button>
                </form>

                <div class="login-footer">
                    <p>Don't have an account? <router-link to="/SignUp">Sign up</router-link></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        handleLogin() {
            console.log('Login attempt:', this.username);
            this.$router.push('/Home');
        }
    }
}
</script>

<style scoped>
.login-page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background-color: #92D4F0;
    background-image:
        linear-gradient(45deg, rgba(0, 0, 0, 0.05) 25%, transparent 25%),
        linear-gradient(-45deg, rgba(0, 0, 0, 0.05) 25%, transparent 25%),
        linear-gradient(45deg, transparent 75%, rgba(0, 0, 0, 0.05) 75%),
        linear-gradient(-45deg, transparent 75%, rgba(0, 0, 0, 0.05) 75%);
    background-size: 20px 20px;
    background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
}

.login-container {
    width: 100%;
    max-width: 450px;
    animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.login-header {
    text-align: center;
    width: 100%;
    border-radius: 15px;
    border: 2px solid #1a1a1a;
    box-shadow:
        rgba(0, 0, 0, 0.25) 0px 54px 55px,
        rgba(0, 0, 0, 0.12) 0px -12px 30px,
        rgba(0, 0, 0, 0.12) 0px 4px 6px,
        rgba(0, 0, 0, 0.17) 0px 12px 13px,
        rgba(0, 0, 0, 0.09) 0px -3px 5px;
    background-color: #F58F56;
    margin-bottom: 30px;
    color: #1a1a1a;
}

.login-header h1 {
    font-size: 3em;
    margin: 0 0 10px 0;
    font-family: 'Jersey 25', sans-serif;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    letter-spacing: 2px;
}

.login-header p {
    font-size: 1.2em;
    margin: 0;
    opacity: 0.8;
    font-family: 'Jersey 25', sans-serif;
}

.login-card {
    background-color: whitesmoke;
    border-radius: 15px;
    padding: 40px;
    box-shadow:
        rgba(0, 0, 0, 0.25) 0px 54px 55px,
        rgba(0, 0, 0, 0.12) 0px -12px 30px,
        rgba(0, 0, 0, 0.12) 0px 4px 6px,
        rgba(0, 0, 0, 0.17) 0px 12px 13px,
        rgba(0, 0, 0, 0.09) 0px -3px 5px;
    border: 3px solid #1a1a1a;
}

.login-card h2 {
    text-align: center;
    margin: 0 0 30px 0;
    font-size: 2.5em;
    color: #1a1a1a;
    font-family: 'Jersey 25', sans-serif;
}

.form-group {
    margin-bottom: 25px;
}

.form-group label {
    display: block;
    margin-bottom: 8px;
    font-size: 1.1em;
    font-weight: 600;
    color: #1a1a1a;
    font-family: 'Jersey 25', sans-serif;
}

.form-group input {
    width: 100%;
    padding: 12px 15px;
    font-size: 1em;
    border: 2px solid #1a1a1a;
    border-radius: 8px;
    background-color: white;
    transition: all 0.3s ease;
    font-family: system-ui, Arial, sans-serif;
    box-sizing: border-box;
}

.form-group input:focus {
    outline: none;
    border-color: #646cff;
    box-shadow: 0 0 0 3px rgba(100, 108, 255, 0.1);
    transform: translateY(-2px);
}

.form-group input::placeholder {
    color: #999;
}

.btn-login {
    width: 100%;
    padding: 14px;
    font-size: 1.2em;
    font-weight: 600;
    color: white;
    background-color: #1a1a1a;
    border: 2px solid #1a1a1a;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: 'Jersey 25', sans-serif;
    letter-spacing: 1px;
    margin-top: 10px;
}

.btn-login:hover {
    background-color: #646cff;
    border-color: #646cff;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(100, 108, 255, 0.3);
}

.btn-login:active {
    transform: translateY(0);
}

.login-footer {
    text-align: center;
    margin-top: 25px;
    padding-top: 20px;
    border-top: 2px solid #ddd;
}

.login-footer p {
    margin: 0;
    font-size: 1em;
    color: #666;
}

.login-footer a {
    color: #646cff;
    text-decoration: none;
    font-weight: 600;
    transition: color 0.3s ease;
}

.login-footer a:hover {
    color: #535bf2;
    text-decoration: underline;
}

/* Responsividade */
@media (max-width: 768px) {
    .login-header h1 {
        font-size: 2.5em;
    }

    .login-header p {
        font-size: 1em;
    }

    .login-card {
        padding: 30px 25px;
    }

    .login-card h2 {
        font-size: 2em;
    }

    .form-group label {
        font-size: 1em;
    }

    .btn-login {
        font-size: 1.1em;
        padding: 12px;
    }
}

@media (max-width: 480px) {
    .login-page {
        padding: 15px;
    }

    .login-header h1 {
        font-size: 2em;
        letter-spacing: 1px;
    }

    .login-header p {
        font-size: 0.9em;
    }

    .login-card {
        padding: 25px 20px;
        border-radius: 12px;
    }

    .login-card h2 {
        font-size: 1.8em;
        margin-bottom: 25px;
    }

    .form-group {
        margin-bottom: 20px;
    }

    .form-group label {
        font-size: 0.95em;
        margin-bottom: 6px;
    }

    .form-group input {
        padding: 10px 12px;
        font-size: 0.95em;
    }

    .btn-login {
        font-size: 1em;
        padding: 11px;
    }

    .login-footer p {
        font-size: 0.9em;
    }
}

@media (max-width: 360px) {
    .login-header h1 {
        font-size: 1.7em;
    }

    .login-card {
        padding: 20px 15px;
    }

    .login-card h2 {
        font-size: 1.5em;
    }
}
</style>