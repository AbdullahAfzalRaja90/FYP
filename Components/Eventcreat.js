import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Switch, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import ENV from '../env'; // Adjust the path based on your directory structure

const EventCreation = ({ navigation }) => {
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    date: new Date(),
    isPublic: true,
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (name, value) => {
    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      setLoading(true);
      try {
        const response = await axios.post(`${ENV.API_BASE_URL}/create-event`, eventData); // Correct usage of template literals

        setLoading(false);

        if (response.data.status === 'ok') {
          Alert.alert('Success', 'Event Created Successfully!', [
            { text: 'OK', onPress: () => navigation.navigate('Dashboard') },
          ]);
        } else {
          alert(`Error: ${response.data.message}`);
        }
      } catch (error) {
        setLoading(false);
        console.error('Error:', error);
        alert('Failed to create event. Please try again.');
      }
    }
  };

  const validateForm = () => {
    let formIsValid = true;
    let errors = {};

    if (!eventData.title) {
      formIsValid = false;
      errors['title'] = '*Please enter event title.';
    }

    if (!eventData.description) {
      formIsValid = false;
      errors['description'] = '*Please enter event description.';
    }

    setErrors(errors);
    return formIsValid;
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || eventData.date;
    setShowDatePicker(false);
    handleInputChange('date', currentDate);
  };

  return (
    <LinearGradient colors={['#022B42', '#005F73']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.iconContainer}>
          <Icon name="calendar" size={80} color="#FDD387" style={styles.icon} />
        </View>
        <Text style={styles.title}>Create Event</Text>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Event Title</Text>
          <TextInput
            style={styles.input}
            value={eventData.title}
            onChangeText={(text) => handleInputChange('title', text)}
            placeholder="Enter event title"
            placeholderTextColor="#aaa"
          />
          {!!errors.title && <Text style={styles.errorText}>{errors.title}</Text>}
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={eventData.description}
            onChangeText={(text) => handleInputChange('description', text)}
            placeholder="Enter event description"
            placeholderTextColor="#aaa"
            multiline
          />
          {!!errors.description && <Text style={styles.errorText}>{errors.description}</Text>}
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Date</Text>
          <TouchableOpacity
            style={styles.datePickerButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.datePickerText}>
              {eventData.date ? eventData.date.toDateString() : 'Select Date'}
            </Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={eventData.date}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
        </View>
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Public Event</Text>
          <Switch
            value={eventData.isPublic}
            onValueChange={(value) => handleInputChange('isPublic', value)}
            trackColor={{ true: '#4CAF50', false: '#ccc' }}
            thumbColor={eventData.isPublic ? '#4CAF50' : '#f4f3f4'}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? 'Creating...' : 'Create Event'}</Text>
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
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  datePickerButton: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  datePickerText: {
    fontSize: 16,
    color: '#333',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  switchLabel: {
    fontSize: 16,
    color: '#E0FBFC',
    marginRight: 10,
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
  errorText: {
    color: '#FF4500',
    marginTop: 5,
  },
});

export default EventCreation;
