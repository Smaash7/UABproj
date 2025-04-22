import { useEffect } from "react";
import { View, Text, Image, ActivityIndicator, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

export default function Welcome() {
  const router = useRouter();

  useEffect(() => {
    console.log("Redirecting in 5s...");
    console.log("Redirecting to signup page...");
    const timer = setTimeout(() => {
      router.replace("/(auth)/signup");
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient
      colors={["#ffe0ec", "#ffc3d9", "#ffa6c9"]}
      style={styles.container}
    >
      <Image
        source={require("../assets/images/logo.png")} // muda para o teu ficheiro
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Welcome to our app!</Text>
      <Text style={styles.subtitle}> Please wait while we load the app...</Text>
      <ActivityIndicator size="large" color="#ff5c8d" style={styles.loader} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#b3005e",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#8b0051",
    marginBottom: 30,
  },
  loader: {
    marginTop: 20,
  },
});
