import { Tabs } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import AnimatedTabIcon from '../../components/AnimatedTabIcon'; // agora em .js

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.text,
        tabBarStyle: {
          backgroundColor: theme.secondary,
          borderTopWidth: 1,
          borderTopColor: theme.primary,
          paddingTop: 5,
          paddingBottom: insets.bottom,
          height: 60 + insets.bottom,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t('tabs.home'),
          tabBarIcon: ({ color, size, focused }) => (
            <AnimatedTabIcon
              name="home-outline"
              color={color}
              size={size}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: t('tabs.create'),
          tabBarIcon: ({ color, size, focused }) => (
            <AnimatedTabIcon
              name="add-circle-outline"
              color={color}
              size={size}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: t('tabs.profile'),
          tabBarIcon: ({ color, size, focused }) => (
            <AnimatedTabIcon
              name="person-outline"
              color={color}
              size={size}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: t('tabs.about'),
          tabBarIcon: ({ color, size, focused }) => (
            <AnimatedTabIcon
              name="information-circle-outline"
              color={color}
              size={size}
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
}
