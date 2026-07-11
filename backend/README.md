# MoodCurator Backend API

## 📋 **Overview**
Complete backend implementation for the MoodCurator entertainment recommendation platform, featuring user authentication, mood-based recommendations, social features, analytics, and real-time capabilities.

## 🚀 **Features**

### **Authentication & User Management**
- JWT-based authentication system
- User registration, login, and profile management
- Password hashing with bcrypt
- Secure token generation and verification

### **Recommendation Engine**
- Mood-based movie and book recommendations
- Advanced search and filtering
- AI-powered suggestions using Claude API
- Trending content and similar items

### **Social Features**
- Friend system with requests and management
- Shared watchlists and community features
- Real-time notifications and updates
- Social media sharing integration

### **Analytics & Insights**
- User behavior tracking and analysis
- Mood distribution and preference analytics
- Achievement system with gamification
- Viewing patterns and statistics

### **Real-time Features**
- Socket.io integration for live updates
- Real-time notifications
- Live watchlist updates
- Achievement unlock notifications

## 🛠️ **Tech Stack**

- **Runtime**: Node.js + Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Real-time**: Socket.io
- **Caching**: Redis
- **File Storage**: AWS S3
- **Validation**: Express Validator
- **Logging**: Winston
- **Testing**: Jest + Supertest
- **Documentation**: OpenAPI/Swagger
- **Containerization**: Docker + Docker Compose

## 📂 **Project Structure**

```
moodcurator-backend/
├── src/
│   ├── controllers/          # Request handlers
│   ├── models/              # Database schemas
│   ├── routes/               # API routes
│   ├── middleware/           # Custom middleware
│   ├── services/            # Business logic
│   ├── utils/                # Helper functions
│   └── config/               # Configuration files
├── tests/                   # Test suites
├── docs/                    # API documentation
├── docker-compose.yml        # Container orchestration
├── Dockerfile               # Container configuration
└── package.json             # Dependencies and scripts
```

## 🚀 **Quick Start**

### **Prerequisites**
- Node.js 16.0+
- MongoDB 5.0+
- Redis 6.0+
- Docker & Docker Compose

### **Installation**
```bash
# Clone the repository
git clone <repository-url>
cd moodcurator-backend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env
# Edit .env with your configuration

# Start with Docker Compose
docker-compose up -d

# Or start locally
npm install
npm run dev
```

### **Environment Variables**
See `.env.example` for required environment variables:
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - JWT signing secret
- `ANTHROPIC_API_KEY` - Claude API key
- `AWS_*` - AWS S3 configuration

## 📡 **API Documentation**

### **Base URL**
```
http://localhost:5000/api
```

### **Authentication Endpoints**
```
POST   /api/auth/register     # User registration
POST   /api/auth/login        # User login
POST   /api/auth/logout       # User logout
POST   /api/auth/verify       # Token verification
```

### **User Endpoints**
```
GET    /api/users/profile      # Get user profile
PUT    /api/users/profile      # Update user profile
GET    /api/users/stats        # Get user statistics
```

### **Recommendation Endpoints**
```
GET    /api/recommendations/mood/:mood    # Get mood-based recommendations
GET    /api/recommendations/search           # Advanced search
GET    /api/recommendations/trending          # Trending content
```

### **Social Endpoints**
```
GET    /api/social/friends               # Get friends list
POST   /api/social/friends/request       # Send friend request
PUT    /api/social/friends/:id           # Accept/reject friend
GET    /api/social/watchlists            # Get shared watchlists
POST   /api/social/watchlists            # Create shared watchlist
```

## 🔐 **Security**

- JWT-based authentication with secure token generation
- Password hashing with bcrypt (10 rounds)
- Rate limiting (100 requests per 15 minutes)
- CORS configuration for frontend integration
- Input validation and sanitization
- Helmet.js for security headers

## 📊 **Database Schema**

### **User Model**
- Email, password (hashed), name, avatar, bio
- Preferences (theme, notifications, favorite moods)
- Statistics (watched items, mood history, achievements)
- Subscription management

### **Content Models**
- Movies: title, synopsis, genre, year, rating, streaming
- Books: title, synopsis, author, genre, rating
- Mood associations and tags
- Popularity tracking and metadata

## 🚀 **Deployment**

### **Docker Deployment**
```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f app

# Stop services
docker-compose down
```

### **Production Considerations**
- Use environment variables for sensitive data
- Enable MongoDB authentication
- Configure reverse proxy (Nginx)
- Set up SSL certificates
- Monitor with application logging

## 🧪 **Testing**

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run integration tests
npm run test:integration

# Generate coverage report
npm run test:coverage
```

## 📈 **Performance & Scaling**

- Database indexing on frequently queried fields
- Redis caching for API responses
- Connection pooling for MongoDB
- Rate limiting for API protection
- Horizontal scaling support with Docker

## 📞 **Monitoring & Logging**

- Winston logging with multiple levels
- Request/response logging
- Error tracking and reporting
- Performance metrics collection
- Health check endpoints

---

**Backend Status**: ✅ **PRODUCTION READY**

This backend provides a complete, scalable foundation for the MoodCurator platform with all essential features and enterprise-grade security and performance considerations.
