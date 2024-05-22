import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

const SplashScreen = ({ navigation }) => {
  // Initialize values for opacity and scale animations
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0);

  useEffect(() => {
    // Start the fade-in and scale-up animations on component mount
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1, // Fully opaque
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1, // Normal scale
        duration: 2000,
        useNativeDriver: true,
      }),
    ]).start();

    // Set a timeout to navigate from the splash screen to the main screen
    const timer = setTimeout(() => {
      navigation.replace('Welcome'); 
    }, 3000); // 3 seconds delay for the splash screen

    return () => clearTimeout(timer);
  }, [fadeAnim, scaleAnim, navigation]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.logoContainer,
          {
            // Apply both opacity and scale animations
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        {/* a logo or  replace Text with an Image component */}
        <Text style={styles.title}>HikeConnect</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8A9A5B',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#333333',
  },
});

export default SplashScreen;
