import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import COLORS from "../../constants/colors";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

export default function About() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header com imagem de fundo */}
      <View style={styles.headerImageContainer}>
        <LinearGradient
          colors={["#00000080", "#00000030", "#00000000"]}
          style={styles.gradientOverlay}
        />
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>VELLA</Text>
          <Text style={styles.headerSubtitle}>Where Style Meets Confidence</Text>
        </View>
      </View>

      {/* Target Audience */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎯 Target Audience</Text>
        <Text style={styles.text}>• Trendsetters and fashion lovers</Text>
        <Text style={styles.text}>• Newcomers seeking reliable salons</Text>
        <Text style={styles.text}>• Clients tired of average experiences</Text>
        <Text style={styles.text}>• Hair professionals eager to stand out</Text>
      </View>

      {/* Imagem ilustrativa */}
      <Image
        source={require("../../assets/images/urban-barber.png")}
        style={styles.illustration}
        resizeMode="cover"
      />

      {/* Missão */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🌟 Our Mission</Text>
        <Text style={styles.text}>
          To empower your identity through tailored haircare and refined style.
        </Text>
      </View>

      {/* Localização/Estilo */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📍 Based Where Style Lives</Text>
        <Text style={styles.text}>
          Whether you’re in Lisbon, Paris or New York — VELLA brings premium vibes
          and urban hair fashion to you.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    paddingBottom: 30,
  },
  headerImageContainer: {
    width: "100%",
    height: 280,
    position: "relative",
    justifyContent: "flex-end",
  },
  headerImage: {
    width: "100%",
    height: "100%",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTextContainer: {
    position: "absolute",
    bottom: 20,
    left: 24,
  },
  headerTitle: {
    color: "white",
    fontSize: 36,
    fontWeight: "700",
    letterSpacing: 1,
  },
  headerSubtitle: {
    color: "white",
    fontSize: 16,
    opacity: 0.9,
  },
  section: {
    paddingHorizontal: 24,
    marginTop: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: COLORS.textPrimary,
    marginBottom: 10,
  },
  text: {
    fontSize: 15,
    color: COLORS.textSecondary,
    marginBottom: 6,
  },
  illustration: {
    width: width * 0.9,
    height: 200,
    borderRadius: 20,
    alignSelf: "center",
    marginTop: 20,
  },
});
