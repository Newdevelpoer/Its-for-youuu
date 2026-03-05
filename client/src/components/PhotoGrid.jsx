import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const PhotoGrid = ({ photos }) => {
  const { theme } = useTheme();
  const [selected, setSelected] = useState(null);

  if (!photos || photos.length === 0) {
    return (
      <div className={`text-center py-16 font-quicksand ${
        theme === 'light' ? 'text-gray-400' : 'text-gray-500'
      }`}>
        <div className="text-5xl mb-4">📷</div>
        <p className="text-lg">No memories yet. Add the first one! ✨</p>
      </div>
    );
  }

  return (
    <>
      <div className="masonry-grid">
        {photos.map((photo, i) => (
          <div
            key={photo._id || i}
            className="masonry-item cursor-pointer group"
            onClick={() => setSelected(photo)}
          >
            <div className={`rounded-2xl overflow-hidden shadow-md transition-all duration-300 group-hover:shadow-xl group-hover:scale-[1.02] ${
              theme === 'light'
                ? 'shadow-light-purple/30 hover:shadow-light-purple/60'
                : 'shadow-dark-teal/20 hover:shadow-dark-teal/40'
            }`}>
              <img
                src={photo.url}
                alt={photo.originalName || 'Memory'}
                loading="lazy"
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelected(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={selected.url}
              alt={selected.originalName || 'Memory'}
              className="w-full h-auto max-h-[85vh] object-contain rounded-2xl shadow-2xl"
            />
            <button
              onClick={() => setSelected(null)}
              className="absolute top-3 right-3 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center text-xl hover:bg-black/80 transition-all"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PhotoGrid;
