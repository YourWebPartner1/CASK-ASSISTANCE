// API Configuration
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Debug: Log API URL in development (remove in production if needed)
if (import.meta.env.DEV) {
  console.log('API_URL:', API_URL);
  console.log('VITE_API_URL env:', import.meta.env.VITE_API_URL);
}

export default API_URL;

