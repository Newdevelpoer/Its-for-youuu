import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const questions = [
  {
    q: 'What is your love language?',
    options: [
      { text: 'Words of Affirmation 💬', points: 3 },
      { text: 'Acts of Service 🛠️', points: 2 },
      { text: 'Physical Touch 🤗', points: 4 },
      { text: 'Quality Time ⏰', points: 5 },
    ],
  },
  {
    q: 'What\'s your ideal date?',
    options: [
      { text: 'Stargazing on a rooftop 🌟', points: 5 },
      { text: 'Exploring a new city 🗺️', points: 4 },
      { text: 'Cooking together at home 🍳', points: 3 },
      { text: 'Movie marathon 🎬', points: 2 },
    ],
  },
  {
    q: 'Which season describes your love?',
    options: [
      { text: 'Spring — always blooming 🌸', points: 5 },
      { text: 'Summer — warm and bright ☀️', points: 4 },
      { text: 'Autumn — deep and cozy 🍂', points: 3 },
      { text: 'Winter — quiet and magical ❄️', points: 4 },
    ],
  },
  {
    q: 'What do you value most in a relationship?',
    options: [
      { text: 'Trust & Honesty 🤝', points: 5 },
      { text: 'Laughter & Fun 😄', points: 4 },
      { text: 'Deep conversations 💭', points: 5 },
      { text: 'Adventures together 🌏', points: 3 },
    ],
  },
  {
    q: 'If you could describe love in one emoji:',
    options: [
      { text: '💖 Pure & warm', points: 5 },
      { text: '🌈 Colorful & joyful', points: 4 },
      { text: '⭐ Bright & constant', points: 5 },
      { text: '🌊 Deep & endless', points: 4 },
    ],
  },
];

const results = [
  { min: 0, max: 10, title: 'Free Spirit 🦋', desc: 'Your love is playful and free. You value independence while cherishing deep connections.' },
  { min: 11, max: 16, title: 'Hopeless Romantic 💫', desc: 'You believe in fairy tales and you deserve one. Your love is warm, thoughtful and genuine.' },
  { min: 17, max: 22, title: 'Soulmate Energy 🌸', desc: 'You are someone who loves deeply and unconditionally. You are a rare gem.' },
  { min: 23, max: 25, title: 'Pure Heart 💖', desc: 'Your love is genuine, rare, and absolutely beautiful. The world is better because of how you love.' },
];

const LoveQuiz = () => {
  const { theme } = useTheme();
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(null);

  const handleAnswer = (points, idx) => {
    setSelectedIdx(idx);
    setTimeout(() => {
      const newScore = score + points;
      if (current + 1 >= questions.length) {
        setScore(newScore);
        setDone(true);
      } else {
        setCurrent(current + 1);
        setScore(newScore);
        setSelectedIdx(null);
      }
    }, 500);
  };

  const reset = () => {
    setCurrent(0);
    setScore(0);
    setDone(false);
    setSelectedIdx(null);
  };

  const getResult = () => results.find((r) => score >= r.min && score <= r.max) || results[results.length - 1];

  if (done) {
    const result = getResult();
    return (
      <div className="max-w-lg mx-auto text-center">
        <div className="text-6xl mb-4 heartbeat">{result.title.split(' ').pop()}</div>
        <h2 className={`font-dancing font-bold text-3xl mb-3 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
          {result.title}
        </h2>
        <p className={`font-quicksand text-lg mb-8 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
          {result.desc}
        </p>
        <div className={`p-4 rounded-2xl mb-8 ${theme === 'light' ? 'bg-light-purple/20' : 'bg-dark-teal/20'}`}>
          <p className={`font-quicksand text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
            Score: {score}/{questions.length * 5}
          </p>
        </div>
        <button
          onClick={reset}
          className={`px-8 py-3 rounded-full font-bold transition-all hover:scale-105 ${
            theme === 'light'
              ? 'bg-gradient-to-r from-light-purple to-light-pink2 text-gray-700'
              : 'bg-gradient-to-r from-dark-teal to-dark-blue2 text-white'
          }`}
        >
          Try Again 🔄
        </button>
      </div>
    );
  }

  const q = questions[current];

  return (
    <div className="max-w-lg mx-auto">
      {/* Progress */}
      <div className="flex items-center gap-2 mb-6">
        {questions.map((_, i) => (
          <div
            key={i}
            className={`flex-1 h-2 rounded-full transition-all duration-300 ${
              i <= current
                ? theme === 'light' ? 'bg-light-purple' : 'bg-dark-teal'
                : theme === 'light' ? 'bg-gray-200' : 'bg-gray-700'
            }`}
          />
        ))}
      </div>

      <p className={`font-quicksand text-sm mb-2 ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`}>
        Question {current + 1} of {questions.length}
      </p>
      <h2 className={`font-dancing font-bold text-2xl mb-6 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
        {q.q}
      </h2>

      <div className="grid grid-cols-1 gap-3">
        {q.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(opt.points, i)}
            className={`px-5 py-4 rounded-2xl text-left font-quicksand text-sm font-semibold transition-all duration-200 hover:scale-[1.02] ${
              selectedIdx === i
                ? theme === 'light'
                  ? 'bg-light-purple text-gray-800 scale-[1.02]'
                  : 'bg-dark-teal text-white scale-[1.02]'
                : theme === 'light'
                ? 'bg-white/70 hover:bg-light-purple/20 text-gray-700 border border-light-purple/20'
                : 'bg-dark-navy/60 hover:bg-dark-blue2/20 text-gray-200 border border-dark-blue2/20'
            }`}
          >
            {opt.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LoveQuiz;
