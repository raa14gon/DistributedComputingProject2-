<template>
    <div class="admin-page">
        <div class="admin-container">
            <div class="admin-header">
                <h1>Admin Dashboard</h1>
                <p>Platform Management & Analytics</p>
                <div class="header-buttons">
                    <button @click="goHome" class="btn-home">Back to Home</button>
                    <button @click="handleLogout" class="btn-logout">Logout</button>
                </div>
            </div>

            <!-- Stats Row -->
            <div class="stats-row">
                <div class="stat-card">
                    <h3>Users</h3>
                    <div class="stat-value">{{ stats.users }}</div>
                </div>
                <div class="stat-card">
                    <h3>Cars Stored</h3>
                    <div class="stat-value">{{ stats.cars_count }}</div>
                </div>
                <div class="stat-card">
                    <h3>Races Stored</h3>
                    <div class="stat-value">{{ stats.races_stored }}</div>
                </div>
                <div class="stat-card">
                    <h3>API Logs</h3>
                    <div class="stat-value">{{ stats.api_calls_logged }}</div>
                </div>
            </div>

            <!-- Actions Row -->
            <div class="actions-card">
                <h2>Data Management</h2>
                <div class="action-buttons">
                    <div class="action-group">
                        <h4>1. Sync Content</h4>
                        <p>Push frontend car cards to the backend database.</p>
                        <button @click="syncCars" :disabled="loading" class="btn-action">
                            <i class="fas fa-sync"></i> Sync Cards to DB
                        </button>
                    </div>

                    <div class="action-group">
                        <h4>2. Fetch History</h4>
                        <p>Import Races & Weather for 1970-1979.</p>
                        <button @click="run70sETL" :disabled="loading" class="btn-action">
                            <i class="fas fa-database"></i> Load 70s Data (1970-79)
                        </button>
                    </div>
                </div>
                <div v-if="message" :class="['status-msg', isError ? 'error' : 'success']">
                    {{ message }}
                </div>
            </div>

            <!-- Logs Section -->
            <div class="logs-card">
                <h2>Recent System Logs</h2>
                <div class="logs-table-wrapper">
                    <table class="logs-table">
                        <thead>
                            <tr>
                                <th>Timestamp</th>
                                <th>Method</th>
                                <th>Endpoint</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="log in logs" :key="log._id">
                                <td>{{ new Date(log.timestamp).toLocaleString() }}</td>
                                <td>{{ log.method }}</td>
                                <td>{{ log.endpoint }}</td>
                                <td :class="getStatusClass(log.status_code)">{{ log.status_code }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <button @click="fetchLogs" class="btn-refresh">Refresh Logs</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const stats = ref({ users: 0, races_stored: 0, api_calls_logged: 0, cars_count: 0 });
const logs = ref([]);
const message = ref('');
const isError = ref(false);
const loading = ref(false);
const router = useRouter();
const authStore = useAuthStore();

const API_URL = 'http://localhost:8000';

const goHome = () => router.push('/home');

const handleLogout = () => {
    authStore.logout();
    router.push('/login');
};

const getStatusClass = (code) => {
    if (code >= 200 && code < 300) return 'status-2xx';
    if (code >= 400 && code < 500) return 'status-4xx';
    if (code >= 500) return 'status-5xx';
    return '';
};

const fetchStats = async () => {
    try {
        const res = await axios.get(`${API_URL}/analytics/dashboard-stats`);
        stats.value = res.data;
    } catch (error) {
        console.error("Failed to fetch stats", error);
    }
};

const fetchLogs = async () => {
    try {
        const res = await axios.get(`${API_URL}/etl/history?limit=10`);
        logs.value = res.data;
    } catch (error) {
        console.error("Failed to fetch logs", error);
    }
};

const syncCars = async () => {
    loading.value = true;
    message.value = 'Syncing cars...';
    try {
        const carsRes = await fetch('/70sCarCulture-s/json-cars.json');
        if (!carsRes.ok) throw new Error("Could not load local json-cars.json");
        const carsData = await carsRes.json();

        const res = await axios.post(`${API_URL}/etl/seed-cars`, carsData);
        message.value = res.data.message;
        isError.value = false;
        fetchStats(); // Refresh count
    } catch (error) {
        message.value = "Sync failed: " + (error.response?.data?.detail || error.message);
        isError.value = true;
    } finally {
        loading.value = false;
    }
};

const run70sETL = async () => {
    loading.value = true;
    message.value = 'Triggering 70s Data Import...';
    try {
        const res = await axios.post(`${API_URL}/etl/ergast/run-70s`);
        message.value = res.data.message;
        isError.value = false;
        setTimeout(fetchLogs, 2000);
    } catch (error) {
        message.value = "ETL Trigger failed: " + (error.response?.data?.detail || error.message);
        isError.value = true;
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    fetchStats();
    fetchLogs();
});
</script>

<style scoped>
.admin-page {
    min-height: 100vh;
    padding: 20px;
    background-color: #92D4F0;
    background-image:
        linear-gradient(45deg, rgba(0, 0, 0, 0.05) 25%, transparent 25%),
        linear-gradient(-45deg, rgba(0, 0, 0, 0.05) 25%, transparent 25%),
        linear-gradient(45deg, transparent 75%, rgba(0, 0, 0, 0.05) 75%),
        linear-gradient(-45deg, transparent 75%, rgba(0, 0, 0, 0.05) 75%);
    background-size: 20px 20px;
}

.admin-container {
    max-width: 1000px;
    margin: 0 auto;
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

/* Header */
.admin-header {
    background-color: #F58F56;
    border: 3px solid #1a1a1a;
    border-radius: 15px;
    padding: 20px;
    text-align: center;
    margin-bottom: 25px;
    box-shadow: 0 10px 0px #1a1a1a;
    position: relative;
}

.admin-header h1 {
    font-family: 'Jersey 25', sans-serif;
    font-size: 3em;
    margin: 0;
    color: #1a1a1a;
    text-shadow: 2px 2px 0px rgba(255, 255, 255, 0.3);
}

.admin-header p {
    font-family: 'Jersey 25', sans-serif;
    font-size: 1.5em;
    margin-top: 5px;
    opacity: 0.8;
}

.header-buttons {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    gap: 10px;
}

.btn-home,
.btn-logout {
    background: #1a1a1a;
    color: white;
    border: none;
    padding: 10px 15px;
    font-family: 'Jersey 25', sans-serif;
    font-size: 1.2em;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s;
}

.btn-home:hover,
.btn-logout:hover {
    background-color: #333;
    transform: translateY(-2px);
}

.btn-logout {
    background-color: #d32f2f;
    /* Red for logout */
}

.btn-logout:hover {
    background-color: #b71c1c;
}

/* Stats */
.stats-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    margin-bottom: 25px;
}

.stat-card {
    background-color: whitesmoke;
    border: 3px solid #1a1a1a;
    border-radius: 12px;
    padding: 20px;
    text-align: center;
    box-shadow: 5px 5px 0px #1a1a1a;
}

.stat-card h3 {
    font-family: 'Jersey 25', sans-serif;
    margin: 0 0 10px 0;
    font-size: 1.5em;
    color: #666;
}

.stat-value {
    font-family: 'Jersey 25', sans-serif;
    font-size: 3em;
    font-weight: bold;
    color: #1a1a1a;
}

/* Actions */
.actions-card,
.logs-card {
    background-color: whitesmoke;
    border: 3px solid #1a1a1a;
    border-radius: 12px;
    padding: 30px;
    margin-bottom: 25px;
    box-shadow: 5px 5px 0px #1a1a1a;
}

.actions-card h2,
.logs-card h2 {
    font-family: 'Jersey 25', sans-serif;
    font-size: 2em;
    margin-top: 0;
    border-bottom: 2px solid #ddd;
    padding-bottom: 10px;
    margin-bottom: 20px;
}

.action-buttons {
    display: flex;
    gap: 30px;
    flex-wrap: wrap;
}

.action-group {
    flex: 1;
    min-width: 250px;
    background: white;
    padding: 15px;
    border-radius: 8px;
    border: 2px solid #eee;
}

.action-group h4 {
    margin: 0;
    font-family: 'Jersey 25', sans-serif;
    font-size: 1.4em;
}

.btn-action {
    display: block;
    width: 100%;
    margin-top: 15px;
    padding: 12px;
    background-color: #1a1a1a;
    color: white;
    border: none;
    border-radius: 6px;
    font-family: 'Jersey 25', sans-serif;
    font-size: 1.3em;
    cursor: pointer;
    transition: transform 0.1s;
}

.btn-action:hover {
    background-color: #F58F56;
    color: black;
    transform: translateY(-2px);
    border: 2px solid #1a1a1a;
}

.btn-action:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.status-msg {
    margin-top: 20px;
    padding: 10px;
    border-radius: 6px;
    text-align: center;
    font-weight: bold;
}

.status-msg.success {
    background-color: #d4edda;
    color: #155724;
}

.status-msg.error {
    background-color: #f8d7da;
    color: #721c24;
}

/* Logs */
.logs-table-wrapper {
    overflow-x: auto;
}

.logs-table {
    width: 100%;
    border-collapse: collapse;
    font-family: monospace;
}

.logs-table th,
.logs-table td {
    padding: 10px;
    border-bottom: 1px solid #ddd;
    text-align: left;
}

.logs-table th {
    background-color: #f1f1f1;
    font-weight: bold;
}

.status-2xx {
    color: green;
    font-weight: bold;
}

.status-4xx {
    color: orange;
    font-weight: bold;
}

.status-5xx {
    color: red;
    font-weight: bold;
}

.btn-refresh {
    margin-top: 15px;
    padding: 8px 15px;
    background: transparent;
    border: 2px solid #1a1a1a;
    font-family: 'Jersey 25', sans-serif;
    font-size: 1.1em;
    cursor: pointer;
}

.btn-refresh:hover {
    background: #eee;
}
</style>
