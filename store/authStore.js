import { create } from "zustand";
import axios from "axios";
import ENV from '../env';  // Import your environment configuration

// Use the API URL from ENV.js
const API_URL = ENV.API_BASE_URL;

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: false,
    message: null,

    // Signup method
    signup: async (email, password, name) => {
      set({ isLoading: true, error: null });
      try {
        const response = await axios.post(`${API_URL}/signup`, { email, password, name });
        set({ user: response.data.user, isAuthenticated: true, isLoading: false });
        return response;  // Return the response for further actions
      } catch (error) {
        set({ error: error.response?.data?.message || "Error signing up", isLoading: false });
        throw error;
      }
    },

    // Login method
    login: async (email, password) => {
      set({ isLoading: true, error: null });
      try {
        const response = await axios.post(`${API_URL}/login`, { email, password });
        set({
          isAuthenticated: true,
          user: response.data.user,
          error: null,
          isLoading: false,
        });
        return response;
      } catch (error) {
        set({ error: error.response?.data?.message || "Error logging in", isLoading: false });
        throw error;
      }
    },

    // Logout method
    logout: async () => {
      set({ isLoading: true, error: null });
      try {
        await axios.post(`${API_URL}/logout`);
        set({ user: null, isAuthenticated: false, error: null, isLoading: false });
      } catch (error) {
        set({ error: "Error logging out", isLoading: false });
        throw error;
      }
    },

    // Verify email method
    verifyEmail: async (code) => {
      set({ isLoading: true, error: null });
      try {
        const response = await axios.post(`${API_URL}/verify-email`, { code });
        set({ user: response.data.user, isAuthenticated: true, isLoading: false });
        return response.data;
      } catch (error) {
        set({ error: error.response?.data?.message || "Error verifying email", isLoading: false });
        throw error;
      }
    },

    // Check authentication status on app load
    checkAuth: async () => {
      set({ isCheckingAuth: true, error: null });
      try {
        const response = await axios.get(`${API_URL}/check-auth`);
        set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
      } catch (error) {
        set({ error: null, isCheckingAuth: false, isAuthenticated: false });
      }
    },

    // Forgot password method
    forgotPassword: async (email) => {
      set({ isLoading: true, error: null });
      try {
        const response = await axios.post(`${API_URL}/forgot-password`, { email });
        set({ message: response.data.message, isLoading: false });
        return response;
      } catch (error) {
        set({
          isLoading: false,
          error: error.response?.data?.message || "Error sending reset password email",
        });
        throw error;
      }
    },

    // Reset password method
    resetPassword: async (token, password) => {
      set({ isLoading: true, error: null });
      try {
        const response = await axios.post(`${API_URL}/reset-password/${token}`, { password });
        set({ message: response.data.message, isLoading: false });
        return response;
      } catch (error) {
        set({
          isLoading: false,
          error: error.response?.data?.message || "Error resetting password",
        });
        throw error;
      }
    },
}));
