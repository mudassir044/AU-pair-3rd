
import axios from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://au-pair.onrender.com'

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
})

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem('user')
    if (user) {
      const userData = JSON.parse(user)
      config.headers.Authorization = `Bearer ${userData.token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Auth API calls
export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  
  register: (userData: any) =>
    api.post('/auth/register', userData),
  
  logout: () =>
    api.post('/auth/logout'),
}

// Profile API calls
export const profileAPI = {
  getProfile: () =>
    api.get('/api/profiles/me'),
  
  updateProfile: (profileData: any) =>
    api.put('/api/profiles', profileData),
  
  getMatches: () =>
    api.get('/api/matches'),
}

// Messages API calls
export const messagesAPI = {
  getConversations: () =>
    api.get('/api/messages/conversations'),
  
  getMessages: (conversationId: string) =>
    api.get(`/api/messages/${conversationId}`),
  
  sendMessage: (conversationId: string, message: string) =>
    api.post(`/api/messages/${conversationId}`, { message }),
}

// Documents API calls
export const documentsAPI = {
  uploadDocument: (file: File, type: string) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('type', type)
    return api.post('/api/documents/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
  
  getDocuments: () =>
    api.get('/api/documents'),
}
