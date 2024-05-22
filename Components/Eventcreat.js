import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';

const EventCreation = ({ navigation }) => {
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    date: '',
    isPublic: true
  });

  const handleInputChange = (name, value) => {
    setEventData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const submitEvent = () => {
    // Here you would typically handle the API request to save the event data
    console.log('Event submitted:', eventData);
    alert('Event Created Successfully!');
  };

  return (
    <View style={styles.container}>
      <Text>Create New Event</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        onChangeText={text => handleInputChange('title', text)}
        value={eventData.title}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        onChangeText={text => handleInputChange('description', text)}
        value={eventData.description}
      />
      <TextInput
        style={styles.input}
        placeholder="Date"
        onChangeText={text => handleInputChange('date', text)}
        value={eventData.date}
      />
      <Button
        title="Create Event"
        onPress={submitEvent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
  },
});

export default EventCreation;
