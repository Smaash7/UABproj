import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useAuthStore } from '../../store/authStore';
import { useRouter } from 'expo-router';

export default function Home() {
  const { logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.replace("/(auth)"); // Redireciona para login
  };

  return (
    <View style={{ padding: 24 }}>
      <Text style={{ fontSize: 24, marginBottom: 16 }}>Home tab</Text>

      <TouchableOpacity onPress={handleLogout}>
        <Text style={{ color: "red", fontSize: 16 }}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
