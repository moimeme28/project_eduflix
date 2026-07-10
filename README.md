# EduFlix

Educational movie and TV series recommendation platform that helps students, teachers, and lifelong learners discover educational content tailored to their subjects, topics, and learning levels.

## 🎯 Features

- **Subject-Based Recommendations**: Browse educational content across 12 subjects (Science, Mathematics, History, Literature, Technology, Arts, Geography, Philosophy, Economics, Psychology, Health, Environment)
- **Topic Selection**: Drill down into specific topics within each subject for targeted learning
- **Learning Level Filters**: Filter content by learning level (Elementary, Middle School, High School, College, Professional, Lifelong Learner)
- **Format Selection**: Choose between Documentaries, Movies, TV Series, Mini-Series, Lectures, and Animations
- **AI-Powered Assistant**: Integrated AI chatbot for personalized recommendations and learning guidance
- **Educational Metadata**: Each movie includes learning objectives, key concepts, discussion questions, vocabulary, and quizzes
- **Student Dashboard**: Track learning progress, streaks, achievements, and watchlist
- **Teacher Dashboard**: Manage classes, create assignments, track student progress
- **Netflix-Style UI**: Modern dark mode interface with glassmorphism design
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (for backend)
- TMDB API Key (optional, for enhanced movie data)

### Frontend Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd NITRO-ZEUS
```

2. Install frontend dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm start
```

The application will open at `http://localhost:3000`

### Backend Installation

1. Navigate to backend directory:
```bash
cd backend
```

2. Install backend dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your configuration:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
FRONTEND_URL=http://localhost:3000
TMDB_API_KEY=your_tmdb_api_key
```

4. Start the backend server:
```bash
npm run dev
```

The backend API will run at `http://localhost:5000`

## 📁 Project Structure

```
NITRO-ZEUS/
├── public/                 # Static assets
├── src/
│   ├── components/         # React components
│   │   ├── Navbar.js      # Navigation bar
│   │   ├── Home.js        # Landing page
│   │   ├── SubjectSelection.js  # Subject browser
│   │   ├── TopicSelection.js     # Topic browser
│   │   ├── Recommendations.js     # Movie recommendations
│   │   ├── MovieDetails.js       # Movie details with educational metadata
│   │   ├── StudentDashboard.js   # Student progress tracking
│   │   ├── TeacherDashboard.js   # Teacher class management
│   │   ├── AIAssistant.js        # AI chatbot
│   │   ├── Login.js       # Login page
│   │   ├── Signup.js      # Signup page
│   │   └── Profile.js     # User profile
│   ├── data/               # Data files
│   │   └── subjects.js    # Subject and topic data
│   ├── services/           # API services
│   │   └── eduflixService.js  # EduFlix API integration
│   ├── App.js              # Main application component
│   ├── index.js            # Entry point
│   └── index.css           # Global styles with Tailwind
├── backend/               # Backend API
│   ├── src/
│   │   ├── models/        # Mongoose models
│   │   │   ├── Movie.js   # EducationalMovie model
│   │   │   └── User.js    # User model
│   │   ├── routes/        # Express routes
│   │   │   ├── auth.js    # Authentication routes
│   │   │   ├── users.js   # User management
│   │   │   ├── movies.js  # Movie CRUD
│   │   │   ├── recommendations.js  # Recommendation engine
│   │   │   └── ai.js      # AI endpoints
│   │   ├── controllers/   # Route controllers
│   │   │   └── authController.js
│   │   ├── middleware/    # Express middleware
│   │   ├── utils/         # Utility functions
│   │   └── app.js         # Express app setup
│   └── package.json
├── tailwind.config.js     # Tailwind CSS configuration
├── postcss.config.js      # PostCSS configuration
├── package.json          # Frontend dependencies
└── README.md            # This file
```

## 🎨 Subjects and Topics

### Available Subjects

1. **🔬 Science** - Biology, Chemistry, Physics, Astronomy
2. **📐 Mathematics** - Algebra, Calculus, Geometry, Statistics
3. **📜 History** - World History, Ancient Civilizations, Modern History
4. **📚 Literature** - Classic Literature, Poetry, Drama
5. **💻 Technology** - Programming, AI, Web Development
6. **🎨 Arts** - Visual Arts, Music, Film Studies
7. **🌍 Geography** - Physical Geography, Human Geography, Cartography
8. **💭 Philosophy** - Ethics, Logic, Metaphysics
9. **💰 Economics** - Microeconomics, Macroeconomics, Finance
10. **🧠 Psychology** - Cognitive, Behavioral, Developmental
11. **🏥 Health** - Nutrition, Medicine, Mental Health
12. **🌱 Environment** - Climate Change, Ecology, Sustainability

## 🔧 Configuration

### Environment Variables

