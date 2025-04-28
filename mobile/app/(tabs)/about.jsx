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

const { width } = Dimensions.get("window");

export default function About() {
  const theme = useTheme();
  const isDark = theme.name === "dark";

  const scrollRef = useRef(null);
  const tribeRef = useRef(null);
  const missionRef = useRef(null);
  const contactRef = useRef(null);

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
          Where Style Meets Confidence ✨
        </Text>
        <View style={styles.navRow}>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => scrollToSection(tribeRef)}
          >
            <Text style={styles.navText}>Our Group</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => scrollToSection(missionRef)}
          >
            <Text style={styles.navText}>Mission</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => scrollToSection(contactRef)}
          >
            <Text style={styles.navText}>Contact</Text>
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
          🎯 Our Group
        </Text>
        <Text style={[styles.text, { color: theme.text }]}>
          The idea of VELLA was born in 2024, inspired by a shared frustration —
          walking into barbershops and never quite feeling seen, heard, or
          styled right. We wanted more than just a cut; we wanted connection,
          identity, and impact. That’s when we decided to build something bold —
          a space where culture, creativity, and confidence meet in every style.
        </Text>
        <Text style={[styles.text, { color: theme.text }]}>
          Our community is made of rebels, creatives, and newcomers — people
          tired of average, seeking to leave a mark with every step, every fade,
          every look. This is more than grooming. It's a movement. ✂️
        </Text>
      </View>

      <View ref={missionRef} style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.primary }]}>
          🌟 Our Mission
        </Text>
        <Text style={[styles.text, { color: theme.text }]}>
          VELLA exists to empower identity through fresh cuts and fearless
          self-expression. We believe in clean lines, vibrant energy, and
          stories told through style. Our mission is to make every individual
          feel bold, authentic, and confident — whether on the street or on the
          stage.
        </Text>
        <Text style={[styles.text, { color: theme.text }]}>
          Every session is a collaboration. Every mirror a reminder: you are art
          in motion. 🎨🪞
        </Text>
      </View>

      <View ref={contactRef} style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.primary }]}>
          📞 Contact Us
        </Text>
        <Text style={[styles.text, { color: theme.text }]}>
          📧 Email: hello@vella.com
        </Text>
        <Text style={[styles.text, { color: theme.text }]}>
          📞 Phone: +351 123 456 789
        </Text>
        <Text style={[styles.text, { color: theme.text }]}>
          📸 Instagram: @vella.style
        </Text>
        <Text style={[styles.text, { color: theme.text }]}>
          💼 Work with us: careers@vella.com
        </Text>
      </View>

      <TouchableOpacity onPress={scrollToTop} style={styles.backToTopButton}>
       {/*  <Ionicons
          name="arrow-up-circle-outline"
          size={20}
          color="white"
          style={{ marginRight: 8 }}
        /> */}
        <Text style={styles.backToTopText}>Back to Top</Text>
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
