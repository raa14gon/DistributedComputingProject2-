const API_URL = import.meta.env.VITE_API_URL || '/api';

const authFetch = async (url, options = {}) => {
    const token = localStorage.getItem('access_token');
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
        ...options,
        headers,
    });

    if (response.status === 401) {
        localStorage.removeItem('access_token');
        window.location.href = '/Login';
        throw new Error('Unauthorized');
    }

    return response;
};

export const authService = {
    async login(username, password) {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);

        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        const data = await response.json();
        localStorage.setItem('access_token', data.access_token);
        return data;
    },

    async signup(userData) {
        const response = await fetch(`${API_URL}/auth/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Signup failed');
        }

        return response.json();
    },

    logout() {
        localStorage.removeItem('access_token');
        window.location.href = '/Login';
    },

    isAuthenticated() {
        return !!localStorage.getItem('access_token');
    },

    getToken() {
        return localStorage.getItem('access_token');
    }
};

export const statsService = {
    async getStats() {
        const response = await authFetch(`${API_URL}/stats`);

        if (!response.ok) {
            throw new Error('Failed to fetch stats');
        }

        return response.json();
    }
};

export const userService = {
    async getUsers(skip = 0, limit = 100) {
        const response = await authFetch(`${API_URL}/users?skip=${skip}&limit=${limit}`);

        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }

        return response.json();
    },

    async getUsersCount() {
        const response = await authFetch(`${API_URL}/users/count`);

        if (!response.ok) {
            throw new Error('Failed to fetch users count');
        }

        return response.json();
    }
};

export const carService = {
    async getCars(skip = 0, limit = 100) {
        const response = await fetch(`${API_URL}/cars?skip=${skip}&limit=${limit}`);

        if (!response.ok) {
            throw new Error('Failed to fetch cars');
        }

        return response.json();
    },

    async getCarsCount() {
        const response = await fetch(`${API_URL}/cars/count`);

        if (!response.ok) {
            throw new Error('Failed to fetch cars count');
        }

        return response.json();
    },

    async createCar(carData) {
        const response = await authFetch(`${API_URL}/cars`, {
            method: 'POST',
            body: JSON.stringify(carData),
        });

        if (!response.ok) {
            throw new Error('Failed to create car');
        }

        return response.json();
    },

    async deleteCar(carId) {
        const response = await authFetch(`${API_URL}/cars/${carId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Failed to delete car');
        }

        return response.json();
    }
};

export const magazineService = {
    async getMagazines(skip = 0, limit = 100) {
        const response = await fetch(`${API_URL}/magazines?skip=${skip}&limit=${limit}`);

        if (!response.ok) {
            throw new Error('Failed to fetch magazines');
        }

        return response.json();
    },

    async getMagazinesCount() {
        const response = await fetch(`${API_URL}/magazines/count`);

        if (!response.ok) {
            throw new Error('Failed to fetch magazines count');
        }

        return response.json();
    },

    async createMagazine(magazineData) {
        const response = await authFetch(`${API_URL}/magazines`, {
            method: 'POST',
            body: JSON.stringify(magazineData),
        });

        if (!response.ok) {
            throw new Error('Failed to create magazine');
        }

        return response.json();
    }
};

export const raceService = {
    async getRaces(skip = 0, limit = 100) {
        const response = await fetch(`${API_URL}/races?skip=${skip}&limit=${limit}`);

        if (!response.ok) {
            throw new Error('Failed to fetch races');
        }

        return response.json();
    },

    async getRacesCount() {
        const response = await fetch(`${API_URL}/races/count`);

        if (!response.ok) {
            throw new Error('Failed to fetch races count');
        }

        return response.json();
    },

    async createRace(raceData) {
        const response = await authFetch(`${API_URL}/races`, {
            method: 'POST',
            body: JSON.stringify(raceData),
        });

        if (!response.ok) {
            throw new Error('Failed to create race');
        }

        return response.json();
    }
};
