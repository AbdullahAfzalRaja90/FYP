import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useAuthStore } from '../store/authStore';
import ENV from '../env';  // Adjust the path based on where your ENV.js file is located

const Signup = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { signup } = useAuthStore(); // Assuming useAuthStore is a custom hook managing authentication logic
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [secureTextEntry, setSecureTextEntry] = useState(true); // For password visibility

  const handleChange = (name, value) => {
    if (name === 'password' && value.length > 8) return; // Prevent input more than 8 characters
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (name === 'password') handlePasswordStrength(value);
  };

  const handlePasswordStrength = (password) => {
    let strength = 0;
    if (password.length === 8) strength += 20;
    if (/[A-Z]/.test(password)) strength += 20;
    if (/[a-z]/.test(password)) strength += 20;
    if (/\d/.test(password)) strength += 20;
    if (/[!@#$%^&*]/.test(password)) strength += 20;
    setPasswordStrength(strength);
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength === 100) {
      return 'green'; // Strong password
    } else if (passwordStrength >= 60) {
      return 'yellow'; // Medium password
    } else {
      return 'red'; // Weak password
    }
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      setLoading(true);
      try {
        const response = await fetch(`${ENV.API_BASE_URL}/api/auth/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
          }),
        });
  
        const result = await response.json();
        console.log('Response: ', response);
        console.log('Result: ', result);
  
        if (response.ok) {
          setLoading(false);
          Alert.alert('Success', 'Go to verification Email Page!', [
            { text: 'OK', onPress: () => navigation.navigate('EmailVerificationPage') },
          ]);
        } else {
          setLoading(false);
          Alert.alert('Error', result.message || 'Failed to create user.');
        }
      } catch (error) {
        setLoading(false);
        console.error('Error: ', error);
        Alert.alert('Error', 'Failed to create user. Please try again.');
      }
    }
  };

  const validateForm = () => {
    let formIsValid = true;
    let errors = {};

    if (!formData.name) {
      formIsValid = false;
      errors['name'] = '*Please enter your name.';
    }

    if (!formData.email) {
      formIsValid = false;
      errors['email'] = '*Please enter your email.';
    }

    if (!formData.password) {
      formIsValid = false;
      errors['password'] = '*Password must be exactly 8 characters.';
    } else if (formData.password.length !== 8) {
      formIsValid = false;
      errors['password'] = '*Password must be exactly 8 characters.';
    }

    setErrors(errors);
    return formIsValid;
  };

  return (
    <LinearGradient colors={['#022B42', '#005F73']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        <View style={styles.formContainer}>
          <View style={styles.iconContainer}>
            <Icon name="user-circle" size={80} color="#4CAF50" style={styles.icon} />
          </View>
          <Text style={styles.title}>Create Account</Text>
          
          {/* Name Input */}
          <View style={styles.inputGroup}>
            <TextInput
              style={styles.input}
              value={formData.name}
              onChangeText={(text) => handleChange('name', text)}
              placeholder="Full Name"
              placeholderTextColor="#aaa"
            />
            <Icon name="user" size={20} color="#888" style={styles.inputIcon} />
            {!!errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
          </View>

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
              maxLength={8}  // Restrict the password to 8 characters
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

            {/* Password Strength Indicator */}
            <View style={styles.passwordStrength}>
              <View style={{
                ...styles.strengthBar, 
                width: `${passwordStrength}%`,
                backgroundColor: getPasswordStrengthColor(),
              }} />
            </View>
            
            {!!errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
          </View>

          <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
            <Text style={styles.buttonText}>{loading ? 'Registering...' : 'Register'}</Text>
          </TouchableOpacity>

          {/* Already have an account section */}
          <View style={styles.accountContainer}>
            <Text style={styles.accountText}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginLink}>Login</Text>
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
  passwordStrength: {
    height: 5,
    backgroundColor: '#ddd',
    borderRadius: 5,
    overflow: 'hidden',
    marginVertical: 5,
  },
  strengthBar: {
    height: '100%',
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
  accountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  accountText: {
    fontSize: 16,
    color: '#000',
  },
  loginLink: {
    fontSize: 16,
    color: '#4CAF50',
    marginLeft: 5,
  },
});

export default Signup;
