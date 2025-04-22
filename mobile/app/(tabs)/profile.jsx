import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  RefreshControl,
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


const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default function Profile() {
  const [barbers, setBarbers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [deleteBookId, setDeleteBookId] = useState(null);

  const { token } = useAuthStore();

  const router = useRouter();

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
      Alert.alert("Error", "Failed to load barbers ");
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
      Alert.alert("Success", "Barber deleted successfully");
    } catch (error) {
      Alert.alert("Error", error.message || "Failed to delete barber");
    } finally {
      setDeleteBookId(null);
    }
  };

  const confirmDelete = (barberId) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this barber?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => handleDeleteBarber(barberId),
        },
      ]
    );
  };

  const renderBarberItem = ({ item }) => (
    <View style={styles.barberItem}>
      <Image source={item.image} style={styles.barberImage} />
      <View style={styles.barberInfo}>
        <Text style={styles.barberTitle}>{item.title}</Text>
        <View style={styles.ratingContainer}>
          {renderRatingStars(item.rating)}
        </View>
        <View>
          <Text style={styles.barberCaption} numberOfLines={2}>
            {item.caption}
          </Text>
          <Text style={styles.barberDate}>
            {new Date(item.createdAt).toLocaleDateString()}
          </Text>
        </View>

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
          color={i <= rating ? "#f4b400" : COLORS.textSecondary}
          style={{ marginRight: 2 }}
        />
      );
    }
    return stars;
  };

  const handleRefresh = async() => {
    setRefreshing(true);
    await sleep(500);
    await fetchData();
    setRefreshing(false);
  };

  if(isLoading && !refreshing) return <Loader />;

  return (
    <View style={styles.container}>
      <ProfileHeader />
      <LogoutButton />

      <View style={styles.barbersHeader}>
        <Text style={styles.barbersTitle}>Your Recommendations</Text>
        <Text style={styles.barbersCount}>
          We found {barbers.length} barbers!
        </Text>
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
            <Ionicons
              name="cut-outline"
              size={50}
              color={COLORS.textSecondary}
            />
            <Text style={styles.emptyText}>No barbers found.</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => router.push("/create")}
            >
              <Text style={styles.addButtonText}>Add your first Barber</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
}
