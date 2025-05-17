// screens/About.jsx
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
import SPACING from "../../constants/spacing";
import { useTranslation } from "react-i18next";
import styles from "../../assets/styles/about.styles";

const { width } = Dimensions.get("window");

export default function About() {
  const theme = useTheme();
  const isDark = theme.name === "dark";

  const scrollRef = useRef(null);
  const tribeRef = useRef(null);
  const missionRef = useRef(null);
  const contactRef = useRef(null);

  const { t } = useTranslation();

  const scrollToSection = (ref) => {
    const scrollNode = findNodeHandle(scrollRef.current);
    const targetNode = findNodeHandle(ref.current);
    if (scrollNode && targetNode) {
      UIManager.measureLayout(
        targetNode,
        scrollNode,
        (err) => console.error(err),
        (x, y) => {
          scrollRef.current.scrollTo({ y: y - SPACING.aboutScrollOffset, animated: true });
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
          {
            backgroundColor: isDark
              ? COLORS.headerDarkBg
              : COLORS.headerLightBg,
          },
        ]}
      >
        <Text
          style={[
            styles.headerTitle,
            { color: isDark ? COLORS.accentLight : COLORS.navText },
          ]}
        >
          💈 VELLA 💈
        </Text>
        <Text
          style={[
            styles.headerSubtitle,
            { color: isDark ? COLORS.accentLight : COLORS.navText },
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

      <TouchableOpacity
        onPress={scrollToTop}
        style={styles.backToTopButton}
      >
        <Text style={styles.backToTopText}>{t("about.back_to_top")}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
