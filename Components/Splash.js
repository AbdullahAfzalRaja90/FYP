import React, { useEffect } from 'react';
<<<<<<< HEAD
import { View, Text, StyleSheet, Animated, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
=======
import { View, Text, StyleSheet, Animated } from 'react-native';
>>>>>>> eacb7dfb872a53faa632d4a6cdb1ddb88d8d1a17

const SplashScreen = ({ navigation }) => {
  // Initialize values for opacity and scale animations
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0);
<<<<<<< HEAD
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
=======

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
>>>>>>> eacb7dfb872a53faa632d4a6cdb1ddb88d8d1a17
        useNativeDriver: true,
      }),
    ]).start();

    // Set a timeout to navigate from the splash screen to the main screen
    const timer = setTimeout(() => {
<<<<<<< HEAD
      navigation.replace('Welcome');
    }, 3500); // 3.5 seconds delay for the splash screen

    return () => clearTimeout(timer);
  }, [fadeAnim, scaleAnim, textFadeAnim, navigation]);

  return (
    <LinearGradient
      colors={['#B2FEFA', '#0ED2F7']} // Updated light green colors for better contrast
      style={styles.container}
    >
=======
      navigation.replace('Welcome'); 
    }, 3000); // 3 seconds delay for the splash screen

    return () => clearTimeout(timer);
  }, [fadeAnim, scaleAnim, navigation]);

  return (
    <View style={styles.container}>
>>>>>>> eacb7dfb872a53faa632d4a6cdb1ddb88d8d1a17
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
<<<<<<< HEAD
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
=======
        {/* a logo or  replace Text with an Image component */}
        <Text style={styles.title}>HikeConnect</Text>
      </Animated.View>
    </View>
>>>>>>> eacb7dfb872a53faa632d4a6cdb1ddb88d8d1a17
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
<<<<<<< HEAD
=======
    backgroundColor: '#8A9A5B',
>>>>>>> eacb7dfb872a53faa632d4a6cdb1ddb88d8d1a17
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
<<<<<<< HEAD
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
=======
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#333333',
>>>>>>> eacb7dfb872a53faa632d4a6cdb1ddb88d8d1a17
  },
});

export default SplashScreen;
