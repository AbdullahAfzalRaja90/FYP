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
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ENV from '../env'; // Adjust the path based on your directory structure

const Login = ({ navigation }) => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${ENV.API_BASE_URL}/login-user`, {
        email: emailOrPhone,
        password: password,
      });

      if (response.data.status === 'ok') {
        const token = response.data.data;
        await AsyncStorage.setItem('token', token);
        Alert.alert('Success', 'Login Successful');
        navigation.navigate('Dashboard'); // Navigate to UserProfile screen
      } else {
        Alert.alert('Error', response.data.error || 'Login Failed');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  const handleForgotPassword = () => {
    console.log('Forgot password');
    navigation.navigate('Forgetpassword');
  };

  const handleCreateAccount = () => {
    console.log('Create account');
    navigation.navigate('Registration');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <StatusBar barStyle="light-content" />
        <LinearGradient
          colors={['#78A5A3', '#C1E1C5', '#8e93a1']}
          style={styles.gradientBackground}
        >
          <View style={styles.contentContainer}>
            <Text style={styles.title}>Welcome Back!</Text>
            <Text style={styles.subtitle}>Please login to your account</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Email or Phone Number"
                placeholderTextColor="#8e93a1"
                value={emailOrPhone}
                onChangeText={setEmailOrPhone}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Password"
                  placeholderTextColor="#8e93a1"
                  secureTextEntry={secureTextEntry}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setSecureTextEntry(!secureTextEntry)}
                >
                  <Icon
                    name={secureTextEntry ? "eye-off" : "eye"}
                    size={24}
                    color="#8e93a1"
                  />
                </TouchableOpacity>
              </View>
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
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    width: '90%',
    paddingHorizontal: 20,
    paddingVertical: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#022B42',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#8e93a1',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
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
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#d3d3d3',
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  passwordInput: {
    flex: 1,
    padding: 15,
    fontSize: 16,
    color: '#333333',
  },
  eyeIcon: {
    paddingRight: 15,
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: '#4C9A2A',
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  linksContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  link: {
    color: '#2e64e5',
    fontSize: 14,
    fontWeight: '500',
    marginTop: 10,
  },
});

export default Login;
