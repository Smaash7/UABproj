// components/EmptyListComponent.js
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../assets/styles/profile.styles";
import { useTheme } from "../context/ThemeContext";
import { useTranslation } from "react-i18next";
import COLORS from "../constants/colors";

export default function EmptyListComponent({ onPress }) {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <View style={styles.emptyContainer}>
      <Ionicons name="cut-outline" size={50} color={COLORS.textSecondary} />
      <Text style={[styles.emptyText, { color: theme.text }]}>
        {t("emptyListMessage")}
      </Text>
      <TouchableOpacity style={styles.addButton} onPress={onPress}>
        <Text style={[styles.addButtonText, { color: theme.text }]}>
          {t("addFirstBarber")}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
