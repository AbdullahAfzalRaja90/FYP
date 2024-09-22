<<<<<<< HEAD
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Welcome = ({ navigation }) => {
  return (
    <LinearGradient
      colors={['#022B42', '#005F73']}
      style={styles.container}
    >
      <Text style={styles.title}>
        Welcome to HikeConnect!
      </Text>
      <Text style={styles.subtitle}>
        Discover your elevation and see how you stack up against the world's most iconic landmarks, all in one app.
      </Text>
      <View style={styles.imageContainer}>
        <Image 
          source={require('../assets/welcome.png')} 
          style={styles.image} 
        />
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Signup')}
        style={styles.button}
      >
        <Text style={styles.buttonText}>
          Continue
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => alert('Privacy Policy')}
        style={styles.privacyPolicy}
      >
        <Text style={styles.privacyPolicyText}>
          Privacy Policy
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#FDD387',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30,
    color: '#E0FBFC',
  },
  imageContainer: {
    width: '90%',  // Increased width
    height: 300,  // Increased height
    marginBottom: 30,
    borderRadius: 20,  // Increased border radius for a smoother look
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '600',
  },
  privacyPolicy: {
    position: 'absolute',
    bottom: 20,
  },
  privacyPolicyText: {
    color: '#A8DADC',
    fontSize: 16,
  },
});

export default Welcome;












=======
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Welcome = ({ navigation }) => {
  return (
    <LinearGradient
      colors={['#022B42', '#005F73']}
      style={styles.container}
    >
      <Text style={styles.title}>
        Welcome to HikeConnect!
      </Text>
      <Text style={styles.subtitle}>
        Discover your elevation and see how you stack up against the world's most iconic landmarks, all in one app.
      </Text>
      <View style={styles.imageContainer}>
        <Image 
          source={require('../assets/welcome.png')} 
          style={styles.image} 
        />
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
        style={styles.button}
      >
        <Text style={styles.buttonText}>
          Continue
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => alert('Privacy Policy')}
        style={styles.privacyPolicy}
      >
        <Text style={styles.privacyPolicyText}>
          Privacy Policy
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#FDD387',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30,
    color: '#E0FBFC',
  },
  imageContainer: {
    width: '90%',  // Increased width
    height: 300,  // Increased height
    marginBottom: 30,
    borderRadius: 20,  // Increased border radius for a smoother look
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '600',
  },
  privacyPolicy: {
    position: 'absolute',
    bottom: 20,
  },
  privacyPolicyText: {
    color: '#A8DADC',
    fontSize: 16,
  },
});

export default Welcome;












>>>>>>> bec44a0743f1c39075927b00910f63b749f8b555
