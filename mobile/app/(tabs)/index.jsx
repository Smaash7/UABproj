import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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

import * as Location from 'expo-location';


export default function Home() {
  const { t } = useTranslation(); 
  const { token } = useAuthStore();
  const [barbers, setBarbers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [cidadeAtual, setCidadeAtual] = useState(null);
  const [barbeariaRecomendada, setBarbeariaRecomendada] = useState(null);

  const screenWidth = Dimensions.get("window").width;
  const numColumns = screenWidth >= 768 ? 3 : 2; // 3 colunas para tablets, 2 para smartphones



  const theme = useTheme();

  const fetchBarbers = async (pageNum = 1, refreshing = false) => {
    try {
      if (refreshing) setRefreshing(true);
      else if (pageNum === 1) setLoading(true);

      console.log("🔐 Token atual:", token);
      const response = await fetch(
        `${API_URL}/barbers?page=${pageNum}&limit=2`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await response.json();
      console.log("📦 Dados recebidos da API /barbers:", data);
      if (!response.ok) {
        console.error("❌ Erro ao buscar barbers:", response.status, data);
        throw new Error(data.message || t('home.errorFetching'));
      }

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
    fetchBarbers(); // esta linha estava em falta!
  
    const fetchRecommendation = async () => {
      try {
        console.log("🚀 A pedir permissão de localização...");
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.warn("⛔ Permissão de localização negada");
          return;
        }
  
        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;
        console.log("📍 Localização obtida:", latitude, longitude);
  
        const reverseUrl = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
        console.log("🔄 URL de geolocalização:", reverseUrl);
  
        const res = await fetch(reverseUrl, {
          headers: {
            'User-Agent': 'barber-review-app'
          }
        });
  
        const rawGeo = await res.text();
        console.log("🗺️ Resposta bruta da geolocalização:", rawGeo);
  
        const data = JSON.parse(rawGeo);
        const city = data.address.city || data.address.town || data.address.village;
        console.log("🏙️ Cidade detetada:", city);
        setCidadeAtual(city);
  
        const encodedCity = encodeURIComponent(city);
        const apiUrl = `${API_URL}/barbers/top/${encodedCity}`;
        console.log("🌐 URL da API backend:", apiUrl);
  
        const backendRes = await fetch(apiUrl);
        const backendRaw = await backendRes.text();
        console.log("📄 Conteúdo da API backend:", backendRaw);
  
        const json = JSON.parse(backendRaw);
  
        if (!json.message) {
          setBarbeariaRecomendada(json);
        } else {
          setBarbeariaRecomendada(null);
        }
  
      } catch (err) {
        console.error("❌ Erro geral:", err.message || err);
        setBarbeariaRecomendada(null);
      }
    };
  
    fetchRecommendation();
  }, []);  
  

  const handleLoadMore = async () => {
    if (hasMore && !loading && !refreshing) {
      await fetchBarbers(page + 1);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={{
        flex: 1,
        margin: SPACING.sm,
        backgroundColor: COLORS.cardBackground,
        borderRadius: 12,
        padding: SPACING.sm,
      }}
      onPress={() => router.push(`/barber/${item._id}`)}
    >
      <View style={styles.barberHeader}>
        <View style={styles.userInfo}>
          <Image
            source={{ uri: item.user.profileImage }}
            style={styles.avatar}
          />
          <Text style={styles.username}>{item.user.username}</Text>
        </View>
      </View>
  
      <Image
        source={{ uri: item.image }}
        style={{
          width: "100%",
          height: screenWidth >= 768 ? 200 : 150,
          borderRadius: 12,
          resizeMode: "cover",
          marginTop: 8,
        }}
      />
  
      <View style={{ marginTop: 12, flexShrink: 1 }}>
        <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 4 }}>
          {item.title}
        </Text>
        <View style={styles.ratingContainer}>
          {renderRatingStars(item.rating)}
        </View>
        <Text style={[styles.caption, { marginTop: 6 }]}>{item.caption}</Text>
        <Text style={[styles.date, { marginTop: 6 }]}>
          {t('home.sharedOn')} {formatPublishDate(item.createdAt)}
        </Text>
      </View>
    </TouchableOpacity>
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
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <FlatList
        data={barbers}
        renderItem={renderItem}
        keyExtractor={(item) => item._id.toString()}
        numColumns={numColumns}
        columnWrapperStyle={numColumns > 1 ? { justifyContent: "space-between" } : null}
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
          <View>
            {cidadeAtual && (
              <View style={styles.recommendationContainer}>
                <Text style={styles.headerTitle}>📍 {t('home.yourCity')} {cidadeAtual}</Text>
  
                {barbeariaRecomendada ? (
                  <>
                    <Text style={styles.headerSubtitle}>🔝 {t('home.recommendedBarber')}</Text>
  
                    <View style={styles.barberCard}>
                      <Image
                        source={{ uri: barbeariaRecomendada.image }}
                        style={styles.barberImage}
                        contentFit="cover"
                      />
                      <View style={styles.barberDetails}>
                        <Text style={styles.barberTitle}>{barbeariaRecomendada.title}</Text>
                        <Text style={styles.caption}>{barbeariaRecomendada.caption}</Text>
                        <View style={styles.ratingContainer}>
                          {renderRatingStars(barbeariaRecomendada.rating)}
                        </View>
                      </View>
                    </View>
                  </>
                ) : (
                  <Text style={[styles.caption, { marginTop: 8 }]}>
                    🤷 {t('home.noRecommendationInCity')}
                  </Text>
                )}
  
                <View style={styles.divider} />
              </View>
            )}
  
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
    </SafeAreaView>
  );
  
}
