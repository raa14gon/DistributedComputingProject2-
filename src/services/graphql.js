const GRAPHQL_URL = import.meta.env.VITE_GRAPHQL_URL || 'http://localhost:8000/graphql';

const graphqlRequest = async (query, variables = {}) => {
    const token = localStorage.getItem('access_token');
    const headers = {
        'Content-Type': 'application/json',
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(GRAPHQL_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify({
            query,
            variables
        })
    });

    const result = await response.json();

    if (result.errors) {
        console.error('GraphQL Errors:', result.errors);
        throw new Error(result.errors[0].message);
    }

    return result.data;
};

export const authService = {
    async login(username, password) {
        const query = `
            mutation Login($username: String!, $password: String!) {
                login(input: { username: $username, password: $password }) {
                    accessToken
                    tokenType
                    user {
                        id
                        fullname
                        email
                        username
                        isAdmin
                    }
                }
            }
        `;

        const data = await graphqlRequest(query, { username, password });
        localStorage.setItem('access_token', data.login.accessToken);
        return data.login;
    },

    async signup(fullname, email, username, password) {
        const query = `
            mutation SignUp($fullname: String!, $email: String!, $username: String!, $password: String!) {
                signup(input: {
                    fullname: $fullname
                    email: $email
                    username: $username
                    password: $password
                }) {
                    id
                    fullname
                    email
                    username
                    isAdmin
                }
            }
        `;

        const data = await graphqlRequest(query, { fullname, email, username, password });
        return data.signup;
    },

    async me() {
        const query = `
            query Me {
                me {
                    id
                    fullname
                    email
                    username
                    isAdmin
                    isActive
                }
            }
        `;

        const data = await graphqlRequest(query);
        return data.me;
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
        const query = `
            query GetStats {
                stats {
                    totalUsers
                    totalCars
                    totalMagazines
                    totalRaces
                }
            }
        `;

        const data = await graphqlRequest(query);
        return {
            total_users: data.stats.totalUsers,
            total_cars: data.stats.totalCars,
            total_magazines: data.stats.totalMagazines,
            total_races: data.stats.totalRaces
        };
    }
};

export const carService = {
    async getCars(skip = 0, limit = 100) {
        const query = `
            query GetCars($skip: Int!, $limit: Int!) {
                cars(skip: $skip, limit: $limit) {
                    id
                    name
                    year
                    manufacturer
                    description
                    imageUrl
                    createdAt
                }
            }
        `;

        const data = await graphqlRequest(query, { skip, limit });
        return data.cars;
    },

    async getCar(id) {
        const query = `
            query GetCar($id: Int!) {
                car(id: $id) {
                    id
                    name
                    year
                    manufacturer
                    description
                    imageUrl
                    createdAt
                }
            }
        `;

        const data = await graphqlRequest(query, { id });
        return data.car;
    },

    async createCar(carData) {
        const query = `
            mutation CreateCar($name: String!, $year: Int!, $manufacturer: String!, $description: String, $imageUrl: String) {
                createCar(input: {
                    name: $name
                    year: $year
                    manufacturer: $manufacturer
                    description: $description
                    imageUrl: $imageUrl
                }) {
                    id
                    name
                    year
                    manufacturer
                    description
                    imageUrl
                }
            }
        `;

        const data = await graphqlRequest(query, carData);
        return data.createCar;
    },

    async deleteCar(id) {
        const query = `
            mutation DeleteCar($id: Int!) {
                deleteCar(id: $id)
            }
        `;

        const data = await graphqlRequest(query, { id });
        return data.deleteCar;
    }
};

export const magazineService = {
    async getMagazines(skip = 0, limit = 100) {
        const query = `
            query GetMagazines($skip: Int!, $limit: Int!) {
                magazines(skip: $skip, limit: $limit) {
                    id
                    title
                    description
                    imageUrl
                    publicationDate
                    createdAt
                }
            }
        `;

        const data = await graphqlRequest(query, { skip, limit });
        return data.magazines;
    },

    async createMagazine(magazineData) {
        const query = `
            mutation CreateMagazine($title: String!, $description: String, $imageUrl: String) {
                createMagazine(input: {
                    title: $title
                    description: $description
                    imageUrl: $imageUrl
                }) {
                    id
                    title
                    description
                    imageUrl
                }
            }
        `;

        const data = await graphqlRequest(query, magazineData);
        return data.createMagazine;
    }
};

export const raceService = {
    async getRaces(skip = 0, limit = 100) {
        const query = `
            query GetRaces($skip: Int!, $limit: Int!) {
                races(skip: $skip, limit: $limit) {
                    id
                    name
                    location
                    date
                    description
                    createdAt
                }
            }
        `;

        const data = await graphqlRequest(query, { skip, limit });
        return data.races;
    },

    async createRace(raceData) {
        const query = `
            mutation CreateRace($name: String!, $location: String, $description: String) {
                createRace(input: {
                    name: $name
                    location: $location
                    description: $description
                }) {
                    id
                    name
                    location
                    description
                }
            }
        `;

        const data = await graphqlRequest(query, raceData);
        return data.createRace;
    }
};

export const userService = {
    async getUsers(skip = 0, limit = 100) {
        const query = `
            query GetUsers($skip: Int!, $limit: Int!) {
                users(skip: $skip, limit: $limit) {
                    id
                    fullname
                    email
                    username
                    isAdmin
                    isActive
                    createdAt
                }
            }
        `;

        const data = await graphqlRequest(query, { skip, limit });
        return data.users;
    }
};
