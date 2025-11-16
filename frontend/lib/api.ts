import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth API
export const authApi = {
  getChallenge: (walletAddress: string) =>
    api.post('/auth/challenge', { walletAddress }),
  
  login: (walletAddress: string, signature: string, nonce: string, message: string) =>
    api.post('/auth/login', { walletAddress, signature, nonce, message }),
};

// Resume API
export const resumeApi = {
  upload: (file: File, walletAddress: string) => {
    const formData = new FormData();
    formData.append('resume', file);
    formData.append('walletAddress', walletAddress);
    return api.post('/resume/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  
  publish: (walletAddress: string, credentialIds: string[], signature: string) =>
    api.post('/resume/publish', { walletAddress, credentialIds, signature }),
};

// Credentials API
export const credentialsApi = {
  getAll: (walletAddress: string) =>
    api.get('/credentials', { params: { walletAddress } }),
  
  getById: (id: string) =>
    api.get(`/credentials/${id}`),
};

// Verification API
export const verificationApi = {
  verify: (credentialId: string, ownerDid: string) =>
    api.post('/verification/verify', { credentialId, ownerDid }),
};

// Institution API
export const institutionApi = {
  getPending: (institutionPubkey: string) =>
    api.get('/institution/pending', { params: { institutionPubkey } }),
  
  attest: (institutionPubkey: string, credentialId: string, signature: string) =>
    api.post('/institution/attest', { institutionPubkey, credentialId, signature }),
};

export default api;

