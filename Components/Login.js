<<<<<<< HEAD
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage'; // For token storage
import { useAuthStore } from '../store/authStore';
import ENV from '../env';  // Adjust the path based on where your ENV.js file is located

const Login = ({ navigation }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { login } = useAuthStore(); // Assuming useAuthStore is a custom hook managing authentication logic
  const [secureTextEntry, setSecureTextEntry] = useState(true); // For password visibility

  // Handle form field changes
  const handleChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Validate the form before submission
  const validateForm = () => {
    let formIsValid = true;
    let errors = {};

    if (!formData.email) {
      formIsValid = false;
      errors['email'] = '*Please enter your email.';
    }

    if (!formData.password) {
      formIsValid = false;
      errors['password'] = '*Please enter your password.';
    }

    setErrors(errors);
    return formIsValid;
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (validateForm()) {
      setLoading(true);
      try {
        const response = await fetch(`${ENV.API_BASE_URL}/api/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });
  
        // Ensure the response is valid JSON
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const result = await response.json();
          console.log('Result:', result);
  
          if (response.ok) {
            // Store the token in AsyncStorage
            await AsyncStorage.setItem('token', result.token);

            setLoading(false);
            Alert.alert('Success', 'Logged in successfully!', [
              { text: 'OK', onPress: () => navigation.navigate('Dashboard') },
            ]);
          } else {
            setLoading(false);
            Alert.alert('Error', result.message || 'Invalid email or password.');
          }
        } else {
          const text = await response.text();
          console.log('Non-JSON response:', text); // Log the HTML error page for debugging
          setLoading(false);
          Alert.alert('Error', 'Unexpected response from the server.');
        }
      } catch (error) {
        setLoading(false);
        console.error('Error:', error);
        Alert.alert('Error', 'Failed to log in. Please try again.');
      }
    }
  };

  return (
    <LinearGradient colors={['#022B42', '#005F73']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.formContainer}>
          <View style={styles.iconContainer}>
            <Icon name="user-circle" size={80} color="#4CAF50" style={styles.icon} />
          </View>
          <Text style={styles.title}>Login</Text>
          
          {/* Email Input */}
          <View style={styles.inputGroup}>
            <TextInput
              style={styles.input}
              value={formData.email}
              onChangeText={(text) => handleChange('email', text)}
              placeholder="Email Address"
              placeholderTextColor="#aaa"
              keyboardType="email-address"
            />
            <Icon name="envelope" size={20} color="#888" style={styles.inputIcon} />
            {!!errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
          </View>

          {/* Password Input with Eye Icon */}
          <View style={styles.inputGroup}>
            <TextInput
              style={styles.input}
              secureTextEntry={secureTextEntry}
              value={formData.password}
              onChangeText={(text) => handleChange('password', text)}
              placeholder="Password"
              placeholderTextColor="#aaa"
            />
            <Icon name="lock" size={20} color="#888" style={styles.inputIcon} />
            
            {/* Password Visibility Toggle */}
            <TouchableOpacity
              onPress={() => setSecureTextEntry(!secureTextEntry)}
              style={styles.eyeIconContainer}
            >
              <Icon name={secureTextEntry ? "eye-slash" : "eye"} size={20} color="#888" />
            </TouchableOpacity>
            
            {!!errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
          </View>

          {/* Show loading indicator while logging in */}
          {loading ? (
            <ActivityIndicator size="large" color="#4CAF50" />
          ) : (
            <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
              <Text style={styles.buttonText}>{loading ? 'Logging in...' : 'Login'}</Text>
            </TouchableOpacity>
          )}

          {/* Forgot Password Link */}
          <TouchableOpacity onPress={() => navigation.navigate('Forgetpassword')}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          {/* Don't have an account? Register */}
          <View style={styles.accountContainer}>
            <Text style={styles.accountText}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.signupLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#4CAF50',
  },
  inputGroup: {
    position: 'relative',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 45,  // Adjusted to accommodate icons
    marginBottom: 5,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  inputIcon: {
    position: 'absolute',
    left: 15,
    top: 15,
  },
  eyeIconContainer: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
  errorText: {
    color: '#FF4500',
    marginTop: 5,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    borderRadius: 30,
    elevation: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  forgotPasswordText: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 16,
    color: '#4CAF50',
  },
  accountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  accountText: {
    fontSize: 16,
    color: '#000',
  },
  signupLink: {
    fontSize: 16,
    color: '#4CAF50',
    marginLeft: 5,
  },
});

export default Login;
=======
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
      console.log(`Attempting to login with email: ${emailOrPhone}`);
      const response = await axios.post(`${ENV.API_BASE_URL}/login-user`, {
        email: emailOrPhone,
        password: password,
      });

      console.log('Response:', response.data);

      if (response.data.status === 'ok') {
        const token = response.data.data;
        await AsyncStorage.setItem('userToken', token); // Store the token with key 'userToken'
        Alert.alert('Success', 'Login Successful');
        navigation.navigate('Dashboard'); // Navigate to UserProfile screen
      } else {
        Alert.alert('Error', response.data.error || 'Login Failed');
      }
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 200 range
        console.error('Error response:', error.response);
        Alert.alert('Error', 'Server Error. Please try again.');
      } else if (error.request) {
        // Request was made but no response received
        console.error('Error request:', error.request);
        Alert.alert('Error', 'No response from server. Please check your network.');
      } else {
        // Something else happened in setting up the request
        console.error('Error message:', error.message);
        Alert.alert('Error', 'Something went wrong. Please try again.');
      }
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
>>>>>>> bec44a0743f1c39075927b00910f63b749f8b555
