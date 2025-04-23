import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../../constants/colors";
import { useTheme } from "../../context/ThemeContext";

const { width } = Dimensions.get("window");

export default function About() {
  const theme = useTheme();

  const isDark = theme.name === "dark";

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.background }]}>      
      <View style={[styles.headerTextContainer, { backgroundColor: isDark ? "#2c003e" : COLORS.primary }]}>        
        <Text style={[styles.headerTitle, { color: isDark ? "#FF69B4" : "white" }]}>💈 VELLA 💈</Text>
        <Text style={[styles.headerSubtitle, { color: isDark ? "#FFB6C1" : "white" }]}>Where Style Meets Confidence ✨</Text>
      </View>

      <View style={styles.illustrationWrapper}>
        <Image
          source={require("../../assets/images/urban-barber.png")}
          style={styles.illustration}
          resizeMode="cover"
        />
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.primary }]}>🎯 Our Tribe</Text>
        <Text style={[styles.text, { color: theme.text }]}>👑 Trendsetters & fashionistas owning every step</Text>
        <Text style={[styles.text, { color: theme.text }]}>🧑‍🎓 Newcomers chasing bold, fresh cuts</Text>
        <Text style={[styles.text, { color: theme.text }]}>😤 Dreamers fed up with basic fades</Text>
        <Text style={[styles.text, { color: theme.text }]}>💇‍♂️ Pros carving their legacy ✂️</Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.primary }]}>🌟 Our Mission</Text>
        <Text style={[styles.text, { color: theme.text }]}>To empower your identity through confidence, clean lines, and creative cuts. Every head, a canvas. Every style, a statement. 🎨🖌️</Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.primary }]}>🌍 Where We Style</Text>
        <Text style={[styles.text, { color: theme.text }]}>From 🇵🇹 Lisbon's alleys to 🇫🇷 Paris runways, to 🇺🇸 NYC block corners — VELLA moves where culture breathes. 💼🛩️</Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.primary }]}>🔥 Why VELLA?</Text>
        <Text style={[styles.text, { color: theme.text }]}>Because style isn’t just how you look — it's how you feel, how you walk into a room, how you own it. 💥 Own your moment with VELLA. 🚀💯</Text>
      </View>
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
    marginTop: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 8,
  },
});
