import React from 'react';
import Animated, {
  useAnimatedStyle,
  withTiming,
  withSpring,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

export default function AnimatedTabIcon({ name, color, size, focused }) {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withSpring(focused ? 1.25 : 1, {
            damping: 6,
            stiffness: 120,
          }),
        },
        {
          translateY: withTiming(focused ? -4 : 0, { duration: 250 }),
        },
      ],
      opacity: withTiming(focused ? 1 : 0.5, { duration: 200 }),
    };
  }, [focused]);

  return (
    <Animated.View style={animatedStyle}>
      <Ionicons name={name} size={size} color={color} />
    </Animated.View>
  );
}
