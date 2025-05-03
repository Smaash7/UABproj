import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import styles from "../../assets/styles/create.styles";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../constants/colors";
import { useAuthStore } from "../../store/authStore";
import { API_URL } from "../../constants/api";
import { useTheme } from "../../context/ThemeContext";
import { useTranslation } from "react-i18next"; 

import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

export default function Create() {
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [rating, setRating] = useState(3);
  const [image, setImage] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { token } = useAuthStore();
  const theme = useTheme();
  const { t } = useTranslation();

  const pickImage = async () => {
    try {
      if (Platform.OS === "android") {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(t("create.permission_alert")); 
          return;
        }
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "images",
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.3,
        base64: true,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
        if (result.assets[0].base64) {
          setImageBase64(result.assets[0].base64);
        } else {
          const base64 = await convertToBase64(result.assets[0].uri, {
            endcoding: FileSystem.EndcodingType.Base64,
          });
          setImageBase64(base64);
        }
      }
    } catch (error) {
      console.error("Error picking image", error);
      Alert.alert(t("create.image_error"), error.message);
    }
  };

  const handleSubmit = async () => {
    if (!title || !caption || !imageBase64 || !rating) {
      Alert.alert(t("create.fill_fields")); 
      return;
    }

    try {
      setLoading(true);

      const uriParts = image.split(".");
      const fileType = uriParts[uriParts.length - 1];
      const imageType = fileType ? `image/${fileType.toLowerCase()}` : "image/jpeg";
      const imageDataUrl = `data:${imageType};base64,${imageBase64}`;

      const response = await fetch(`${API_URL}/barbers`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          caption,
          image: imageDataUrl,
          rating: rating.toString(),
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || t("create.generic_error"));

      Alert.alert(t("create.success_title"), t("create.success_message")); 
      setTitle("");
      setCaption("");
      setRating(3);
      setImage(null);
      setImageBase64(null);
      router.push("/");
    } catch (error) {
      console.error("Error creating barber", error);
      Alert.alert(t("create.error_title"), error.message || t("create.generic_error"));
    } finally {
      setLoading(false);
    }
  };

  const renderRatingPicker = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity
          key={i}
          onPress={() => setRating(i)}
          style={styles.starButton}
        >
          <Ionicons
            name={i <= rating ? "star" : "star-outline"}
            size={32}
            color={i <= rating ? "#f4b400" : COLORS.textSecondary}
          />
        </TouchableOpacity>
      );
    }
    return <View style={styles.ratingContainer}>{stars}</View>;
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { backgroundColor: theme.background },
        ]}
        style={{ backgroundColor: theme.background }}
      >
        <View
          style={[
            styles.card,
            {
              backgroundColor: theme.card,
              borderWidth: theme.name === "dark" ? 1 : 0,
              borderColor: theme.name === "dark" ? "#FF3CAC" : "transparent",
              shadowColor: theme.name === "dark" ? "#000" : "transparent",
              shadowOpacity: theme.name === "dark" ? 0.15 : 0,
              elevation: theme.name === "dark" ? 5 : 0,
            },
          ]}
        >
          <View style={styles.header}>
            <Text style={[styles.title, { color: theme.text }]}>{t("create.title")}</Text>
            <Text style={[styles.subtitle, { color: theme.text }]}>{t("create.subtitle")}</Text>
          </View>

          <View style={styles.form}>
            <View style={styles.formGroup}>
              <Text style={[styles.label, { color: theme.text }]}>{t("create.label_name")}</Text>
              <View style={[styles.inputContainer, { backgroundColor: theme.input }]}>
                <Ionicons
                  name="storefront-outline"
                  size={20}
                  color={COLORS.placeholderText}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={[styles.input, { color: theme.text }]}
                  placeholder={t("create.placeholder_name")}
                  placeholderTextColor={COLORS.placeholderText}
                  value={title}
                  onChangeText={setTitle}
                />
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={[styles.label, { color: theme.text }]}>{t("create.label_rating")}</Text>
              {renderRatingPicker()}
            </View>

            <View style={styles.formGroup}>
              <Text style={[styles.label, { color: theme.text }]}>{t("create.label_image")}</Text>
              <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
                {image ? (
                  <Image source={{ uri: image }} style={styles.previewImage} />
                ) : (
                  <View style={styles.placeholderContainer}>
                    <Ionicons name="image-outline" size={40} color={COLORS.textSecondary} />
                    <Text style={[styles.placeholderText, { color: theme.text }]}>
                      {t("create.image_placeholder")}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>

            <View style={styles.formGroup}>
              <Text style={[styles.label, { color: theme.text }]}>{t("create.label_caption")}</Text>
              <View style={[styles.inputContainer, { backgroundColor: theme.input }]}>
                <TextInput
                  style={[styles.input, { color: theme.text }]}
                  placeholder={t("create.placeholder_caption")}
                  placeholderTextColor={COLORS.placeholderText}
                  value={caption}
                  onChangeText={setCaption}
                  multiline
                />
              </View>
            </View>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: theme.primary }]}
              onPress={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color={COLORS.white} size="large" />
              ) : (
                <>
                  <Ionicons
                    name="cloud-upload-outline"
                    size={20}
                    color={COLORS.white}
                    style={styles.buttonIcon}
                  />
                  <Text style={styles.buttonText}>{t("create.submit_button")}</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
