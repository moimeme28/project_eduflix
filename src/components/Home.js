import React from 'react';
import { Link } from 'react-router-dom';
import { Play, BookOpen, TrendingUp, Clock, Star, ArrowRight } from 'lucide-react';
import { SUBJECT_CATEGORIES } from '../data/subjects';

const Home = () => {
  return (
    <div className="pt-24 pb-12 px-4">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto mb-16 hero-gradient rounded-3xl p-8 md:p-16 glass-card">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold font-display mb-6 text-gradient">
            Learn Through Entertainment
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            Discover educational movies, documentaries, and series tailored to your learning goals. 
            From biology to history, learn any subject through engaging content.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/subjects"
              className="px-8 py-4 rounded-xl bg-gradient-primary font-semibold text-lg hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              <BookOpen className="w-5 h-5" />
              Start Learning
            </Link>
            <Link
              to="/subjects"
              className="px-8 py-4 rounded-xl glass-button font-semibold text-lg flex items-center gap-2"
            >
              <Play className="w-5 h-5" />
              Browse Content
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto mb-16">
        <h2 className="text-3xl font-bold font-display mb-8 text-center">Why EduFlix?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: <BookOpen className="w-8 h-8" />,
              title: 'Subject-Based Learning',
              description: 'Choose from 10+ subject categories with hundreds of topics'
            },
            {
              icon: <TrendingUp className="w-8 h-8" />,
              title: 'Personalized Recommendations',
              description: 'AI-powered suggestions based on your learning level and interests'
            },
            {
              icon: <Clock className="w-8 h-8" />,
              title: 'Track Progress',
              description: 'Monitor your learning journey with detailed analytics'
            }
          ].map((feature, index) => (
            <div key={index} className="glass-card p-6 hover:scale-105 transition-transform">
              <div className="w-16 h-16 rounded-xl bg-gradient-primary flex items-center justify-center mb-4 text-white">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Subjects */}
      <div className="max-w-7xl mx-auto mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold font-display">Popular Subjects</h2>
          <Link to="/subjects" className="flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {SUBJECT_CATEGORIES.slice(0, 5).map((category) => (
            <Link
              key={category.id}
              to="/subjects"
              className="glass-card p-6 text-center hover:scale-105 transition-transform group"
            >
              <div className="text-4xl mb-3">{category.icon}</div>
              <h3 className="font-semibold text-sm md:text-base group-hover:text-primary-400 transition-colors">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Content */}
      <div className="max-w-7xl mx-auto mb-16">
        <h2 className="text-3xl font-bold font-display mb-8">Featured Educational Content</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: 'The Science of Everything',
              subject: 'Science',
              rating: 9.2,
              image: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=400&h=600&fit=crop'
            },
            {
              title: 'World History: The Complete Story',
              subject: 'History',
              rating: 8.9,
              image: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=400&h=600&fit=crop'
            },
            {
              title: 'AI: The Future of Technology',
              subject: 'Technology',
              rating: 9.5,
              image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=600&fit=crop'
            }
          ].map((content, index) => (
            <Link key={index} to="/subjects" className="glass-card overflow-hidden hover:scale-105 transition-transform cursor-pointer">
              <div className="relative h-48 bg-cover bg-center" style={{ backgroundImage: `url(${content.image})` }}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="px-2 py-1 rounded bg-primary-500 text-xs font-medium">
                    {content.subject}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold mb-2">{content.title}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span>{content.rating}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto">
        <div className="glass-card p-8 md:p-12 text-center hero-gradient">
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
            Ready to Start Learning?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of students and teachers who are already using EduFlix to enhance their education through entertainment.
          </p>
          <Link
            to="/signup"
            className="inline-block px-8 py-4 rounded-xl bg-gradient-primary font-semibold text-lg hover:opacity-90 transition-opacity"
          >
            Create Free Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
