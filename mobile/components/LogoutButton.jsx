import { View, Text, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../store/authStore';
import { Ionicons } from '@expo/vector-icons';
import styles from '../assets/styles/profile.styles';

export default function LogoutButton() {
  const { logout } = useAuthStore();
  const router = useRouter();

  const confirmLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "OK",
          onPress: async () => {
            await logout();
            router.replace("/(auth)/"); // Vai diretamente para o ecrã de login (index.jsx)
          }
        }
      ]
    );
  };

  return (
    <TouchableOpacity style={styles.logoutButton} onPress={confirmLogout}>
      <Ionicons name="log-out-outline" size={20} color="white" />
      <Text style={styles.logoutText}>Logout</Text>
    </TouchableOpacity>
  );
}
