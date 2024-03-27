import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Login = ({ navigation }) => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Implement your login logic here
    console.log('Logging in with:', emailOrPhone, password);
  };

  const handleForgotPassword = () => {
    // Implement your forgot password logic here
    console.log('Forgot password');
    navigation.navigate('Forgetpassword');
  };

  const handleCreateAccount = () => {
    // Implement your create account logic here
    console.log('Create account');
    navigation.navigate('Registration');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <StatusBar barStyle="dark-content" />

      <LinearGradient
        colors={['#78A5A3', '#C1E1C5', '#8e93a1']}
        style={styles.gradientBackground}
      >
        <View style={styles.contentContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email or Phone Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Email or Phone Number"
              placeholderTextColor="#8e93a1"
              value={emailOrPhone}
              onChangeText={setEmailOrPhone}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#8e93a1"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <View style={styles.linksContainer}>
            <TouchableOpacity onPress={handleForgotPassword}>
              <Text style={styles.link}>Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCreateAccount}>
              <Text style={styles.link}>Create New Account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff', // Set background color to white to prevent any gaps
  },
  gradientBackground: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    width: '100%',
    paddingHorizontal: 20, // Add horizontal padding to the content container
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    marginLeft: 2,
    marginBottom: 5,
    color: '#333333',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    marginBottom: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: '#d3d3d3',
    borderRadius: 8,
    fontSize: 16,
    color: '#333333',
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: '#4C9A2A',
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  linksContainer: {
    marginTop: 20,
  },
  link: {
    color: '#2e64e5',
    fontSize: 14,
    fontWeight: '500',
    marginTop: 10,
  },
});

export default Login;
