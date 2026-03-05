import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Scene3D from './components/Scene3D';

const Home = lazy(() => import('./pages/Home'));
const Gallery = lazy(() => import('./pages/Gallery'));
const About = lazy(() => import('./pages/About'));
const Games = lazy(() => import('./pages/Games'));
const Surprise = lazy(() => import('./pages/Surprise'));
const Login = lazy(() => import('./pages/Login'));

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <div className="text-5xl animate-bounce mb-4">💖</div>
      <p className="text-lg font-display text-gray-500 dark:text-gray-400">Loading magic...</p>
    </div>
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen font-body transition-colors duration-500 dark:bg-dark-navy dark:text-white bg-white text-gray-900">
            <Scene3D />
            <Navbar />
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/about" element={<About />} />
                <Route path="/games" element={<Games />} />
                <Route path="/surprise" element={<Surprise />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </Suspense>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
