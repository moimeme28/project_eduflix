import React from 'react';
import { useNavigate } from 'react-router-dom';

const TopicSelection = ({ subject, onSelect }) => {
  const navigate = useNavigate();

  if (!subject) {
    return (
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">Please select a subject first</p>
        </div>
      </div>
    );
  }

  const handleTopicClick = (topic) => {
    onSelect(topic);
    navigate('/recommendations');
  };

  return (
    <div className="pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => navigate('/subjects')}
          className="mb-6 text-gray-400 hover:text-white transition-colors flex items-center gap-2"
        >
          ← Back to Subjects
        </button>

        <div className="text-center mb-12">
          <div className="text-6xl mb-4">{subject.icon}</div>
          <h1 className="text-4xl font-bold font-display mb-4 text-gradient">
            {subject.name}
          </h1>
          <p className="text-gray-400 text-lg">Choose a topic to get personalized recommendations</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {subject.topics.map((topic) => (
            <button
              key={topic.id}
              onClick={() => handleTopicClick(topic)}
              className="glass-card p-6 text-left hover:scale-105 transition-all group"
              style={{ borderColor: `${subject.color}40` }}
            >
              <h3 className="text-lg font-bold mb-3 group-hover:text-primary-400 transition-colors">
                {topic.name}
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                {topic.subtopics.length} subtopics
              </p>
              <div className="flex flex-wrap gap-2">
                {topic.subtopics.slice(0, 3).map((subtopic) => (
                  <span
                    key={subtopic}
                    className="px-2 py-1 rounded text-xs bg-white/5 border border-white/10"
                  >
                    {subtopic}
                  </span>
                ))}
                {topic.subtopics.length > 3 && (
                  <span className="px-2 py-1 rounded text-xs text-gray-400">
                    +{topic.subtopics.length - 3} more
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopicSelection;
