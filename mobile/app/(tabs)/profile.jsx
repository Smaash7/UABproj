import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Modal,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { API_URL } from "../../constants/api";
import { useAuthStore } from "../../store/authStore";
import styles from "../../assets/styles/profile.styles";
import ProfileHeader from "../../components/ProfileHeader";
import LogoutButton from "../../components/LogoutButton";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../constants/colors";
import { Image } from "expo-image";
import Loader from "../../components/Loader";
import { useTheme } from "../../context/ThemeContext";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import { TextInput } from "react-native";
import Toast from 'react-native-toast-message';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default function Profile() {
  const [barbers, setBarbers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [deleteBookId, setDeleteBookId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [languageModalVisible, setLanguageModalVisible] = useState(false);

  const { token } = useAuthStore();
  const router = useRouter();
  const { name: themeName, toggleTheme, ...theme } = useTheme();
  const { t } = useTranslation();

  const [editNameModalVisible, setEditNameModalVisible] = useState(false);
  const [newName, setNewName] = useState("");
  const [isUpdatingName, setIsUpdatingName] = useState(false);


  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/barbers/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to fetch user barbers");
      setBarbers(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      Alert.alert("Error", t("errors.fetchBarbers"));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteBarber = async (barberId) => {
    try {
      setDeleteBookId(barberId);
      const response = await fetch(`${API_URL}/barbers/${barberId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to delete barber");
      setBarbers(barbers.filter((barber) => barber._id !== barberId));
      Alert.alert(t("success.deleteBarberTitle"), t("success.deleteBarberMessage"));
    } catch (error) {
      Alert.alert(t("errors.error"), error.message || t("errors.failedDeleteBarber"));
    } finally {
      setDeleteBookId(null);
    }
  };

  const confirmDelete = (barberId) => {
    Alert.alert(t("confirmDelete.title"), t("confirmDelete.message"), [
      { text: t("cancel"), style: "cancel" },
      {
        text: t("delete"),
        style: "destructive",
        onPress: () => handleDeleteBarber(barberId),
      },
    ]);
  };

 

  const handleUpdateName = async () => {
    if (!newName.trim()) {
      Toast.show({
        type: 'error',
        text1: t("errors.invalidName"),
        position: 'top',
        visibilityTime: 3000,
      });
      return;
    }
  
    try {
      setIsUpdatingName(true);
  
      const response = await fetch(`${API_URL}/users/name`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ newUsername: newName }),
      });
  
      if (!response.ok) {
        const text = await response.text(); // lê a resposta como texto para debug
        if (response.status === 400 && text.includes("username already exists")) {
          // Se o nome de usuário já existir
          Toast.show({
            type: 'error',
            text1: t("errors.usernameExists"),
            position: 'top',
            visibilityTime: 3000,
          });
          return;
        }
        throw new Error(`Erro ${response.status}: ${text}`);
      }
  
      const data = await response.json(); // só tenta parsear JSON se ok
  
      // Atualiza o nome na store global
      const { user, updateUser } = useAuthStore.getState();
      if (user) {
        updateUser({ ...user, username: newName });
      }
  
      setEditNameModalVisible(false);
      setNewName("");
  
      // Mensagem de sucesso
      Toast.show({
        type: 'success',
        text1: t("success.nameUpdated"),
        position: 'top',
        visibilityTime: 3000,
      });
  
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: error.message || t("errors.failedUpdateName"),
        position: 'top',
        visibilityTime: 3000,
      });
    } finally {
      setIsUpdatingName(false);
    }
  };

  
  

  const renderBarberItem = ({ item }) => (
    <View style={styles.barberItem}>
      <Image source={item.image} style={styles.barberImage} />
      <View style={styles.barberInfo}>
        <Text style={[styles.barberTitle, { color: "#3b0a36" }]}>{item.title}</Text>
        <View style={styles.ratingContainer}>{renderRatingStars(item.rating)}</View>
        <Text style={[styles.barberCaption, { color: "#3b0a36" }]} numberOfLines={2}>
          {item.caption}
        </Text>
        <Text style={[styles.barberDate, { color: "#3b0a36" }]}>
          {new Date(item.createdAt).toLocaleDateString()}
        </Text>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => confirmDelete(item._id)}
        >
          {deleteBookId === item._id ? (
            <ActivityIndicator size="small" color={COLORS.primary} />
          ) : (
            <Ionicons name="trash-outline" size={20} color={COLORS.primary} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderRatingStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Ionicons
          key={i}
          name={i < rating ? "star" : "star-outline"}
          size={14}
          color={i < rating ? "#f4b400" : COLORS.textSecondary}
          style={{ marginRight: 2 }}
        />
      );
    }
    return stars;
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await sleep(500);
    await fetchData();
    setRefreshing(false);
  };

  if (isLoading && !refreshing) return <Loader />;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ProfileHeader onEditPress={() => setEditNameModalVisible(true)} />
      <LogoutButton />

      <View style={{ paddingHorizontal: 10, marginBottom: 10 }}>
        {/* Theme Toggle Button */}
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={{
            backgroundColor: theme.secondary,
            padding: 10,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: theme.primary,
            marginBottom: 10,
          }}
        >
          <Text
            style={{
              color: theme.text,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {themeName === "dark" ? t("theme.dark") : t("theme.light")}
          </Text>
        </TouchableOpacity>

        {/* Language Toggle Button */}
        <TouchableOpacity
          onPress={() => setLanguageModalVisible(true)}
          style={{
            backgroundColor: theme.secondary,
            padding: 10,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: theme.primary,
            marginBottom: 10,
          }}
        >
          <Text
            style={{
              color: theme.text,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            🌐 {t("selectLanguage")}
          </Text>
        </TouchableOpacity>


        {/* Theme Modal */}
        <Modal
          animationType="fade"
          transparent
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: "rgba(0,0,0,0.5)",
              justifyContent: "center",
              alignItems: "center",
            }}
            activeOpacity={1}
            onPressOut={() => setModalVisible(false)}
          >
            <View
              style={{
                backgroundColor: theme.background,
                padding: 20,
                borderRadius: 12,
                width: "70%",
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  marginBottom: 15,
                  color: theme.text,
                  textAlign: "center",
                }}
              >
                {t("selectTheme")}
              </Text>

              {["light", "dark"].map((name) => (
                <TouchableOpacity
                  key={name}
                  onPress={() => {
                    toggleTheme(name);
                    setModalVisible(false);
                  }}
                  style={{
                    paddingVertical: 10,
                    backgroundColor: themeName === name ? theme.primary : "transparent",
                    borderRadius: 6,
                    marginBottom: 10,
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      fontWeight: "bold",
                      color: themeName === name ? "#fff" : theme.text,
                    }}
                  >
                    {t(`theme.${name}`)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </TouchableOpacity>
        </Modal>

        {/* Language Modal */}
        <Modal
          animationType="fade"
          transparent
          visible={languageModalVisible}
          onRequestClose={() => setLanguageModalVisible(false)}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: "rgba(0,0,0,0.5)",
              justifyContent: "center",
              alignItems: "center",
            }}
            activeOpacity={1}
            onPressOut={() => setLanguageModalVisible(false)}
          >
            <View
              style={{
                backgroundColor: theme.background,
                padding: 20,
                borderRadius: 12,
                width: "70%",
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  marginBottom: 15,
                  color: theme.text,
                  textAlign: "center",
                }}
              >
                {t("selectLanguage")}
              </Text>

              {[{ code: "en" }, { code: "pt" }, { code: "sl" }, { code: "de" }, { code: "fr" }].map(
                ({ code }) => (
                  <TouchableOpacity
                    key={code}
                    onPress={() => {
                      i18n.changeLanguage(code);
                      setLanguageModalVisible(false);
                    }}
                    style={{
                      paddingVertical: 10,
                      backgroundColor: i18n.language === code ? theme.primary : "transparent",
                      borderRadius: 6,
                      marginBottom: 10,
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        fontWeight: "bold",
                        color: i18n.language === code ? "#fff" : theme.text,
                      }}
                    >
                      {t(`language.${code}`)}
                    </Text>
                  </TouchableOpacity>
                )
              )}
            </View>
          </TouchableOpacity>
        </Modal>

        {/* Edit Name Modal */}
        
        <Modal
      animationType="fade"
      transparent
      visible={editNameModalVisible}
      onRequestClose={() => setEditNameModalVisible(false)}
    >
      <TouchableOpacity
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.5)",
          justifyContent: "center",
          alignItems: "center",
        }}
        activeOpacity={1}
        onPressOut={() => setEditNameModalVisible(false)}
      >
        <View
          style={{
            backgroundColor: theme.background,
            padding: 20,
            borderRadius: 12,
            width: "80%",
          }}
        >
          {/* Verifique se o texto está corretamente traduzido */}
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              marginBottom: 15,
              color: theme.text,
              textAlign: "center",
            }}
          >
            {t("editYourName")} {/* Verifique se 'editYourName' está definido em seu arquivo de tradução */}
          </Text>

          <TextInput
          placeholder={t("enterNewName")} // Verifique se 'enterNewName' está definido em seu arquivo de tradução
          placeholderTextColor={COLORS.textSecondary}
          value={newName}
          onChangeText={setNewName}
          style={{
            backgroundColor: theme.secondary,
            color: theme.text,
            padding: 10,
            borderRadius: 8,
            marginBottom: 15,
            borderColor: theme.primary,
            borderWidth: 1,
          }}
        />

          <TouchableOpacity
            onPress={handleUpdateName}
            style={{
              backgroundColor: theme.primary,
              padding: 12,
              borderRadius: 8,
              alignItems: "center",
            }}
            disabled={isUpdatingName}
          >
            {/* Verifique se o texto do botão também está sendo traduzido */}
            {isUpdatingName ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={{ color: "#fff", fontWeight: "bold" }}>
                {t("save")} {/* Verifique se 'save' está definido em seu arquivo de tradução */}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>


      </View>

      <FlatList
        data={barbers}
        renderItem={renderBarberItem}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.barbersList}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[COLORS.primary]}
            tintColor={COLORS.primary}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="cut-outline" size={50} color={COLORS.textSecondary} />
            <Text style={[styles.emptyText, { color: theme.text }]}>
              {t("emptyListMessage")}
            </Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => router.push("/create")}
            >
              <Text style={[styles.addButtonText, { color: theme.text }]}>
                {t("addFirstBarber")}
              </Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
}
