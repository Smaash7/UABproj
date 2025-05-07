import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useAuthStore } from '../store/authStore';
import { Image } from "expo-image";
import styles from "../assets/styles/profile.styles";
import { formatMemberSince } from '../lib/utils';
import { useTranslation } from 'react-i18next'; // <-- importa o hook de tradução

export default function ProfileHeader({ onEditPress }) {
    const { user } = useAuthStore();
    const { t } = useTranslation(); // <-- usa o hook

    if (!user) return null;

    return (
        <View style={styles.profileHeader}>
            <Image source={{ uri: user.profileImage }} style={styles.profileImage} />
            <View style={styles.profileInfo}>
                <Text style={styles.username}>{user.username}</Text>
                <Text style={styles.email}>{user.email}</Text>
                <Text style={styles.memberSince}>
                    {t("headerprofile.joined")} {formatMemberSince(user.createdAt)}
                </Text>
            </View>

            <TouchableOpacity
                onPress={onEditPress}
                style={{
                    backgroundColor: 'transparent',  
                    padding: 5, 
                }}
            >
                <Text style={{ fontSize: 20, color: 'gray' }}>✏️</Text>
            </TouchableOpacity>
        </View>
    );
}
