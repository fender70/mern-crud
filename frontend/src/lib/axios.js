import axios from 'axios'

// Simple and robust: use environment variable or fall back to smart defaults
const BASE_URL = import.meta.env.VITE_API_URL || 
    (import.meta.env.MODE === 'development' ? 'http://localhost:5001/api' : '/api')

const api = axios.create({
    baseURL: BASE_URL,
});

export default api;