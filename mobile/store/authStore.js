import { create } from "zustand";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isLoading: false,

  register: async (username, email, password) => {
    set({ isLoading: true });

    try {
      const response = await fetch("http://192.168.64.111:3000/api/auth/register", {
        // se estiveres no telemóvel, usa esta linha acima com IP local
        // para produção: https://react-native-barber.onrender.com/api/auth/register
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Something went wrong");

      // guardar no armazenamento local
      await AsyncStorage.setItem("user", JSON.stringify(data.user));
      await AsyncStorage.setItem("token", data.token);

      set({ token: data.token, user: data.user, isLoading: false });

      return { success: true };

    } catch (error) {
      set({ isLoading: false });
      return { success: false, message: error.message };
    }
  },

  login: async (email, password) => {
    set({ isLoading: true });
  
    try {
      const response = await fetch("http://192.168.64.111:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
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