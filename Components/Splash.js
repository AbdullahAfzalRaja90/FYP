import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const SplashScreen = ({ navigation }) => {
  // Initialize values for opacity and scale animations
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0);
  const textFadeAnim = new Animated.Value(0);

  useEffect(() => {
    // Start the fade-in and scale-up animations on component mount
    Animated.sequence([
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
      ]),
      Animated.timing(textFadeAnim, {
        toValue: 1, // Fully opaque
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    // Set a timeout to navigate from the splash screen to the main screen
    const timer = setTimeout(() => {
      navigation.replace('Welcome');
    }, 3500); // 3.5 seconds delay for the splash screen

    return () => clearTimeout(timer);
  }, [fadeAnim, scaleAnim, textFadeAnim, navigation]);

  return (
    <LinearGradient
      colors={['#B2FEFA', '#0ED2F7']} // Updated light green colors for better contrast
      style={styles.container}
    >
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
        <Image
          source={require('../assets/applogo.png')} // Replace with your logo path
          style={styles.logo}
        />
      </Animated.View>
      <Animated.View
        style={[
          styles.textContainer,
          {
            opacity: textFadeAnim,
          },
        ]}
      >
        <Text style={styles.title}>HikeConnect</Text>
        <Text style={styles.subtitle}>Elevate your adventure</Text>
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10, // Reduced space between logo and text
  },
  logo: {
    width: 250, // Increased width
    height: 250, // Increased height
    resizeMode: 'contain',
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#022B42',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  subtitle: {
    fontSize: 18,
    color: '#022B42',
    marginTop: 5, // Reduced space between title and subtitle
  },
});

export default SplashScreen;
