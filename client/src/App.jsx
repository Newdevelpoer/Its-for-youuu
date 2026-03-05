import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import PageTransition from './components/PageTransition';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import GalleryCategory from './pages/GalleryCategory';
import About from './pages/About';
import Games from './pages/Games';
import Surprise from './pages/Surprise';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <div className="min-h-screen">
            <Navbar />
            <PageTransition>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/gallery/:category" element={<GalleryCategory />} />
                <Route path="/about" element={<About />} />
                <Route path="/games" element={<Games />} />
                <Route path="/surprise" element={<Surprise />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </PageTransition>
          </div>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
