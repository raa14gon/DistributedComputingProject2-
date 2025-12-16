# 70s Car Culture 🚗✨

Welcome to **70s Car Culture**, a full-stack web application dedicated to the golden era of automotive design and racing. This project offers an immersive journey through the iconic cars and racing history of the 1970s, featuring a retro-inspired interface, real-time data integration, and a modern backend API.

## 🌟 Features

### Frontend
- **Immersive 70s Aesthetic**: Visually rich UI designed to evoke the style and feel of the 1970s
- **Car Showcase**: Explore legendary vehicles from the era with detailed information
- **Vintage Racing Data**: Historical F1 race results from the 70s via [Ergast Developer API](http://ergast.com/mrd/)
- **Authentication System**: Secure login and signup pages with JWT authentication
- **Admin Dashboard**: Protected admin panel with real-time statistics
- **Dynamic Content**: Car details and history sourced from Wikipedia
- **Responsive Design**: Seamless experience across all devices (desktop, tablet, mobile)
- **Smooth Animations**: Enhanced interactions using GSAP

### Backend (Ready to Deploy)
- **Dual API Support**: REST API and GraphQL endpoints
- **JWT Authentication**: Secure token-based authentication
- **Docker Ready**: Full containerization with Docker Compose
- **PostgreSQL Database**: Production-ready database setup
- **Admin Statistics**: Protected endpoints for dashboard data

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Vue.js 3](https://vuejs.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: Custom CSS with vintage aesthetics
- **Animations**: [GSAP](https://greensock.com/gsap/)
- **Routing**: [Vue Router](https://router.vuejs.org/)
- **APIs**: Ergast F1 API, Wikipedia API

### Backend
- **Framework**: [FastAPI](https://fastapi.tiangolo.com/)
- **GraphQL**: [Strawberry GraphQL](https://strawberry.rocks/)
- **ORM**: [SQLAlchemy](https://www.sqlalchemy.org/)
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)
- **Containerization**: Docker & Docker Compose

## 🚀 Getting Started

### Prerequisites
- Node.js (version 18+ recommended)
- npm (Node Package Manager)
- Docker & Docker Compose (for backend)

### Frontend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/70s-car-culture.git
   cd 70s-car-culture/CarCulture
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173/70sCarCulture-s/`

### Backend Setup (Optional)

1. **Navigate to backend directory**
   ```bash
   cd BackCarCulture
   ```

2. **Start with Docker**
   ```bash
   docker-compose up --build
   ```

3. **Access the API**
   - GraphQL Playground: `http://localhost:8000/graphql`
   - API Documentation: `http://localhost:8000/docs`

## 📂 Project Structure

```
70s-car-culture/
├── CarCulture/              # Frontend (Vue.js)
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Main views (Home, Cars, VintageRacing, Login, SignUp, Admin)
│   │   ├── router/          # Route definitions
│   │   ├── services/        # API integration (REST & GraphQL)
│   │   └── assets/          # Images, fonts, and styles
│   └── public/              # Static assets
│
└── BackCarCulture/          # Backend (FastAPI)
    ├── app/
    │   ├── graphql/         # GraphQL schema, queries, mutations
    │   ├── routers/         # REST API routes
    │   ├── models.py        # Database models
    │   └── main.py          # Application entry
    ├── Dockerfile
    └── docker-compose.yml
```

## 🎯 Pages

- **Home** (`/`) - Landing page with magazine showcase and animations
- **Cars** (`/Cars`) - Gallery of classic 70s cars
- **Vintage Racing** (`/VintageRacing`) - Historical F1 racing data
- **Login** (`/Login`) - User authentication
- **SignUp** (`/SignUp`) - New user registration
- **Admin** (`/Admin`) - Dashboard with statistics (protected, admin only)

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for secure authentication:

1. User signs up or logs in
2. Backend generates JWT token
3. Token stored in localStorage
4. Token sent with protected requests
5. Admin routes require admin privileges

## 📊 Admin Dashboard

Access the admin panel at `/Admin` (requires admin login) to view:
- 👥 Total users count
- 🚗 Total cars count
- 📰 Total magazines count
- 🏁 Total races count

## 🌐 API Endpoints

### REST API
- `POST /api/auth/signup` - Create new account
- `POST /api/auth/login` - User login
- `GET /api/stats` - Get statistics (admin only)
- `GET /api/cars` - List all cars
- `GET /api/magazines` - List all magazines
- `GET /api/races` - List all races

### GraphQL
```graphql
query {
  stats {
    totalUsers
    totalCars
    totalMagazines
    totalRaces
  }
}
```

## 📦 Deployment

### Frontend (Vercel/GitHub Pages)
This project is configured for deployment on Vercel or GitHub Pages.

1. **Commit and Push** changes to the `main` branch
2. Vercel/GitHub Actions will automatically build and deploy
3. Visit your deployed site

### Backend (Docker)
```bash
docker-compose up -d  # Run in detached mode
```

## 🎨 Design Philosophy

The design follows authentic 1970s aesthetics:
- **Color Palette**: Vibrant oranges (#F58F56), sky blues (#92D4F0)
- **Typography**: Jersey 25 font for vintage feel
- **Shadows**: Deep box shadows for depth
- **Borders**: Bold black borders (3px)
- **Animations**: Smooth transitions and hover effects

## 🤝 Contributing

This is an academic project. Contributions are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - Formatting
- `refactor:` - Code refactoring

## 📄 License

This project is open-source and available for educational purposes.

## 👨‍💻 Author

**Rafael Gonçalves** (raa14gon)
- GitHub: [@raa14gon](https://github.com/raa14gon)

## 🙏 Acknowledgments

- Inspired by the golden era of automotive design
- Ergast Developer API for F1 data
- Wikipedia API for car information
- Classic car enthusiast community

---

**Made with ❤️ for classic car enthusiasts**
