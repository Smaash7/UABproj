import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, RefreshControl } from "react-native";
import React, { useEffect } from "react";
import { useAuthStore } from "../../store/authStore";
import { useRouter } from "expo-router";
import { useState } from "react";
import { API_URL } from "../../constants/api";
import { Image } from "expo-image";
import COLORS from "../../constants/colors";

import styles from "../../assets/styles/home.styles";
import { Ionicons } from "@expo/vector-icons";
import { formatPublisDate, formatPublishDate } from "../../lib/utils";
import Loader from "../../components/Loader";

export default function Home() {
  const { token } = useAuthStore();
  const [barbers, setBarbers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchBarbers = async (pageNum = 1, refreshing = false) => {
    try {
      if (refreshing) setRefreshing(true);
      else if (pageNum === 1) setLoading(true);

      const response = await fetch(
        `${API_URL}/barbers?page=${pageNum}&limit=2`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to fetch barbers");

      //to do fix it later
      //setBarbers((prevBarbers) => [...prevBarbers, ...data.barbers]);
      const uniqueBarbers =
        refreshing || pageNum === 1
          ? data.barbers
          : Array.from(
              new Set([...barbers, ...data.barbers].map((barber) => barber._id))
            ).map((id) =>
              [...barbers, ...data.barbers].find((barber) => barber._id === id)
            );

      setBarbers(uniqueBarbers);

      setHasMore(pageNum < data.totalPages);
      setPage(pageNum);
    } catch (error) {
      console.log("Error fetching barbers:", error);
    } finally {
      if (refreshing) {

        setRefreshing(false);
      }
      else setLoading(false);
    }
  };

  useEffect(() => {
    fetchBarbers();
  }, []);

  const handleLoadMore = async () => {
    if(hasMore && !loading && !refreshing){
      await fetchBarbers(page + 1);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.barberCard}>
      <View style={styles.barberHeader}>
        <View style={styles.userInfo}>
          <Image
            source={{ uri: item.user.profileImage }}
            style={styles.avatar}
          />
          <Text style={styles.username}>{item.user.username}</Text>
        </View>
      </View>

      <View style={styles.barberImageContainer}>
        <Image
          source={{ uri: item.image }}
          style={styles.barberImage}
          contentFit="fill"
        />
      </View>
      <View style={styles.barberDetails}>
        <Text style={styles.barberTitle}>{item.title}</Text>
        <View style={styles.ratingContainer}>
          {renderRatingStars(item.rating)}
        </View>
        <Text style={styles.caption}>{item.caption}</Text>
        <Text style={styles.date}>
          Shared on {formatPublishDate(item.createdAt)}
        </Text>
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
          size={20}
          color={i <= rating ? "#f4b400" : COLORS.textSecondary}
          style={{ marginRight: 2 }}
        />
      );
    }
    return stars;
  };

  if(loading) return <Loader />;

  return (
    <View style={styles.container}>
      <FlatList
        data={barbers}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}

        refreshControl={
          <RefreshControl 
            refreshing={refreshing}
            onRefresh={() => fetchBarbers(1, true)}
            colors={[COLORS.primary]}
            tintColor={COLORS.primary}
          />
        }

        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.headerTitle}>✨ Bella</Text>
            <Text style={styles.headerSubtitle}>
            Discover and share top-rated barbers trusted by the community 💈
            </Text>
            <View style={{ height: 10 }} />
            <View style={styles.divider} />
          </View>
        }
        
        ListFooterComponent={
          hasMore && barbers.length > 0 ? (
            <ActivityIndicator style={styles.footerLoader} size="small" color={COLORS.primary} /> 
          ) : null
        }

        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="cut-outline" size={60} color={COLORS.textSecondary} />
            <Text style={styles.emptyText}>No Recommendations</Text>
            <Text style={styles.emptySubtext}>Be the first to share a book</Text>
          </View>
        }
      />
    </View>
  );
}
