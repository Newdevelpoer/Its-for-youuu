import { useState, useEffect } from 'react';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const useVisitCounter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const incrementVisit = async () => {
      try {
        const res = await fetch(`${API_URL}/visits/increment`, { method: 'POST' });
        const data = await res.json();
        setCount(data.count);
      } catch {
        // Use localStorage fallback
        const localCount = parseInt(localStorage.getItem('visitCount') || '0', 10) + 1;
        localStorage.setItem('visitCount', String(localCount));
        setCount(localCount);
      }
    };

    const hasVisited = sessionStorage.getItem('hasVisited');
    if (!hasVisited) {
      incrementVisit();
      sessionStorage.setItem('hasVisited', 'true');
    } else {
      // Just fetch current count
      fetch(`${API_URL}/visits`)
        .then((res) => res.json())
        .then((data) => setCount(data.count))
        .catch(() => {
          setCount(parseInt(localStorage.getItem('visitCount') || '0', 10));
        });
    }
  }, []);

  return count;
};
