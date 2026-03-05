import { useState, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

const PhotoUpload = ({ category, onUpload }) => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const fileRef = useRef(null);

  if (!user) return null;

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setError('');
    setUploading(true);

    const formData = new FormData();
    formData.append('photo', file);
    formData.append('category', category);

    try {
      const res = await api.post('/photos/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      onUpload && onUpload(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed');
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <input
        ref={fileRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        onChange={handleUpload}
        className="hidden"
        id="photo-upload"
      />
      <label
        htmlFor="photo-upload"
        className={`cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-200 ${
          uploading
            ? 'opacity-50 cursor-not-allowed'
            : theme === 'light'
            ? 'bg-light-purple/40 hover:bg-light-purple/70 text-gray-700'
            : 'bg-dark-teal/30 hover:bg-dark-teal/60 text-white'
        }`}
      >
        {uploading ? (
          <>
            <span className="spinner inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
            Uploading...
          </>
        ) : (
          <>📸 Upload Photo</>
        )}
      </label>
      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}
    </div>
  );
};

export default PhotoUpload;
