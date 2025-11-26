import { auth } from "@/lib/firebase";
import { onAuthStateChanged as firebaseOnAuthStateChanged } from "firebase/auth";

const API_BASE_URL = import.meta.env.VITE_FIREBASE_FUNCTIONS_URL || "http://localhost:5001/yasin-husen-portfolio/us-central1/api";

// Get auth token
const getAuthToken = async (): Promise<string> => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("User not authenticated");
  }
  return await user.getIdToken();
};

// Generic API call helper
const apiCall = async (endpoint: string, method: string = "GET", data?: any) => {
  const token = await getAuthToken();
  
  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  };
  
  if (data && method !== "GET") {
    options.body = JSON.stringify(data);
  }
  
  const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "API request failed");
  }
  
  return await response.json();
};

// ============================================
// PROJECTS API
// ============================================

export const projectsAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/api/projects`);
    return await response.json();
  },
  
  getById: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/api/projects/${id}`);
    return await response.json();
  },
  
  create: async (projectData: any) => {
    return await apiCall("/api/projects", "POST", projectData);
  },
  
  update: async (id: string, projectData: any) => {
    return await apiCall(`/api/projects/${id}`, "PUT", projectData);
  },
  
  delete: async (id: string) => {
    return await apiCall(`/api/projects/${id}`, "DELETE");
  },
};

// ============================================
// SKILLS API
// ============================================

export const skillsAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/api/skills`);
    return await response.json();
  },
  
  create: async (skillData: any) => {
    return await apiCall("/api/skills", "POST", skillData);
  },
  
  update: async (id: string, skillData: any) => {
    return await apiCall(`/api/skills/${id}`, "PUT", skillData);
  },
  
  delete: async (id: string) => {
    return await apiCall(`/api/skills/${id}`, "DELETE");
  },
};

// ============================================
// ABOUT API
// ============================================

export const aboutAPI = {
  get: async () => {
    const response = await fetch(`${API_BASE_URL}/api/about`);
    return await response.json();
  },
  
  update: async (aboutData: any) => {
    return await apiCall("/api/about", "PUT", aboutData);
  },
};

// ============================================
// MESSAGES API
// ============================================

export const messagesAPI = {
  getAll: async () => {
    return await apiCall("/api/messages", "GET");
  },
  
  markAsRead: async (id: string) => {
    return await apiCall(`/api/messages/${id}/read`, "PUT");
  },
  
  delete: async (id: string) => {
    return await apiCall(`/api/messages/${id}`, "DELETE");
  },
};

// ============================================
// AUTHENTICATION
// ============================================

export const authAPI = {
  signIn: async (email: string, password: string) => {
    const { signInWithEmailAndPassword } = await import("firebase/auth");
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  },
  
  signOut: async () => {
    const { signOut } = await import("firebase/auth");
    await signOut(auth);
  },
  
  getCurrentUser: () => {
    return auth.currentUser;
  },
  
  onAuthStateChanged: (callback: (user: any) => void) => {
    return firebaseOnAuthStateChanged(auth, callback);
  },
};

// ============================================
// STORAGE HELPERS
// ============================================

export const storageAPI = {
  uploadImage: async (file: File, path: string) => {
    const { ref, uploadBytes, getDownloadURL } = await import("firebase/storage");
    const { storage } = await import("@/lib/firebase");
    
    const storageRef = ref(storage, path);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return downloadURL;
  },
  
  deleteImage: async (path: string) => {
    const { ref, deleteObject } = await import("firebase/storage");
    const { storage } = await import("@/lib/firebase");
    
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
  },
};
