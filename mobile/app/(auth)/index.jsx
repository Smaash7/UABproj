import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import styles from "../../assets/styles/login.styles"

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {}


  return (
    <View style={styles.container}>
       {/*IMAGE*/}
       <View style={styles.topIllustration}>
        <Image
        source={require("../../assets/images/i2.png")}
        style={styles.illustrationImage}
        resizeMode="contain"
        />
       </View>
      
    </View>
  );
}
