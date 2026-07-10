import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const SubjectSelection = ({ categories, onSelect }) => {
  const navigate = useNavigate();

  const handleSubjectClick = (category) => {
    onSelect(category);
    navigate(`/topics/${category.id}`);
  };

  return (
    <div className="pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold font-display mb-4 text-gradient">Choose Your Subject</h1>
          <p className="text-gray-400 text-lg">Select a subject to explore educational content</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleSubjectClick(category)}
              className="glass-card p-6 text-left hover:scale-105 transition-all group relative overflow-hidden"
              style={{ borderColor: `${category.color}40` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-current opacity-0 group-hover:opacity-10 transition-opacity" style={{ color: category.color }} />
              
              <div className="relative">
                <div className="text-5xl mb-4">{category.icon}</div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary-400 transition-colors">
                  {category.name}
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  {category.topics.length} topics available
                </p>
                <div className="flex flex-wrap gap-2">
                  {category.topics.slice(0, 3).map((topic) => (
                    <span
                      key={topic.id}
                      className="px-2 py-1 rounded text-xs bg-white/5 border border-white/10"
                    >
                      {topic.name}
                    </span>
                  ))}
                  {category.topics.length > 3 && (
                    <span className="px-2 py-1 rounded text-xs text-gray-400">
                      +{category.topics.length - 3} more
                    </span>
                  )}
                </div>
                <div className="mt-4 flex items-center gap-2 text-sm font-medium" style={{ color: category.color }}>
                  Explore <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubjectSelection;
