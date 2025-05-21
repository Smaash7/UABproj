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
import BarberItem from "../../components/BarberItem";
import ThemeModal from "../../components/ThemeModal";
import LanguageModal from "../../components/LanguageModal";
import EditNameModal from "../../components/EditNameModal";
import EmptyListComponent from "../../components/EmptyListComponent";




const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default function Profile() {
  const [barbers, setBarbers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [deleteBookId, setDeleteBookId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const [editNameModalVisible, setEditNameModalVisible] = useState(false);
  const [newName, setNewName] = useState("");
  const [isUpdatingName, setIsUpdatingName] = useState(false);

  const { token } = useAuthStore();
  const { name: themeName, toggleTheme, ...theme } = useTheme();
  const { t, i18n } = useTranslation();
  const router = useRouter();

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${API_URL}/barbers/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Erro ao buscar barbeiros");
      setBarbers(data);
    } catch (err) {
      Alert.alert("Erro", t("errors.fetchBarbers"));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await sleep(500);
    await fetchData();
    setRefreshing(false);
  };

  const handleDeleteBarber = async (barberId) => {
    try {
      setDeleteBookId(barberId);
      const res = await fetch(`${API_URL}/barbers/${barberId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Erro ao apagar barbeiro");
      setBarbers((prev) => prev.filter((b) => b._id !== barberId));
      Alert.alert(t("success.deleteBarberTitle"), t("success.deleteBarberMessage"));
    } catch (err) {
      Alert.alert(t("errors.error"), err.message);
    } finally {
      setDeleteBookId(null);
    }
  };

  const confirmDelete = (id) => {
    Alert.alert(t("confirmDelete.title"), t("confirmDelete.message"), [
      { text: t("cancel"), style: "cancel" },
      { text: t("delete"), style: "destructive", onPress: () => handleDeleteBarber(id) },
    ]);
  };

  const handleUpdateName = async () => {
    if (!newName.trim()) {
      Toast.show({ type: "error", text1: t("errors.invalidName") });
      return;
    }
    try {
      setIsUpdatingName(true);
      const res = await fetch(`${API_URL}/auth/name`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ newUsername: newName }),
      });
      const text = await res.text();
      if (!res.ok) {
        if (res.status === 400 && text.includes("username already exists")) {
          Toast.show({ type: "error", text1: t("errors.usernameExists") });
          return;
        }
        throw new Error(text);
      }
      const { user, updateUser } = useAuthStore.getState();
      updateUser({ ...user, username: newName });
      setEditNameModalVisible(false);
      setNewName("");
      Toast.show({ type: "success", text1: t("success.nameUpdated") });
    } catch (err) {
      Toast.show({ type: "error", text1: err.message || t("errors.failedUpdateName") });
    } finally {
      setIsUpdatingName(false);
    }
  };

  if (isLoading && !refreshing) return <Loader />;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ProfileHeader onEditPress={() => setEditNameModalVisible(true)} />
      <LogoutButton />

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


      <ThemeModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSelectTheme={toggleTheme}
      />

      <LanguageModal
        visible={languageModalVisible}
        onClose={() => setLanguageModalVisible(false)}
        currentLang={i18n.language}
        onSelectLanguage={(lang) => i18n.changeLanguage(lang)}
      />

      <EditNameModal
        visible={editNameModalVisible}
        onClose={() => setEditNameModalVisible(false)}
        value={newName}
        onChange={setNewName}
        onSave={handleUpdateName}
        loading={isUpdatingName}
      />

      <FlatList
        data={barbers}
        renderItem={({ item }) => (
          <BarberItem item={item} onDelete={confirmDelete} loadingId={deleteBookId} />
        )}
        keyExtractor={(item) => item._id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[COLORS.primary]}
            tintColor={COLORS.primary}
          />
        }
        contentContainerStyle={styles.barbersList}
        ListEmptyComponent={<EmptyListComponent onPress={() => router.push("/create")} />}
      />
    </View>
  );
}