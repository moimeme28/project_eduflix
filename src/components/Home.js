import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, BookOpen, TrendingUp, Clock, Star, ArrowRight, Zap, Users, Globe } from 'lucide-react';
import { SUBJECT_CATEGORIES } from '../data/subjects';

const FEATURED = [
  {
    title: 'The Science of Everything',
    subject: 'Science',
    rating: 9.2,
    duration: '2h 14m',
    image: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=400&h=600&fit=crop'
  },
  {
    title: 'World History: The Complete Story',
    subject: 'History',
    rating: 8.9,
    duration: '1h 58m',
    image: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=400&h=600&fit=crop'
  },
  {
    title: 'AI: The Future of Technology',
    subject: 'Technology',
    rating: 9.5,
    duration: '1h 42m',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=600&fit=crop'
  }
];

const STATS = [
  { icon: <BookOpen className="w-5 h-5" />, value: '500+', label: 'Educational Titles' },
  { icon: <Users className="w-5 h-5" />, value: '10K+', label: 'Active Learners' },
  { icon: <Globe className="w-5 h-5" />, value: '50+', label: 'Subjects Covered' },
  { icon: <Zap className="w-5 h-5" />, value: '4.9★', label: 'Average Rating' },
];

const Home = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="pt-24 pb-12 px-4">

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto mb-16">
        <div
          className={`hero-gradient glass-card p-8 md:p-16 rounded-3xl transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/20 border border-primary-500/30 text-primary-400 text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              AI-Powered Learning Platform
            </div>
            <h1 className="text-4xl md:text-6xl font-bold font-display mb-6 leading-tight">
              Learn Through{' '}
              <span className="text-gradient">Entertainment</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
              Discover educational movies, documentaries, and series tailored to your learning goals.
              From biology to history — learn any subject through engaging content.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/subjects"
                className="px-8 py-4 rounded-xl bg-gradient-primary font-semibold text-lg hover:opacity-90 transition-all hover:scale-105 flex items-center gap-2 shadow-lg"
              >
                <BookOpen className="w-5 h-5" />
                Start Learning
              </Link>
              <Link
                to="/subjects"
                className="px-8 py-4 rounded-xl glass-button font-semibold text-lg flex items-center gap-2 hover:scale-105 transition-all"
              >
                <Play className="w-5 h-5" />
                Browse Content
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="max-w-7xl mx-auto mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((stat, i) => (
            <div
              key={i}
              className={`glass-card p-5 text-center transition-all duration-700 hover:scale-105 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-primary mb-3">
                {stat.icon}
              </div>
              <div className="text-2xl font-bold text-gradient">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto mb-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold font-display mb-3">Why EduFlix?</h2>
          <p className="text-gray-400 max-w-xl mx-auto">Everything you need to turn entertainment into education</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: <BookOpen className="w-8 h-8" />,
              title: 'Subject-Based Learning',
              description: 'Choose from 10+ subject categories with hundreds of curated topics and content',
              gradient: 'from-blue-500 to-cyan-500'
            },
            {
              icon: <TrendingUp className="w-8 h-8" />,
              title: 'Personalized Recommendations',
              description: 'AI-powered suggestions based on your learning level, mood, and interests',
              gradient: 'from-purple-500 to-pink-500'
            },
            {
              icon: <Clock className="w-8 h-8" />,
              title: 'Track Your Progress',
              description: 'Monitor your learning journey with detailed analytics, streaks and achievements',
              gradient: 'from-orange-500 to-red-500'
            }
          ].map((feature, index) => (
            <div
              key={index}
              className={`glass-card p-6 hover:scale-105 transition-all duration-500 group ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Subjects */}
      <div className="max-w-7xl mx-auto mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold font-display">Popular Subjects</h2>
          <Link to="/subjects" className="flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors font-medium">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {SUBJECT_CATEGORIES.slice(0, 5).map((category, i) => (
            <Link
              key={category.id}
              to="/subjects"
              className={`glass-card p-6 text-center hover:scale-105 transition-all group ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${300 + i * 80}ms`, borderColor: `${category.color}30` }}
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{category.icon}</div>
              <h3 className="font-semibold text-sm md:text-base group-hover:text-primary-400 transition-colors">
                {category.name}
              </h3>
              <p className="text-xs text-gray-500 mt-1">{category.topics?.length || 0} topics</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Content */}
      <div className="max-w-7xl mx-auto mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold font-display">Featured Content</h2>
          <Link to="/subjects" className="flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors font-medium">
            See More <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {FEATURED.map((content, index) => (
            <Link
              key={index}
              to="/subjects"
              className={`glass-card overflow-hidden hover:scale-105 transition-all duration-300 group ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${400 + index * 100}ms` }}
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={content.image}
                  alt={content.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-full bg-primary-500/90 text-xs font-semibold">
                    {content.subject}
                  </span>
                </div>
                <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  <span className="text-xs font-medium">{content.rating}</span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-14 h-14 rounded-full bg-gradient-primary flex items-center justify-center shadow-lg">
                    <Play className="w-6 h-6 text-white ml-1" />
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold mb-2 group-hover:text-primary-400 transition-colors">{content.title}</h3>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {content.duration}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto">
        <div className="glass-card p-8 md:p-14 text-center hero-gradient rounded-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-sm font-medium mb-6">
            🎓 Join the Learning Revolution
          </div>
          <h2 className="text-3xl md:text-5xl font-bold font-display mb-4 leading-tight">
            Ready to Start <span className="text-gradient">Learning?</span>
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-lg">
            Join thousands of students and teachers already using EduFlix to enhance their education through entertainment.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/signup"
              className="px-10 py-4 rounded-xl bg-gradient-primary font-bold text-lg hover:opacity-90 transition-all hover:scale-105"
            >
              Create Free Account
            </Link>
            <Link
              to="/subjects"
              className="px-10 py-4 rounded-xl glass-button font-bold text-lg hover:scale-105 transition-all"
            >
              Explore Content
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;
