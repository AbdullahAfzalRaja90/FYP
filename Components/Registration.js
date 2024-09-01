import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import ENV from '../env'; // Adjust the path based on your directory structure

const Registration = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    gender: '', // Added gender field
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      setLoading(true);
      try {
        const response = await fetch(`${ENV.API_BASE_URL}/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const result = await response.json();
        setLoading(false);

        if (result.status === 'ok') {
          Alert.alert('Success', 'User Created Successfully!', [
            { text: 'OK', onPress: () => navigation.navigate('Login') },
          ]);
        } else {
          alert(`Error: ${result.data}`);
        }
      } catch (error) {
        setLoading(false);
        console.error('Error:', error);
        alert('Failed to register. Please try again.');
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
      errors['password'] = '*Please enter your password.';
    }

    if (!formData.gender) {
      formIsValid = false;
      errors['gender'] = '*Please select your gender.';
    }

    setErrors(errors);
    return formIsValid;
  };

  return (
    <LinearGradient colors={['#022B42', '#005F73']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.iconContainer}>
          <Icon name="user-circle" size={80} color="#FDD387" style={styles.icon} />
        </View>
        <Text style={styles.title}>Create Account</Text>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={formData.name}
            onChangeText={(text) => handleChange('name', text)}
            placeholder="Enter your name"
            placeholderTextColor="#aaa"
          />
          {!!errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={formData.email}
            onChangeText={(text) => handleChange('email', text)}
            placeholder="Enter your email"
            placeholderTextColor="#aaa"
            keyboardType="email-address"
          />
          {!!errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            value={formData.password}
            onChangeText={(text) => handleChange('password', text)}
            placeholder="Enter your password"
            placeholderTextColor="#aaa"
          />
          {!!errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Gender</Text>
          <View style={styles.radioContainer}>
            <TouchableOpacity
              style={styles.radioButton}
              onPress={() => handleChange('gender', 'male')}
            >
              <View style={[styles.radioCircle, formData.gender === 'male' && styles.selectedRb]}>
                {formData.gender === 'male' && <View style={styles.selectedRbInner} />}
              </View>
              <Text style={styles.radioText}>Male</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.radioButton}
              onPress={() => handleChange('gender', 'female')}
            >
              <View style={[styles.radioCircle, formData.gender === 'female' && styles.selectedRb]}>
                {formData.gender === 'female' && <View style={styles.selectedRbInner} />}
              </View>
              <Text style={styles.radioText}>Female</Text>
            </TouchableOpacity>
          </View>
          {!!errors.gender && <Text style={styles.errorText}>{errors.gender}</Text>}
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? 'Registering...' : 'Register'}</Text>
        </TouchableOpacity>
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
    color: '#FDD387',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#E0FBFC',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 5,
    backgroundColor: '#fff',
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  radioCircle: {
    height: 25,
    width: 25,
    borderRadius: 12.5,
    borderWidth: 2,
    borderColor: '#005F73',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    backgroundColor: 'white',
  },
  selectedRb: {
    borderColor: '#4CAF50',
    backgroundColor: '#4CAF50',
  },
  selectedRbInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#ffffff',
  },
  radioText: {
    fontSize: 16,
    color: '#E0FBFC',
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default Registration;
