import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
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

  const handleInputChange = (name, value) => {
    setEventData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const validateEvent = () => {
    const { title, description, date } = eventData;

    if (!title || !description) {
      Alert.alert('Validation Error', 'All fields are required.');
      return false;
    }

    if (new Date(date).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)) {
      Alert.alert('Validation Error', 'Event date cannot be in the past.');
      return false;
    }

    return true;
  };

  const submitEvent = async () => {
    if (!validateEvent()) return;

    try {
      const response = await axios.post(`${ENV.API_BASE_URL}/create-event`, eventData);
      
      if (response.data.status === 'ok') {
        console.log('Event submitted:', eventData);
        Alert.alert('Success', 'Event Created Successfully!');
        navigation.navigate('Dashboard'); // Navigate back to the dashboard screen
      } else {
        Alert.alert('Error', 'Failed to create event. Please try again later.');
      }
    } catch (error) {
      console.error('Error creating event:', error.message);
      Alert.alert('Error', 'Failed to create event. Please try again later.');
    }
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || eventData.date;
    setShowDatePicker(false);
    handleInputChange('date', currentDate);
  };

  return (
    <LinearGradient
      colors={['#022B42', '#005F73']}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.iconContainer}>
          <Ionicons name="calendar-outline" size={80} color="#FDD387" />
        </View>
        <Text style={styles.title}>Create New Hiking Event</Text>
        <TextInput
          style={styles.input}
          placeholder="Event Title"
          placeholderTextColor="#8e93a1"
          onChangeText={text => handleInputChange('title', text)}
          value={eventData.title}
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Description"
          placeholderTextColor="#8e93a1"
          onChangeText={text => handleInputChange('description', text)}
          value={eventData.description}
          multiline
        />
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
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Public Event</Text>
          <Switch
            value={eventData.isPublic}
            onValueChange={value => handleInputChange('isPublic', value)}
            trackColor={{ true: '#4CAF50', false: '#ccc' }}
            thumbColor={eventData.isPublic ? '#4CAF50' : '#f4f3f4'}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={submitEvent}>
          <Text style={styles.buttonText}>Create Event</Text>
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
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 20,
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
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
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
    width: '100%',
    paddingVertical: 14,
    borderRadius: 30,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default EventCreation;
