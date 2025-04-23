import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Alert,
  Platform,
} from "react-native";
import React, { useState } from "react";
import styles from "../../assets/styles/login.styles";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../constants/colors";
import { useRouter } from "expo-router";
import { useAuthStore } from "../../store/authStore";
import { useTheme } from "../../context/ThemeContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { isLoading, login } = useAuthStore();
  const router = useRouter();
  const { name, toggleTheme } = useTheme();

  const handleLogin = async () => {
    const result = await login(email, password);
    if (!result.success) {
      Alert.alert("Error", result.message);
    } else {
      console.log("Login feito com sucesso");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View
        style={[
          styles.container,
          { backgroundColor: name === "dark" ? "#2a0b1d" : "#ffeef8" },
        ]}
      >
        {/* Dark Mode Toggle */}
        <TouchableOpacity
          onPress={toggleTheme}
          style={{
            alignSelf: "flex-end",
            margin: 20,
            backgroundColor: name === "dark" ? "#3b0a36" : "#e91e63",
            width: 50,
            height: 28,
            borderRadius: 20,
            justifyContent: "center",
            padding: 2,
          }}
        >
          <View
            style={{
              width: 22,
              height: 22,
              borderRadius: 11,
              backgroundColor: "white",
              transform: [{ translateX: name === "dark" ? 22 : 2 }],
            }}
          />
        </TouchableOpacity>

        {/* IMAGE */}
        <View style={styles.topIllustration}>
          <Image
            source={require("../../assets/images/i2.png")}
            style={styles.illustrationImage}
            resizeMode="contain"
          />
        </View>

        <View
          style={[
            styles.card,
            { backgroundColor: name === "dark" ? "#3b0a36" : "white" },
          ]}
        >
          <View style={styles.formContainer}>
            {/* EMAIL */}
            <View style={styles.inputGroup}>
              <Text
                style={[
                  styles.label,
                  { color: name === "dark" ? "#ffeef8" : COLORS.textPrimary },
                ]}
              >
                Email
              </Text>
              <View
                style={[
                  styles.inputContainer,
                  {
                    backgroundColor:
                      name === "dark" ? "#3b0a36" : COLORS.inputBackground,
                    borderColor: name === "dark" ? "#FF3CAC" : COLORS.border,
                    borderWidth: 1,
                  },
                ]}
              >
                <Ionicons
                  name="mail-outline"
                  size={20}
                  color={COLORS.primary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={[styles.input, { color: name === "dark" ? "#ffeef8" : COLORS.textDark }]}

                  placeholder="Enter your email"
                  placeholderTextColor={
                    name === "dark" ? "#ffeef8" : COLORS.placeholderText
                  }
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            {/* PASSWORD */}
            <View style={styles.inputGroup}>
              <Text
                style={[
                  styles.label,
                  { color: name === "dark" ? "#ffeef8" : COLORS.textPrimary },
                ]}
              >
                Password
              </Text>
              <View
                style={[
                  styles.inputContainer,
                  {
                    backgroundColor:
                      name === "dark" ? "#3b0a36" : COLORS.inputBackground,
                    borderColor: name === "dark" ? "#FF3CAC" : COLORS.border,
                    borderWidth: 1,
                  },
                ]}
              >
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color={COLORS.primary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={[styles.input, { color: name === "dark" ? "#ffeef8" : COLORS.textDark }]}

                  placeholder="Enter your password"
                  placeholderTextColor={
                    name === "dark" ? "#ffeef8" : COLORS.placeholderText
                  }
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeIcon}
                >
                  <Ionicons
                    name={showPassword ? "eye-outline" : "eye-off-outline"}
                    size={20}
                    color={COLORS.primary}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* LOGIN BUTTON */}
            <TouchableOpacity
              style={[styles.button, { backgroundColor: COLORS.primary }]}
              onPress={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Login</Text>
              )}
            </TouchableOpacity>

            {/* SIGNUP LINK */}
            <View style={styles.footer}>
              <Text
                style={[
                  styles.footerText,
                  { color: name === "dark" ? "#ffeef8" : COLORS.textSecondary },
                ]}
              >
                Don't have an account?
              </Text>
              <TouchableOpacity onPress={() => router.push("/(auth)/signup")}>
                <Text style={[styles.link, { color: COLORS.primary }]}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
