import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const Registration = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log('Form submitted:', formData);
      // Here you would typically send the form data to your server via an API call
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

    setErrors(errors);
    return formIsValid;
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={styles.input}
          value={formData.name}
          onChangeText={(text) => handleChange('name', text)}
        />
        {!!errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          value={formData.email}
          onChangeText={(text) => handleChange('email', text)}
        />
        {!!errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Password:</Text>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          value={formData.password}
          onChangeText={(text) => handleChange('password', text)}
        />
        {!!errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F5F5DC', // Beige background
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333333', // Dark grey for the text
  },
  input: {
    height: 40,
    borderColor: '#778899', // Light Slate Gray border
    borderWidth: 1,
    borderRadius: 5, // Rounded corners
    marginTop: 5,
    marginBottom: 5,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFF0', // Ivory background for contrast
    shadowColor: '#000', // Subtle shadow for depth
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  errorText: {
    color: '#FF4500', // Orangered color for errors
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#3CB371', // Medium Sea Green for button
    padding: 10,
    borderRadius: 5, // Rounded corners for button
    shadowColor: '#000', // Subtle shadow for button
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  buttonText: {
    color: '#FFF', // White color for text
    fontWeight: 'bold',
  },
});

export default Registration;
