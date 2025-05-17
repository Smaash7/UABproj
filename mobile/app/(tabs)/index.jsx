import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useAuthStore } from "../../store/authStore";
import { useRouter } from "expo-router";
import { API_URL } from "../../constants/api";
import { Image } from "expo-image";
import COLORS from "../../constants/colors";
import styles from "../../assets/styles/home.styles";
import SPACING from "../../constants/spacing";
import { Ionicons } from "@expo/vector-icons";
import { formatPublishDate } from "../../lib/utils";
import Loader from "../../components/Loader";
import { useTheme } from "../../context/ThemeContext";
import { useTranslation } from 'react-i18next'; 

export default function Home() {
  const { t } = useTranslation(); 
  const { token } = useAuthStore();
  const [barbers, setBarbers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const theme = useTheme();

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
        throw new Error(data.message || t('home.errorFetching')); 

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
      if (refreshing) setRefreshing(false);
      else setLoading(false);
    }
  };

  useEffect(() => {
    fetchBarbers();
  }, []);

  const handleLoadMore = async () => {
    if (hasMore && !loading && !refreshing) {
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
          {t('home.sharedOn')} {formatPublishDate(item.createdAt)} 
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
          size={SPACING.md + 4}
          color={i < rating ? COLORS.warning : COLORS.textSecondary}
          style={{ marginRight: SPACING.starMarginRight }}
        />
      );
    }
    return stars;
  };

  if (loading) return <Loader />;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
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
            colors={[theme.primary]}
            tintColor={theme.primary}
          />
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        ListHeaderComponent={
          <View style={styles.header}>
            <Ionicons name="cut-outline" size={24} color={COLORS.accent} />
            <Text style={[styles.headerTitle, { color: COLORS.accentDark }, styles.headerIconSpacing]}>
              {t('home.headerTitle')} 
            </Text>
            <Text style={[styles.headerSubtitle, { color: COLORS.accentDark }]}>
              {t('home.headerSubtitle')}
            </Text>
            <View style={styles.spacerSmall} />
            <View style={styles.divider} />
          </View>
        }
        ListFooterComponent={
          hasMore && barbers.length > 0 ? (
            <ActivityIndicator
              style={styles.footerLoader}
              size="small"
              color={theme.primary}
            />
          ) : null
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons
              name="cut-outline"
              size={60}
              color={COLORS.textSecondary}
            />
            <Text style={[styles.emptyText, { color: theme.text }]}>
              {t('home.noRecommendations')} 
            </Text>
            <Text style={[styles.emptySubtext, { color: theme.text }]}>
              {t('home.noRecommendationsSubtext')}
            </Text>
          </View>
        }
      />
    </View>
  );
}
