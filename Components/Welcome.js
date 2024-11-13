import React from 'react';
<<<<<<< HEAD
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












=======
import { View, Text, Image, TouchableOpacity } from 'react-native';

const Welcome = ({ navigation }) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#F8F8F8',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
      }}
    >
      <Text
        style={{
          fontSize: 22,
          fontWeight: 'bold',
          marginBottom: 10,
          textAlign: 'center',
        }}
      >
        Welcome to HikeConnect!
      </Text>
      <Text
        style={{
          fontSize: 16,
          textAlign: 'center',
          marginBottom: 30,
        }}
      >
        Discover your elevation and see how you stack up against the world's most iconic landmarks, all in one app.
      </Text>
      {/* Make sure the path to the image is correct */}
      <Image source={require('../assets/welcome.png')} style={{ width: '100%', resizeMode: 'contain' }} />
      <TouchableOpacity
      onPress={() => navigation.navigate('Login')}
        style={{
          backgroundColor: '#4CAF50',
          paddingVertical: 12,
          paddingHorizontal: 20,
          borderRadius: 25,
          marginTop: 30,
        }}
      >
        <Text
          style={{
            color: 'white',
            fontSize: 18,
            textAlign: 'center',
          }}
        >
          Continue
        </Text>
      </TouchableOpacity>
      <Text
        style={{
          position: 'absolute',
          bottom: 10,
          color: 'grey',
        }}
      >
        Privacy Policy
      </Text>
    </View>
  );
};

export default Welcome;
>>>>>>> eacb7dfb872a53faa632d4a6cdb1ddb88d8d1a17
