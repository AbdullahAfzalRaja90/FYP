import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons'; // Add Icons for modern touch
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient
import ENV from '../env'; // Adjust the path if needed
import DateTimePicker from '@react-native-community/datetimepicker';

const EventsScreen = () => {
  const [events, setEvents] = useState([]); // State to store fetched events
  const [loading, setLoading] = useState(true); // Loading state for spinner
  const [filterDate, setFilterDate] = useState(null); // Date filter
  const [keyword, setKeyword] = useState(''); // Keyword for search
  const [showDatePicker, setShowDatePicker] = useState(false); // Date picker state
  const [isPublicSearch, setIsPublicSearch] = useState(true); // Toggle between public/private events
  const navigation = useNavigation();

  // Fetch events from backend on component mount
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${ENV.API_BASE_URL}/api/events`); // Adjust the URL to your backend endpoint
        const currentDate = new Date();
        const upcomingEvents = response.data.data.filter(
          (event) => new Date(event.date) >= currentDate
        ); // Filter past events
        const sortedEvents = upcomingEvents.sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort events by date
        setEvents(sortedEvents); // Set the events state
        setLoading(false); // Turn off the loading indicator
      } catch (error) {
        console.error('Error fetching events:', error);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []); // Empty dependency array to run this only once on mount

  // Filter events by public/private and search criteria
  const filterEvents = (isPublic) => {
    return events.filter((event) => {
      const matchesDate = filterDate
        ? new Date(event.date).toDateString() === new Date(filterDate).toDateString()
        : true;
      const matchesKeyword = keyword
        ? event.title?.toLowerCase().includes(keyword.toLowerCase()) ||
          event.description?.toLowerCase().includes(keyword.toLowerCase())
        : true;
      return matchesDate && matchesKeyword && event.isPublic === isPublic;
    });
  };

  // Render each event in the list
  const renderEvent = (event) => {
    const eventDate = new Date(event.date).toLocaleDateString();
    const eventTime = event.time
      ? new Date(event.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      : 'No time set';

    const imageUrl = event.creatorImage
      ? `${ENV.API_BASE_URL}/${event.creatorImage}` // Construct the full URL for the image
      : require('../assets/welcome.png'); // Fallback image if no creatorImage is available

    return (
      <TouchableOpacity
        key={event._id}
        style={styles.eventContainer}
        // Navigate to JoinEventScreen with eventId and event details
        onPress={() => navigation.navigate('JoinEventScreen', { eventId: event._id, eventDetails: event })}
      >
        <Image source={{ uri: imageUrl }} style={styles.eventImage} />
        <View style={styles.eventDetails}>
          <Text style={styles.eventTitle}>{event?.title || 'Untitled Event'}</Text>
          <Text style={styles.eventDescription}>{event?.description || 'No Description'}</Text>
          <Text style={styles.eventDate}>{`Date: ${eventDate}`}</Text>
          <Text style={styles.eventTime}>{`Time: ${eventTime}`}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <LinearGradient colors={['#022B42', '#005F73']} style={styles.container}>
      <Text style={styles.header}>Upcoming Events</Text>
      <View style={styles.filterContainer}>
        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePickerButton}>
          <MaterialIcons name="date-range" size={24} color="#022B42" style={styles.icon} />
          <Text style={styles.datePickerText}>
            {filterDate ? new Date(filterDate).toLocaleDateString() : 'Select Date'}
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={filterDate || new Date()}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) {
                setFilterDate(selectedDate);
              }
            }}
          />
        )}
        <View style={styles.searchSection}>
          <Feather name="search" size={20} color="#888" style={styles.icon} />
          <TextInput
            style={styles.keywordInput}
            placeholder="Search by keyword"
            placeholderTextColor="#888"
            value={keyword}
            onChangeText={setKeyword}
          />
        </View>
      </View>
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.toggleButton, isPublicSearch && styles.activeToggleButton]}
          onPress={() => setIsPublicSearch(true)}
        >
          <Text style={styles.toggleButtonText}>Public Events</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, !isPublicSearch && styles.activeToggleButton]}
          onPress={() => setIsPublicSearch(false)}
        >
          <Text style={styles.toggleButtonText}>Private Events</Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FDD387" />
          <Text style={styles.loadingText}>Fetching Events...</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {filterEvents(isPublicSearch).map((event) => renderEvent(event))}
        </ScrollView>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FDD387',
    marginBottom: 20,
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#FDD387',
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  eventContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
  },
  eventImage: {
    width: 120,
    height: 120,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  eventDetails: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
  },
  eventTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#022B42',
    marginBottom: 5,
  },
  eventDescription: {
    fontSize: 14,
    color: '#022B42',
    marginBottom: 10,
  },
  eventDate: {
    fontSize: 12,
    color: '#022B42',
  },
  eventTime: {
    fontSize: 12,
    color: '#022B42',
    marginTop: 5,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 5,
    paddingHorizontal: 10,
    color: '#022B42',
    height: 40,
    flex: 1,
    marginLeft: 10,
  },
  icon: {
    paddingRight: 10,
  },
  datePickerButton: {
    backgroundColor: '#FDD387',
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  datePickerText: {
    color: '#022B42',
    paddingLeft: 10,
  },
  keywordInput: {
    flex: 1,
    backgroundColor: '#FFF',
    color: '#022B42',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#FDD387',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  activeToggleButton: {
    backgroundColor: '#FDD387',
  },
  toggleButtonText: {
    color: 'gray',
    fontWeight: 'bold',
  },
});

export default EventsScreen;
