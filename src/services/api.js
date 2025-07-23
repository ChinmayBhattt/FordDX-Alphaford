import axios from 'axios';

// API base URL - using environment variable with fallback
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API functions
export const predictProteinStructure = async (uniprotId) => {
  try {
    const response = await api.post('/api/predict', { uniprot_id: uniprotId });
    return response.data;
  } catch (error) {
    console.error('Error predicting protein structure:', error);
    throw error;
  }
};

export const verifyOnBlockchain = async (blockchainHash) => {
  try {
    const response = await api.get(`/api/verify/${blockchainHash}`);
    return response.data;
  } catch (error) {
    console.error('Error verifying on blockchain:', error);
    throw error;
  }
};

export default api;