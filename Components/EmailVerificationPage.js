import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import ENV from '../env'; // Assuming you have ENV.js for environment variables
import { useAuthStore } from '../store/authStore'; // Assuming you're using Zustand for auth logic

const EmailVerificationPage = ({ navigation }) => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const { verifyEmail } = useAuthStore(); // Using your auth store for verification

  const handleChange = (index, value) => {
    const newCode = [...code];

    // Handle pasted content
    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedCode[i] || "";
      }
      setCode(newCode);

      // Focus on the last non-empty input or the first empty one
      const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
      const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
      inputRefs.current[focusIndex].focus();
    } else {
      newCode[index] = value;
      setCode(newCode);

      // Move focus to the next input field if value is entered
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.nativeEvent.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async () => {
    const verificationCode = code.join("");
    if (verificationCode.length !== 6) {
      Alert.alert('Error', 'Please fill all fields.');
      return;
    }

    try {
      // Make API call for verification
      const response = await fetch(`${ENV.API_BASE_URL}/api/auth/verify-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: verificationCode }),
      });

      const result = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'User Created  successfully!');
        navigation.navigate('Login'); // Navigate to the login page after verification
      } else {
        Alert.alert('Error', result.message || 'Verification failed. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying email: ', error);
      Alert.alert('Error', 'Verification failed. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify Your Email</Text>
      <Text style={styles.instructions}>Enter the 6-digit code sent to your email address.</Text>
      <View style={styles.codeContainer}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            value={digit}
            onChangeText={(value) => handleChange(index, value)}
            maxLength={1}
            keyboardType="number-pad"
            style={styles.input}
            onKeyPress={(e) => handleKeyDown(index, e)}
          />
        ))}
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Verify Email</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#022B42',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FDD387',
    marginBottom: 20,
  },
  instructions: {
    fontSize: 16,
    color: '#E0FBFC',
    marginBottom: 30,
    textAlign: 'center',
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  input: {
    width: 40,
    height: 50,
    margin: 5,
    fontSize: 24,
    textAlign: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#FDD387',
    color: '#FFF',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default EmailVerificationPage;
