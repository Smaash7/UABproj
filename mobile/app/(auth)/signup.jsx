import {
  View,
  Text,
  Platform,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import styles from "../../assets/styles/signup.styles";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../constants/colors";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useAuthStore } from "../../store/authStore";
import { useTheme } from "../../context/ThemeContext";
import { useTranslation } from "react-i18next"; // Importar a função de tradução

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { user, isLoading, register, token } = useAuthStore();
  const router = useRouter();
  const { name, toggleTheme } = useTheme();
  const { name: themeName } = useTheme();
  const { t } = useTranslation(); 

  const handleSignUp = async () => {
    const result = await register(username, email, password);
    if (!result.success) Alert.alert(t("error"), result.message); 
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View
        style={[styles.container, { backgroundColor: name === "dark" ? "#2a0b1d" : "#ffeef8" }]}
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

        <View
          style={[styles.card, { backgroundColor: name === "dark" ? "#3b0a36" : "white" }]}
        >
          {/* HEADER */}
          <View style={styles.header}>
            <Text
              style={[
                styles.title,
                { color: name === "dark" ? "#ffeef8" : COLORS.textPrimary },
              ]}
            >
              {t('signup.title')} 
            </Text>
            <Text
              style={[
                styles.subtitle,
                { color: name === "dark" ? "#ffeef8" : COLORS.textSecondary },
              ]}
            >
              {t('signup.create_account')} 
            </Text>
          </View>

          <View style={styles.formContainer}>
            {/* Username Input */}
            <Text
              style={[
                styles.label,
                { color: name === "dark" ? "#ffeef8" : COLORS.textPrimary },
              ]}
            >
              {t('signup.username')} 
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
                name="person-outline"
                size={20}
                color={COLORS.primary}
                style={styles.inputIcon}
              />
              <TextInput
                style={[
                  styles.input,
                  { color: themeName === "dark" ? "#ffeef8" : COLORS.textDark },
                ]}
                placeholder={t('signup.enter_username')} 
                placeholderTextColor={name === "dark" ? "#ffeef8" : COLORS.placeholderText}
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
              />
            </View>

            {/* Email Input */}
            <View style={styles.inputGroup}>
              <Text
                style={[
                  styles.label,
                  { color: name === "dark" ? "#ffeef8" : COLORS.textPrimary },
                ]}
              >
                {t('signup.email')} 
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
                  style={[
                    styles.input,
                    {
                      color: themeName === "dark" ? "#ffeef8" : COLORS.textDark,
                    },
                  ]}
                  placeholder={t('signup.enter_email')}
                  placeholderTextColor={name === "dark" ? "#ffeef8" : COLORS.placeholderText}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            {/* Password Input */}
            <View style={styles.inputGroup}>
              <Text
                style={[
                  styles.label,
                  { color: name === "dark" ? "#ffeef8" : COLORS.textPrimary },
                ]}
              >
                {t('signup.password')} 
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
                  style={[
                    styles.input,
                    {
                      color: themeName === "dark" ? "#ffeef8" : COLORS.textDark,
                    },
                  ]}
                  placeholder={t('signup.enter_password')}
                  placeholderTextColor={name === "dark" ? "#ffeef8" : COLORS.placeholderText}
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

            {/* Sign Up Button */}
            <TouchableOpacity
              style={[styles.button, { backgroundColor: COLORS.primary }]}
              onPress={handleSignUp}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>{t('signup.sign_up')}</Text> 
              )}
            </TouchableOpacity>

            {/* FOOTER */}
            <View style={styles.footer}>
              <Text
                style={[
                  styles.footerText,
                  { color: name === "dark" ? "#ffeef8" : COLORS.textSecondary },
                ]}
              >
                {t('signup.already_have_account')}{" "}
              </Text>
              <TouchableOpacity onPress={() => router.push("/(auth)")}>
                <Text style={[styles.link, { color: COLORS.primary }]}>
                  {t('signup.log_in')} {/* Substituir texto do link por tradução */}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
