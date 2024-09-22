import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const EmergencyScreen = () => {
  const makeCall = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  return (
    <LinearGradient colors={['#022B42', '#005F73']} style={styles.container}>
      <Ionicons name="alert-circle-outline" size={80} color="#FDD387" style={styles.icon} />
      <Text style={styles.title}>Emergency Information</Text>
      <Text style={styles.description}>
        In case of an emergency, please contact the nearest authorities or medical services immediately. 
        Always keep your emergency contacts informed about your hiking plans and whereabouts.
      </Text>
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Emergency Contacts</Text>
        <TouchableOpacity style={styles.button} onPress={() => makeCall('911')}>
          <LinearGradient colors={['#FF5F6D', '#FFC371']} style={styles.gradient}>
            <Text style={styles.buttonText}>Police: 911</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => makeCall('112')}>
          <LinearGradient colors={['#FF5F6D', '#FFC371']} style={styles.gradient}>
            <Text style={styles.buttonText}>Medical: 112</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => makeCall('1234567890')}>
          <LinearGradient colors={['#FF5F6D', '#FFC371']} style={styles.gradient}>
            <Text style={styles.buttonText}>Forest Ranger: (123) 456-7890</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FDD387',
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#E0FBFC',
    textAlign: 'center',
    marginBottom: 20,
  },
  infoContainer: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    marginBottom: 15,
    borderRadius: 25,
    overflow: 'hidden',
  },
  gradient: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    alignItems: 'center',
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoText: {
    fontSize: 16,
    color: '#E0FBFC',
    marginBottom: 5,
    textAlign: 'center',
  },
});

export default EmergencyScreen;
