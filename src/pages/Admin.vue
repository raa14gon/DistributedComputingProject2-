<template>
    <div class="admin-page">
        <div class="admin-container">
            <div class="admin-header">
                <h1>⚙️ Admin Panel</h1>
                <p>70s Car Culture - Administration Dashboard</p>
            </div>

            <div v-if="loading" class="loading">
                <p>Loading statistics...</p>
            </div>

            <div v-else-if="error" class="error-message">
                <p>{{ error }}</p>
                <button @click="loadStats" class="retry-btn">Retry</button>
            </div>

            <div v-else class="admin-content">
                <div class="admin-card">
                    <h2>📊 Dashboard</h2>
                    <div class="stats-grid">
                        <div class="stat-card">
                            <div class="stat-icon">👥</div>
                            <div class="stat-info">
                                <h3>Total Users</h3>
                                <p class="stat-number">{{ stats.total_users }}</p>
                            </div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-icon">🚗</div>
                            <div class="stat-info">
                                <h3>Total Cars</h3>
                                <p class="stat-number">{{ stats.total_cars }}</p>
                            </div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-icon">📰</div>
                            <div class="stat-info">
                                <h3>Magazines</h3>
                                <p class="stat-number">{{ stats.total_magazines }}</p>
                            </div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-icon">🏁</div>
                            <div class="stat-info">
                                <h3>Races</h3>
                                <p class="stat-number">{{ stats.total_races }}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="admin-actions">
                    <div class="action-card">
                        <h3>📝 Content Management</h3>
                        <div class="action-buttons">
                            <button class="action-btn">Manage Cars</button>
                            <button class="action-btn">Manage Magazines</button>
                            <button class="action-btn">Manage Races</button>
                        </div>
                    </div>

                    <div class="action-card">
                        <h3>👥 User Management</h3>
                        <div class="action-buttons">
                            <button class="action-btn">View Users</button>
                            <button class="action-btn">Add User</button>
                            <button class="action-btn">User Permissions</button>
                        </div>
                    </div>

                    <div class="action-card">
                        <h3>⚙️ Settings</h3>
                        <div class="action-buttons">
                            <button class="action-btn">Site Settings</button>
                            <button class="action-btn">API Configuration</button>
                            <button class="action-btn">Backup & Restore</button>
                        </div>
                    </div>
                </div>

                <div class="back-to-site">
                    <router-link to="/Home" class="back-btn">← Back to Site</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// Você pode usar REST API ou GraphQL
import { statsService } from '../services/api.js';
// import { statsService } from '../services/graphql.js'; // Descomente para usar GraphQL

export default {
    name: 'Admin',
    data() {
        return {
            stats: {
                total_users: 0,
                total_cars: 0,
                total_magazines: 0,
                total_races: 0
            },
            loading: true,
            error: null
        }
    },
    mounted() {
        this.loadStats();
    },
    methods: {
        async loadStats() {
            this.loading = true;
            this.error = null;

            try {
                this.stats = await statsService.getStats();
            } catch (err) {
                console.error('Error loading stats:', err);
                this.error = 'Failed to load statistics. Make sure the backend is running and you are logged in as admin.';
                // Usar dados de exemplo se a API falhar
                this.stats = {
                    total_users: 0,
                    total_cars: 0,
                    total_magazines: 0,
                    total_races: 0
                };
            } finally {
                this.loading = false;
            }
        }
    }
}
</script>

<style scoped>
.admin-page {
    min-height: 100vh;
    background-color: #92D4F0;
    padding: 40px 20px;
}

.admin-container {
    max-width: 1200px;
    margin: 0 auto;
}

.admin-header {
    text-align: center;
    margin-bottom: 40px;
    background-color: #F58F56;
    padding: 30px;
    border-radius: 15px;
    border: 3px solid #1a1a1a;
    box-shadow:
        rgba(0, 0, 0, 0.25) 0px 54px 55px,
        rgba(0, 0, 0, 0.12) 0px -12px 30px,
        rgba(0, 0, 0, 0.12) 0px 4px 6px,
        rgba(0, 0, 0, 0.17) 0px 12px 13px,
        rgba(0, 0, 0, 0.09) 0px -3px 5px;
}

.admin-header h1 {
    font-size: 3em;
    margin: 0 0 10px 0;
    color: #1a1a1a;
    font-family: 'Jersey 25', sans-serif;
}

.admin-header p {
    font-size: 1.3em;
    margin: 0;
    color: #1a1a1a;
    opacity: 0.9;
    font-family: 'Jersey 25', sans-serif;
}

.admin-content {
    display: flex;
    flex-direction: column;
    gap: 30px;
}

.admin-card {
    background-color: whitesmoke;
    padding: 30px;
    border-radius: 15px;
    border: 3px solid #1a1a1a;
    box-shadow:
        rgba(0, 0, 0, 0.25) 0px 54px 55px,
        rgba(0, 0, 0, 0.12) 0px -12px 30px,
        rgba(0, 0, 0, 0.12) 0px 4px 6px,
        rgba(0, 0, 0, 0.17) 0px 12px 13px,
        rgba(0, 0, 0, 0.09) 0px -3px 5px;
}

.admin-card h2 {
    font-size: 2.5em;
    margin: 0 0 25px 0;
    color: #1a1a1a;
    font-family: 'Jersey 25', sans-serif;
}

.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
}

