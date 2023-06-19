import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Reemplaza con la URL de tu API
  headers: {
    'Access-Control-Allow-Origin': '*', // Reemplaza con el origen permitido para CORS
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
    'Access-Control-Allow-Headers': 'Content-Type, application/json',
  },
});

export default instance;
