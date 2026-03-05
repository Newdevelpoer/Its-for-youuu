import { useState, useEffect } from 'react';
import api from '../utils/api';
import { useTheme } from '../context/ThemeContext';

const VisitCounter = () => {
  const { theme } = useTheme();
  const [count, setCount] = useState(null);

  useEffect(() => {
    const incrementAndFetch = async () => {
      try {
        const res = await api.post('/visits/increment');
        setCount(res.data.count);
      } catch {
        try {
          const res = await api.get('/visits');
          setCount(res.data.count);
        } catch {
          setCount('?');
        }
      }
    };
    incrementAndFetch();
  }, []);

  return (
    <div
      className={`fixed bottom-4 right-4 z-40 flex items-center gap-2 px-3 py-2 rounded-full shadow-lg glass font-quicksand text-sm font-semibold ${
        theme === 'light'
          ? 'bg-white/80 text-gray-700'
          : 'bg-dark-navy/80 text-gray-200'
      }`}
    >
      <span className="heartbeat text-red-400 text-lg">♥</span>
      <span>{count !== null ? count : '...'} visits</span>
    </div>
  );
};

export default VisitCounter;
