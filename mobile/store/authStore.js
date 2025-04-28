import { create } from "zustand";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../constants/api';

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isLoading: false,

  register: async (username, email, password) => {
    console.log("SET LOADING TRUE");
    set({ isLoading: true });

    console.log("try")
    try {
      console.log("try 2")
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      console.log("REGISTER RESPONSE", response);

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Something went wrong");

      console.log("REGISTER DATA", data);
      // guardar no armazenamento local
      await AsyncStorage.setItem("user", JSON.stringify(data.user));
      await AsyncStorage.setItem("token", data.token);

      set({ token: data.token, user: data.user, isLoading: false });

      console.log("REGISTERED USER", data.user);
      return { success: true };

    } catch (error) {
      set({ isLoading: false });
      return { success: false, message: error.message };
    }
  },

  login: async (email, password) => {
    set({ isLoading: true });

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("LOGIN DATA", data);

      if (!response.ok) throw new Error(data.message || "Login failed");

      await AsyncStorage.setItem("user", JSON.stringify(data.user));
      await AsyncStorage.setItem("token", data.token);

      set({ token: data.token, user: data.user, isLoading: false });

      return { success: true };

    } catch (error) {
      set({ isLoading: false });
      return { success: false, message: error.message };
    }
  },

  checkAuth: async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const userJson = await AsyncStorage.getItem("user");
      const user = userJson ? JSON.parse(userJson) : null;

      set({ token, user });
    } catch (error) {
      console.log("Auth check failed", error);
    }
  },

  logout: async () => {
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("token");
    set({ token: null, user: null });
  },
}));
