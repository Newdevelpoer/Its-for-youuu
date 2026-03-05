import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Gallery from './pages/Gallery'
import About from './pages/About'
import Games from './pages/Games'
import Surprise from './pages/Surprise'
import Login from './pages/Login'

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen transition-all duration-500">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/about" element={<About />} />
              <Route path="/games" element={<Games />} />
              <Route path="/surprise" element={<Surprise />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
          <Toaster position="top-right" />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}
