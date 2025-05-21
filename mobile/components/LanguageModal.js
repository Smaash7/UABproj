// components/LanguageModal.js
import { Modal, TouchableOpacity, Text, View } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { useTranslation } from "react-i18next";

export default function LanguageModal({ visible, onClose, currentLang, onSelectLanguage }) {
  const { t } = useTranslation();
  const theme = useTheme();

  const languages = ["en", "pt", "sl", "de", "fr"];

  return (
    <Modal animationType="fade" transparent visible={visible} onRequestClose={onClose}>
      <TouchableOpacity
        style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center" }}
        activeOpacity={1}
        onPressOut={onClose}
      >
        <View style={{ backgroundColor: theme.background, padding: 20, borderRadius: 12, width: "70%" }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 15, color: theme.text, textAlign: "center" }}>
            {t("selectLanguage")}
          </Text>
          {languages.map((code) => (
            <TouchableOpacity
              key={code}
              onPress={() => {
                onSelectLanguage(code);
                onClose();
              }}
              style={{
                paddingVertical: 10,
                backgroundColor: currentLang === code ? theme.primary : "transparent",
                borderRadius: 6,
                marginBottom: 10,
              }}
            >
              <Text style={{ textAlign: "center", fontWeight: "bold", color: currentLang === code ? "#fff" : theme.text }}>
                {t(`language.${code}`)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </TouchableOpacity>
    </Modal>
  );
}