.stat-card {
    background-color: white;
    padding: 25px;
    border-radius: 10px;
    border: 2px solid #1a1a1a;
    display: flex;
    align-items: center;
    gap: 20px;
    transition: all 0.3s ease;
}

.stat-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.stat-icon {
    font-size: 3em;
    width: 70px;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #F58F56;
    border-radius: 50%;
    border: 2px solid #1a1a1a;
}

.stat-info h3 {
    margin: 0 0 5px 0;
    font-size: 1.2em;
    color: #666;
    font-family: 'Jersey 25', sans-serif;
}

.stat-number {
    font-size: 2.5em;
    font-weight: bold;
    margin: 0;
    color: #1a1a1a;
    font-family: 'Jersey 25', sans-serif;
}

.admin-actions {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
}

.action-card {
    background-color: whitesmoke;
    padding: 25px;
    border-radius: 15px;
    border: 3px solid #1a1a1a;
    box-shadow:
        rgba(0, 0, 0, 0.25) 0px 54px 55px,
        rgba(0, 0, 0, 0.12) 0px -12px 30px,
        rgba(0, 0, 0, 0.12) 0px 4px 6px,
        rgba(0, 0, 0, 0.17) 0px 12px 13px,
        rgba(0, 0, 0, 0.09) 0px -3px 5px;
}

.action-card h3 {
    font-size: 1.8em;
    margin: 0 0 20px 0;
    color: #1a1a1a;
    font-family: 'Jersey 25', sans-serif;
}

.action-buttons {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.action-btn {
    padding: 12px 20px;
    background-color: #1a1a1a;
    color: white;
    border: 2px solid #1a1a1a;
    border-radius: 8px;
    font-size: 1.1em;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: 'Jersey 25', sans-serif;
}

.action-btn:hover {
    background-color: #646cff;
    border-color: #646cff;
    transform: translateX(5px);
}

.back-to-site {
    text-align: center;
    margin-top: 20px;
}

.back-btn {
    display: inline-block;
    padding: 15px 30px;
    background-color: #F58F56;
    color: #1a1a1a;
    text-decoration: none;
    border-radius: 10px;
    font-size: 1.3em;
    font-weight: bold;
    border: 3px solid #1a1a1a;
    transition: all 0.3s ease;
    font-family: 'Jersey 25', sans-serif;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.back-btn:hover {
    background-color: #1a1a1a;
    color: white;
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}

.loading {
    text-align: center;
    padding: 60px 20px;
    background-color: whitesmoke;
    border-radius: 15px;
    border: 3px solid #1a1a1a;
    box-shadow:
        rgba(0, 0, 0, 0.25) 0px 54px 55px,
        rgba(0, 0, 0, 0.12) 0px -12px 30px,
        rgba(0, 0, 0, 0.12) 0px 4px 6px,
        rgba(0, 0, 0, 0.17) 0px 12px 13px,
        rgba(0, 0, 0, 0.09) 0px -3px 5px;
}

.loading p {
    font-size: 1.5em;
    color: #1a1a1a;
    font-family: 'Jersey 25', sans-serif;
    margin: 0;
}

.error-message {
    text-align: center;
    padding: 40px 20px;
    background-color: #ffebee;
    border-radius: 15px;
    border: 3px solid #c62828;
    box-shadow:
        rgba(0, 0, 0, 0.25) 0px 54px 55px,
        rgba(0, 0, 0, 0.12) 0px -12px 30px,
        rgba(0, 0, 0, 0.12) 0px 4px 6px,
        rgba(0, 0, 0, 0.17) 0px 12px 13px,
        rgba(0, 0, 0, 0.09) 0px -3px 5px;
}

.error-message p {
    font-size: 1.3em;
    color: #c62828;
    font-family: 'Jersey 25', sans-serif;
    margin: 0 0 20px 0;
}

.retry-btn {
    padding: 12px 30px;
    background-color: #c62828;
    color: white;
    border: 2px solid #c62828;
    border-radius: 8px;
    font-size: 1.1em;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: 'Jersey 25', sans-serif;
}

.retry-btn:hover {
    background-color: #b71c1c;
    border-color: #b71c1c;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* Responsividade */
@media (max-width: 768px) {
    .admin-page {
        padding: 20px 15px;
    }

    .admin-header {
        padding: 20px;
    }

    .admin-header h1 {
        font-size: 2.2em;
    }

    .admin-header p {
        font-size: 1.1em;
    }

    .admin-card {
        padding: 20px;
    }

    .admin-card h2 {
        font-size: 2em;
    }

    .stats-grid {
        grid-template-columns: 1fr;
    }

    .admin-actions {
        grid-template-columns: 1fr;
    }

    .stat-icon {
        font-size: 2.5em;
        width: 60px;
        height: 60px;
    }

    .stat-number {
        font-size: 2em;
    }
}

@media (max-width: 480px) {
    .admin-header h1 {
        font-size: 1.8em;
    }

    .admin-header p {
        font-size: 1em;
    }

    .admin-card h2 {
        font-size: 1.6em;
    }

    .action-card h3 {
        font-size: 1.5em;
    }

    .stat-card {
        padding: 20px;
    }

    .stat-icon {
        font-size: 2em;
        width: 50px;
        height: 50px;
    }

    .stat-number {
        font-size: 1.8em;
    }

    .action-btn {
        font-size: 1em;
        padding: 10px 15px;
    }

    .back-btn {
        font-size: 1.1em;
        padding: 12px 24px;
    }
}
</style>
