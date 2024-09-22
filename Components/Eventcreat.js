import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
  Image,
  ActionSheetIOS,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import navigation
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import ENV from '../env'; 

const EventCreation = () => {
  const navigation = useNavigation();  // Hook for navigation
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    date: new Date(),
    time: new Date(),
    isPublic: true,
    creatorImage: '', 
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [image, setImage] = useState(null); 
  const [isEventCreated, setIsEventCreated] = useState(false); // Track if the event is created

  useEffect(() => {
    requestPermission();
  }, []);

  // Request camera and media library permissions
  const requestPermission = async () => {
    const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
    const { status: mediaLibraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (cameraStatus !== 'granted' || mediaLibraryStatus !== 'granted') {
      Alert.alert('Permission denied', 'You need to enable permissions to use this feature.');
    }
  };

  const pickImageFromGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      handleInputChange('creatorImage', result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      handleInputChange('creatorImage', result.assets[0].uri);
    }
  };

  const handleImageUpload = () => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Cancel', 'Take Photo', 'Choose from Gallery'],
          cancelButtonIndex: 0,
        },
        (buttonIndex) => {
          if (buttonIndex === 1) {
            takePhoto();
          } else if (buttonIndex === 2) {
            pickImageFromGallery();
          }
        }
      );
    } else {
      Alert.alert(
        'Upload Image',
        'Choose an option',
        [
          { text: 'Take Photo', onPress: () => takePhoto() },
          { text: 'Choose from Gallery', onPress: () => pickImageFromGallery() },
          { text: 'Cancel', style: 'cancel' },
        ],
        { cancelable: true }
      );
    }
  };

  const handleInputChange = (name, value) => {
    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateEvent = () => {
    const { title, description, date, time, creatorImage } = eventData;
  
    if (!title || !description || !creatorImage || !date || !time) {
      Alert.alert('Validation Error', 'All fields, including an image, are required.');
      return false;
    }
  
    const today = new Date().setHours(0, 0, 0, 0);
    const selectedDate = new Date(date).setHours(0, 0, 0, 0);
  
    if (selectedDate < today) {
      Alert.alert('Validation Error', 'Event date cannot be in the past.');
      return false;
    }
  
    return true;
  };
  
  const submitEvent = async () => {
    if (!validateEvent()) {
      return;
    }
  
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Error', 'No token found. Please log in again.');
        return;
      }
  
      const formData = new FormData();
      formData.append('title', eventData.title);
      formData.append('description', eventData.description);
      formData.append('date', eventData.date.toISOString());
      formData.append('time', eventData.time.toISOString());
      formData.append('isPublic', eventData.isPublic.toString());
      
      // Ensure the image is correctly appended to FormData
      if (eventData.creatorImage) {
        formData.append('creatorImage', {
          uri: eventData.creatorImage,    // This should be a file URI like 'file:///path/to/image.jpg'
          type: 'image/jpeg',            // Adjust based on your file type
          name: 'event-image.jpg',       // Name of the image file
        });
      } else {
        Alert.alert('Error', 'Image is required');
        return;
      }
  
      console.log('FormData:', formData); // Log FormData for debugging
  
      const response = await axios.post(`${ENV.API_BASE_URL}/api/events/create-event`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.status === 201) {
        setIsEventCreated(true); 
        Alert.alert(
          'Success',
          'Event Created Successfully!',
          [{ text: 'OK', onPress: () => navigation.navigate('Dashboard') }]
        );
      } else {
        Alert.alert('Error', 'Failed to create event.');
      }
    } catch (error) {
      console.error('Error message:', error.response ? error.response.data : error.message);
      Alert.alert('Error', 'Failed to create event. Please try again later.');
    }
  };
  

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || eventData.date;
    setShowDatePicker(false);
    handleInputChange('date', currentDate);
  };

  const handleTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || eventData.time;
    setShowTimePicker(false);
    handleInputChange('time', currentTime);
  };

  return (
    <LinearGradient colors={['#022B42', '#005F73']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.iconContainer}>
          <Ionicons name="calendar-outline" size={80} color="#FDD387" />
        </View>
        <Text style={styles.title}>Create New Event</Text>

        <TextInput
          style={styles.input}
          placeholder="Event Title"
          placeholderTextColor="#8e93a1"
          onChangeText={(text) => handleInputChange('title', text)}
          value={eventData.title}
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Description"
          placeholderTextColor="#8e93a1"
          onChangeText={(text) => handleInputChange('description', text)}
          value={eventData.description}
          multiline
        />

        <View style={styles.imageUploadContainer}>
          {image && <Image source={{ uri: image }} style={styles.imagePreview} />}
          <TouchableOpacity style={styles.imageButton} onPress={handleImageUpload}>
            <Text style={styles.imageButtonText}>Upload Picture</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.datePickerButton} onPress={() => setShowDatePicker(true)}>
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

        <TouchableOpacity style={styles.datePickerButton} onPress={() => setShowTimePicker(true)}>
          <Text style={styles.datePickerText}>
            {eventData.time ? eventData.time.toLocaleTimeString() : 'Select Time'}
          </Text>
        </TouchableOpacity>
        {showTimePicker && (
          <DateTimePicker
            value={eventData.time}
            mode="time"
            display="default"
            onChange={handleTimeChange}
          />
        )}

        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Public Event</Text>
          <Switch
            value={eventData.isPublic}
            onValueChange={(value) => handleInputChange('isPublic', value)}
            trackColor={{ true: '#4CAF50', false: '#ccc' }}
            thumbColor={eventData.isPublic ? '#4CAF50' : '#f4f3f4'}
          />
        </View>
        <TouchableOpacity 
          style={[styles.button, isEventCreated && { backgroundColor: '#888' }]} 
          onPress={submitEvent} 
          disabled={isEventCreated}  // Disable button if event is already created
        >
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
  },
  datePickerText: {
    fontSize: 16,
    color: '#333',
  },
  imageUploadContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  imageButton: {
    backgroundColor: '#FDD387',
    padding: 10,
    borderRadius: 15,
    marginTop: 10,
    width: '80%',
    alignItems: 'center',
  },
  imageButtonText: {
    color: '#022B42',
    fontSize: 16,
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
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
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default EventCreation;
