// components/ThemeModal.js
import { Modal, TouchableOpacity, Text, View } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { useTranslation } from "react-i18next";

export default function ThemeModal({ visible, onClose, onSelectTheme }) {
  const { t } = useTranslation();
  const { name: themeName, ...theme } = useTheme();

  return (
    <Modal animationType="fade" transparent visible={visible} onRequestClose={onClose}>
      <TouchableOpacity
        style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center" }}
        activeOpacity={1}
        onPressOut={onClose}
      >
        <View style={{ backgroundColor: theme.background, padding: 20, borderRadius: 12, width: "70%" }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 15, color: theme.text, textAlign: "center" }}>
            {t("selectTheme")}
          </Text>
          {["light", "dark"].map((name) => (
            <TouchableOpacity
              key={name}
              onPress={() => {
                onSelectTheme(name);
                onClose();
              }}
              style={{
                paddingVertical: 10,
                backgroundColor: themeName === name ? theme.primary : "transparent",
                borderRadius: 6,
                marginBottom: 10,
              }}
            >
              <Text style={{ textAlign: "center", fontWeight: "bold", color: themeName === name ? "#fff" : theme.text }}>
                {t(`theme.${name}`)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </TouchableOpacity>
    </Modal>
  );
}
