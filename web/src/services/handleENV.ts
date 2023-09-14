export function getEnvVariables() {
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost';
  const API_PORT = import.meta.env.VITE_API_PORT || '3333';

  return {
    API_URL,
    API_PORT
  };
}