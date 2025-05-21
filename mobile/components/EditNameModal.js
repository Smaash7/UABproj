// components/EditNameModal.js
import { Modal, TouchableOpacity, Text, TextInput, ActivityIndicator, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import { useTranslation } from "react-i18next";
import COLORS from "../constants/colors";

export default function EditNameModal({ visible, onClose, value, onChange, onSave, loading }) {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Modal animationType="fade" transparent visible={visible} onRequestClose={onClose}>
      <TouchableOpacity
        style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center" }}
        activeOpacity={1}
        onPressOut={onClose}
      >
        <View style={{ backgroundColor: theme.background, padding: 20, borderRadius: 12, width: "80%" }}>
          <TouchableOpacity onPress={onClose} style={{ position: "absolute", left: 10, top: 10 }}>
            <Ionicons name="arrow-back" size={24} color={theme.text} />
          </TouchableOpacity>

          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 30, color: theme.text, textAlign: "center" }}>
            {t("editYourName")}
          </Text>

          <TextInput
            placeholder={t("enterNewName")}
            placeholderTextColor={COLORS.textSecondary}
            value={value}
            onChangeText={onChange}
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
            onPress={onSave}
            style={{
              backgroundColor: theme.primary,
              padding: 12,
              borderRadius: 8,
              alignItems: "center",
            }}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={{ color: "#fff", fontWeight: "bold" }}>{t("save")}</Text>
            )}
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}
