import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://au-pair.onrender.com";

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      // Get token from localStorage or Zustand store
      let token = localStorage.getItem("auth-token");

      // If no token in localStorage, try to get from Zustand store
      if (!token) {
        const storedState = localStorage.getItem("auth-storage");
        if (storedState) {
          try {
            const parsedState = JSON.parse(storedState);
            token = parsedState.state?.token;
          } catch (error) {
            console.error("Error parsing auth state:", error);
          }
        }
      }

      if (token && token !== "null" && token !== "undefined") {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      if (typeof window !== "undefined") {
        localStorage.removeItem("auth-token");
        localStorage.removeItem("auth-storage");
        window.location.href = "/auth/login";
      }
    }
    return Promise.reject(error);
  },
);

// Auth API calls
export const authAPI = {
  login: (email: string, password: string) =>
    api.post("/auth/login", { email, password }),

  register: (userData: any) => api.post("/auth/register", userData),

  logout: () => api.post("/auth/logout"),
};

// Profile API calls
export const profileAPI = {
  getProfile: () => api.get("/profiles/me"),

  updateProfile: (profileData: any) => api.put("/profiles", profileData),

  getMatches: () => api.get("/matches"),
};

// Messages API calls
export const messagesAPI = {
  getConversations: () => api.get("/messages/conversations"),

  getMessages: (conversationId: string) =>
    api.get(`/messages/${conversationId}`),

  sendMessage: (conversationId: string, message: string) =>
    api.post(`/messages/${conversationId}`, { message }),
};

// Documents API calls
export const documentsAPI = {
  uploadDocument: (file: File, type: string) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", type);
    return api.post("/documents/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  getDocuments: () => api.get("/documents"),
};