#### Frontend (.env)
| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `REACT_APP_API_URL` | Backend API URL | No | http://localhost:5000 |
| `REACT_APP_TMDB_API_KEY` | TMDB API key | No | - |

#### Backend (.env)
| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `MONGODB_URI` | MongoDB connection string | Yes | - |
| `JWT_SECRET` | JWT secret key | Yes | - |
| `PORT` | Server port | No | 5000 |
| `FRONTEND_URL` | Frontend URL for CORS | No | http://localhost:3000 |
| `TMDB_API_KEY` | TMDB API key | No | - |

### Getting a TMDB API Key

1. Go to [https://www.themoviedb.org/](https://www.themoviedb.org/)
2. Sign up for an account
3. Navigate to Settings > API
4. Request an API key
5. Add it to your `.env` file

## 🛠️ Technologies Used

### Frontend
- **React 18.2.0** - UI framework
- **React Router DOM 6.20.0** - Client-side routing
- **Tailwind CSS 3.3.0** - Utility-first CSS
- **Lucide React 0.300.0** - Icon library
- **Framer Motion 10.16.0** - Animation library
- **Recharts 2.10.0** - Chart library
- **Axios 1.6.0** - HTTP client

### Backend
- **Express 4.18.2** - Web framework
- **MongoDB/Mongoose 7.6.3** - Database
- **JWT 9.0.2** - Authentication
- **Socket.io 4.7.2** - Real-time communication
- **Winston 3.10.0** - Logging

## 📊 Key Components

### Frontend Components

- **App.js**: Main application with routing and state management
- **Home**: Netflix-style landing page with featured content
- **SubjectSelection**: Browse by subject category
- **TopicSelection**: Select specific topics within subjects
- **Recommendations**: Filtered movie recommendations with educational metadata
- **MovieDetails**: Detailed view with learning objectives, concepts, quizzes
- **StudentDashboard**: Progress tracking, streaks, achievements
- **TeacherDashboard**: Class management, assignments, student progress
- **AIAssistant**: AI-powered chatbot for recommendations
- **Login/Signup**: User authentication with role selection

### Backend Routes

- **/api/auth**: User registration, login, logout
- **/api/users**: Profile management, preferences, learning stats
- **/api/movies**: Movie CRUD, search, watchlist management
- **/api/recommendations**: Personalized recommendations
- **/api/ai**: AI chat, summary generation, quiz generation

## 🎯 Educational Features

### Learning Metadata
Each educational movie includes:
- **Learning Objectives**: Clear goals for what students will learn
- **Key Concepts**: Important terms and ideas covered
- **Discussion Questions**: Prompts for classroom discussion
- **Vocabulary**: Key terms with definitions
- **Quizzes**: Interactive quizzes to test understanding
- **AI-Generated Summaries**: Concise summaries of content

### User Roles
- **Student**: Browse content, track progress, take quizzes
- **Teacher**: Create classes, assign content, monitor students
- **Admin**: Manage users, content, and platform settings

### Progress Tracking
- Learning streaks
- Hours watched
- Subjects explored
- Completed courses
- Achievement badges

## 🎨 Design System

- **Dark Mode**: Default dark theme with glassmorphism
- **Gradient Accents**: Purple-to-blue gradient for primary actions
- **Glass Cards**: Semi-transparent cards with blur effects
- **Responsive Grid**: Adaptive layouts for all screen sizes
- **Smooth Animations**: Framer Motion for transitions

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Touch Targets**: Minimum 44x44px touch targets
- **Flexible Grid**: Responsive grid layouts
- **Adaptive Typography**: Scalable font sizes
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)

## 🔒 Security

- **JWT Authentication**: Secure token-based auth
- **Password Hashing**: bcrypt for password storage
- **Rate Limiting**: API rate limiting to prevent abuse
- **Helmet**: Security headers for Express
- **CORS**: Configured cross-origin resource sharing

## 🐛 Troubleshooting

### Common Issues

**Movies not loading:**
- Check backend API is running on port 5000
- Verify MongoDB connection
- Check TMDB API key in backend `.env`

**Authentication not working:**
- Verify JWT_SECRET is set in backend `.env`
- Check browser console for errors
- Ensure cookies are enabled

**Styling not applying:**
- Run `npm install` to ensure Tailwind is installed
- Check that `index.css` is imported in `index.js`
- Verify Tailwind config file exists

## 📝 Development Scripts

### Frontend
```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

### Backend
```bash
# Start development server
npm run dev

# Start production server
npm start

# Run tests
npm test
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- TMDB for providing the movie database API
- Tailwind CSS for the excellent utility-first CSS framework
- React community for excellent documentation and tools
- All contributors who have helped improve this project

## 📞 Support

For issues, questions, or suggestions, please open an issue on the repository.

---

**Built with ❤️ for students, teachers, and lifelong learners**
