// components/BarberItem.js
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import styles from "../assets/styles/profile.styles";
import COLORS from "../constants/colors";

const renderRatingStars = (rating) => {
  return Array.from({ length: 5 }, (_, i) => (
    <Ionicons
      key={i}
      name={i < rating ? "star" : "star-outline"}
      size={14}
      color={i < rating ? "#f4b400" : COLORS.textSecondary}
      style={{ marginRight: 2 }}
    />
  ));
};

export default function BarberItem({ item, onDelete, loadingId }) {
  return (
    <View style={styles.barberItem}>
      <Image source={item.image} style={styles.barberImage} />
      <View style={styles.barberInfo}>
        <Text style={styles.barberTitle}>{item.title}</Text>
        <View style={styles.ratingContainer}>{renderRatingStars(item.rating)}</View>
        <Text style={styles.barberCaption} numberOfLines={2}>{item.caption}</Text>
        <Text style={styles.barberDate}>
          {new Date(item.createdAt).toLocaleDateString()}
        </Text>
        <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(item._id)}>
          {loadingId === item._id ? (
            <ActivityIndicator size="small" color={COLORS.primary} />
          ) : (
            <Ionicons name="trash-outline" size={20} color={COLORS.primary} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
