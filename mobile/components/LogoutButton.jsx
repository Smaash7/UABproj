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
    console.log("Botão de logout clicado"); // <= este deve aparecer sempre que clicas
  
    Alert.alert(
      "Logout",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "OK",
          onPress: async () => {
            console.log("A fazer logout..."); // <= deve aparecer se clicares OK no alert
            await logout();
            console.log("Logout completo");   // <= este deve aparecer depois do logout
            router.replace("/(auth)/");
          },
        },
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
