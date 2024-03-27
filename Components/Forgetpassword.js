import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');

  const handleSendResetEmail = () => {
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
    );
  };

  return (
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
  },
});

export default ForgotPasswordScreen;
