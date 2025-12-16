<template>
    <div class="signup-page">
        <div class="signup-container">
            <div class="signup-header">
                <h1>70s Car Culture</h1>
                <p>Join the Golden Era Community</p>
            </div>

            <div class="signup-card">
                <h2>Sign Up</h2>
                <form @submit.prevent="handleSignUp">
                    <div class="form-group">
                        <label for="username">Username</label>
                        <input type="text" id="username" v-model="form.username" placeholder="Choose a username" required>
                    </div>

                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" v-model="form.email" placeholder="Enter your email" required>
                    </div>

                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" v-model="form.password" placeholder="Create a password" required minlength="8">
                    </div>

                    <div class="form-group">
                        <label for="role">Role (Demo)</label>
                         <select v-model="form.role" class="form-control" style="width: 100%; padding: 12px; border: 2px solid #1a1a1a; border-radius: 8px;">
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    <button type="submit" class="btn-signup">
                        Create Account
                    </button>
                </form>

                <p v-if="error" class="error-msg">{{ error }}</p>

                <div class="signup-footer">
                    <p>Already have an account? <router-link to="/Login">Sign in</router-link></p>
                </div>
            </div>
        </div>

        <!-- Success Modal -->
        <div v-if="showSuccess" class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Success!</h3>
                </div>
                <div class="modal-body">
                    <p>Your account has been created successfully.</p>
                </div>
                <div class="modal-footer">
                    <button @click="goToLogin" class="btn-modal">Go to Login</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';

const form = reactive({
  username: '',
  email: '',
  password: '',
  role: 'user'
});
const error = ref('');
const showSuccess = ref(false); // New State
const authStore = useAuthStore();
const router = useRouter();

const handleSignUp = async () => {
    console.log("Attempting registration:", form); // Debug Log
    try {
        const success = await authStore.register(form);
        console.log("Registration result:", success); // Debug Log
        if (success) {
             showSuccess.value = true;
        }
    } catch (err) {
        console.error("Registration error:", err); // Debug Log
        // Handle Axios Network Error object structure
        if (err.code === "ERR_NETWORK") {
             error.value = "Network Error: Cannot connect to server at localhost:8000. Is backend running?";
        } else {
             error.value = err.response?.data?.detail || err.message || 'Registration failed';
        }
    }
};

const goToLogin = () => {
    showSuccess.value = false;
    router.push('/Login');
}
</script>

<style scoped>
.error-msg {
    color: red;
    text-align: center;
    margin-top: 10px;
    font-weight: bold;
}

/* Modal Styles */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    background-color: white;
    padding: 30px;
    border-radius: 15px;
    width: 90%;
    max-width: 400px;
    text-align: center;
    border: 3px solid #1a1a1a;
    box-shadow: 0 10px 25px rgba(0,0,0,0.5);
    animation: fadeIn 0.3s ease-out;
}

.modal-header h3 {
    margin: 0 0 15px 0;
    color: #1a1a1a;
    font-family: 'Jersey 25', sans-serif;
    font-size: 2em;
}

.modal-body p {
    font-size: 1.2em;
    margin-bottom: 25px;
    color: #333;
}

.btn-modal {
    background-color: #1a1a1a;
    color: white;
    padding: 10px 25px;
    border: none;
    border-radius: 8px;
    font-size: 1.1em;
    cursor: pointer;
    font-family: 'Jersey 25', sans-serif;
    transition: all 0.2s;
}

.btn-modal:hover {
    background-color: #646cff;
    transform: translateY(-2px);
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
}

/* Original Styles */
.signup-page {
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

.signup-container {
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

.signup-header {
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

.signup-header h1 {
    font-size: 3em;
    margin: 0 0 10px 0;
    font-family: 'Jersey 25', sans-serif;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    letter-spacing: 2px;
}

.signup-header p {
    font-size: 1.2em;
    margin: 0;
    opacity: 0.8;
    font-family: 'Jersey 25', sans-serif;
}

.signup-card {
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

.signup-card h2 {
    text-align: center;
    margin: 0 0 30px 0;
    font-size: 2.5em;
    color: #1a1a1a;
    font-family: 'Jersey 25', sans-serif;
}

.form-group {
    margin-bottom: 20px;
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

.btn-signup {
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

.btn-signup:hover {
    background-color: #646cff;
    border-color: #646cff;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(100, 108, 255, 0.3);
}

.btn-signup:active {
    transform: translateY(0);
}

.signup-footer {
    text-align: center;
    margin-top: 25px;
    padding-top: 20px;
    border-top: 2px solid #ddd;
}

.signup-footer p {
    margin: 0;
    font-size: 1em;
    color: #666;
}

.signup-footer a {
    color: #646cff;
    text-decoration: none;
    font-weight: 600;
    transition: color 0.3s ease;
}

.signup-footer a:hover {
    color: #535bf2;
    text-decoration: underline;
}

/* Responsividade */
@media (max-width: 768px) {
    .signup-header h1 {
        font-size: 2.5em;
    }

    .signup-header p {
        font-size: 1em;
    }

    .signup-card {
        padding: 30px 25px;
    }

    .signup-card h2 {
        font-size: 2em;
    }

    .form-group {
        margin-bottom: 18px;
    }

    .form-group label {
        font-size: 1em;
    }

    .btn-signup {
        font-size: 1.1em;
        padding: 12px;
    }
}

@media (max-width: 480px) {
    .signup-page {
        padding: 15px;
    }

    .signup-header h1 {
        font-size: 2em;
        letter-spacing: 1px;
    }

    .signup-header p {
        font-size: 0.9em;
    }

    .signup-card {
        padding: 25px 20px;
        border-radius: 12px;
    }

    .signup-card h2 {
        font-size: 1.8em;
        margin-bottom: 25px;
    }

    .form-group {
        margin-bottom: 16px;
    }

    .form-group label {
        font-size: 0.95em;
        margin-bottom: 6px;
    }

    .form-group input {
        padding: 10px 12px;
        font-size: 0.95em;
    }

    .btn-signup {
        font-size: 1em;
        padding: 11px;
    }

    .signup-footer p {
        font-size: 0.9em;
    }
}

@media (max-width: 360px) {
    .signup-header h1 {
        font-size: 1.7em;
    }

    .signup-card {
        padding: 20px 15px;
    }

    .signup-card h2 {
        font-size: 1.5em;
    }

    .form-group {
        margin-bottom: 14px;
    }
}
</style>
