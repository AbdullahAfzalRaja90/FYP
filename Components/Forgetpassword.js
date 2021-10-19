import React, { useState } from 'react';
<<<<<<< HEAD
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert, StatusBar, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
=======
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
>>>>>>> eacb7dfb872a53faa632d4a6cdb1ddb88d8d1a17

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');

  const handleSendResetEmail = () => {
<<<<<<< HEAD
    Alert.alert(
      "Reset Link Sent",
      "If an account exists for " + email + ", you will receive an email with instructions to reset your password.",
      [{ text: "OK" }]
=======
    // Placeholder for actual implementation
    // You would typically make a fetch/axios request here to your backend endpoint
    // For example:
    // axios.post('YOUR_BACKEND_ENDPOINT', { email: email })
    //   .then(response => {
    //     Alert.alert("Success", "Please check your email to reset your password.");
    //   })
    //   .catch(error => {
    //     Alert.alert("Error", "Failed to send reset email.");
    //   });

    Alert.alert(
      "Reset Link Sent",
      "If an account exists for " + email + ", you will receive an email with instructions to reset your password.",
      [
        { text: "OK" }
      ]
>>>>>>> eacb7dfb872a53faa632d4a6cdb1ddb88d8d1a17
    );
  };

  return (
<<<<<<< HEAD
    <LinearGradient
      colors={['#022B42', '#005F73']}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.iconContainer}>
          <Icon name="key" size={80} color="#FDD387" style={styles.icon} />
        </View>
        <Text style={styles.title}>Forgot Password</Text>
        <Text style={styles.subtitle}>Enter your email to receive a reset link</Text>
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder="Enter your email"
          placeholderTextColor="#aaa"
          keyboardType="email-address"
        />
        <TouchableOpacity style={styles.button} onPress={handleSendResetEmail}>
          <Text style={styles.buttonText}>Send Reset Email</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
=======
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Enter your email"
        keyboardType="email-address"
      />
      <Button
        title="Send Reset Email"
        onPress={handleSendResetEmail}
      />
    </View>
>>>>>>> eacb7dfb872a53faa632d4a6cdb1ddb88d8d1a17
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
<<<<<<< HEAD
    alignItems: 'center',
    padding: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    marginBottom: 10,
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
  input: {
    height: 50,
    width: '100%',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
    fontSize: 16,
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
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '600',
=======
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
>>>>>>> eacb7dfb872a53faa632d4a6cdb1ddb88d8d1a17
  },
});

export default ForgotPasswordScreen;
