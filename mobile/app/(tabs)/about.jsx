import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  UIManager,
  findNodeHandle,
} from "react-native";
import { useTheme } from "../../context/ThemeContext";
import COLORS from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next"; 

const { width } = Dimensions.get("window");

export default function About() {
  const theme = useTheme();
  const isDark = theme.name === "dark";

  const scrollRef = useRef(null);
  const tribeRef = useRef(null);
  const missionRef = useRef(null);
  const contactRef = useRef(null);

  const { t } = useTranslation(); // Hook de tradução

  const scrollToSection = (ref) => {
    const scrollNode = findNodeHandle(scrollRef.current);
    const targetNode = findNodeHandle(ref.current);
    if (scrollNode && targetNode) {
      UIManager.measureLayout(
        targetNode,
        scrollNode,
        (err) => console.error(err),
        (x, y) => {
          scrollRef.current.scrollTo({ y: y - 50, animated: true });
        }
      );
    }
  };

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };

  return (
    <ScrollView
      ref={scrollRef}
      contentContainerStyle={[
        styles.container,
        { backgroundColor: theme.background },
      ]}
    >
      <View
        style={[
          styles.headerTextContainer,
          { backgroundColor: isDark ? "#2c003e" : COLORS.primary },
        ]}
      >
        <Text
          style={[styles.headerTitle, { color: isDark ? "#FF69B4" : "white" }]}
        >
          💈 VELLA 💈
        </Text>
        <Text
          style={[
            styles.headerSubtitle,
            { color: isDark ? "#FFB6C1" : "white" },
          ]}
        >
          {t("about.slogan")}
        </Text>
        <View style={styles.navRow}>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => scrollToSection(tribeRef)}
          >
            <Text style={styles.navText}>{t("about.nav_group")}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => scrollToSection(missionRef)}
          >
            <Text style={styles.navText}>{t("about.nav_mission")}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => scrollToSection(contactRef)}
          >
            <Text style={styles.navText}>{t("about.nav_contact")}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.illustrationWrapper}>
        <Image
          source={require("../../assets/images/urban-barber.png")}
          style={styles.illustration}
          resizeMode="cover"
        />
      </View>

      <View ref={tribeRef} style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.primary }]}>
          {t("about.section_tribe")}
        </Text>
        <Text style={[styles.text, { color: theme.text }]}>
          {t("about.tribe_text_1")}
        </Text>
        <Text style={[styles.text, { color: theme.text }]}>
          {t("about.tribe_text_2")}
        </Text>
      </View>

      <View ref={missionRef} style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.primary }]}>
          {t("about.section_mission")}
        </Text>
        <Text style={[styles.text, { color: theme.text }]}>
          {t("about.mission_text_1")}
        </Text>
        <Text style={[styles.text, { color: theme.text }]}>
          {t("about.mission_text_2")}
        </Text>
      </View>

      <View ref={contactRef} style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.primary }]}>
          {t("about.section_contact")}
        </Text>
        <Text style={[styles.text, { color: theme.text }]}>
          {t("about.contact_email")}
        </Text>
        <Text style={[styles.text, { color: theme.text }]}>
          {t("about.contact_phone")}
        </Text>
        <Text style={[styles.text, { color: theme.text }]}>
          {t("about.contact_instagram")}
        </Text>
        <Text style={[styles.text, { color: theme.text }]}>
          {t("about.contact_work")}
        </Text>
      </View>

      <TouchableOpacity onPress={scrollToTop} style={styles.backToTopButton}>
        <Text style={styles.backToTopText}>{t("about.back_to_top")}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 40,
  },
  headerTextContainer: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTitle: {
    fontSize: 38,
    fontWeight: "800",
    letterSpacing: 2,
    textAlign: "center",
  },
  headerSubtitle: {
    fontSize: 18,
    fontWeight: "400",
    marginTop: 8,
    textAlign: "center",
    opacity: 0.95,
  },
  navRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    flexWrap: "wrap",
  },
  navButton: {
    backgroundColor: "#FF69B4",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 16,
    marginVertical: 4,
  },
  navText: {
    color: "white",
    fontWeight: "700",
    fontSize: 14,
  },
  illustrationWrapper: {
    alignItems: "center",
    marginTop: 24,
  },
  illustration: {
    width: width * 0.9,
    height: 220,
    borderRadius: 20,
  },
  section: {
    paddingHorizontal: 24,
    marginTop: 40,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
  },
  backToTopButton: {
    alignSelf: "center",
    marginTop: 30,
    marginBottom: 40,
    backgroundColor: "#FF69B4",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  backToTopText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
});
