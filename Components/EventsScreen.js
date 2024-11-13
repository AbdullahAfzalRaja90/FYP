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
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import ENV from '../env'; // Adjust the path if needed
import DateTimePicker from '@react-native-community/datetimepicker';

const EventsScreen = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterDate, setFilterDate] = useState(null);
  const [keyword, setKeyword] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isPublicSearch, setIsPublicSearch] = useState(true); // State to toggle between public and private search
  const navigation = useNavigation();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${ENV.API_BASE_URL}/events`);
        const currentDate = new Date();
        const upcomingEvents = response.data.data.filter(event => new Date(event.date) >= currentDate); // Filter out past events
        const sortedEvents = upcomingEvents.sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort events by ascending date
        setEvents(sortedEvents);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching events:', error);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const filterEvents = (isPublic) => {
    return events.filter(event => {
      const matchesDate = filterDate ? new Date(event.date).toDateString() === new Date(filterDate).toDateString() : true;
      const matchesKeyword = keyword ? event.title.toLowerCase().includes(keyword.toLowerCase()) || event.description.toLowerCase().includes(keyword.toLowerCase()) : true;
      return matchesDate && matchesKeyword && event.isPublic === isPublic;
    });
  };

  const renderEvent = (event) => (
    <TouchableOpacity
      key={event._id}
      style={styles.eventContainer}
      onPress={() => navigation.navigate('JoinEventScreen', { eventId: event._id })}
    >
      <Image source={require('../assets/welcome.png')} style={styles.eventImage} />
      <View style={styles.eventDetails}>
        <Text style={styles.eventTitle}>{event.title}</Text>
        <Text style={styles.eventDescription}>{event.description}</Text>
        <Text style={styles.eventDate}>{new Date(event.date).toLocaleDateString()}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Upcoming Events</Text>
      <View style={styles.filterContainer}>
        <TouchableOpacity
          onPress={() => setShowDatePicker(true)}
          style={styles.datePickerButton}
        >
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
        <TextInput
          style={styles.keywordInput}
          placeholder="Search by keyword"
          placeholderTextColor="#888"
          value={keyword}
          onChangeText={setKeyword}
        />
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#022B42',
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
    backgroundColor: '#FDD387',
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
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  datePickerButton: {
    backgroundColor: '#FDD387',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  datePickerText: {
    color: '#022B42',
  },
  keywordInput: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 5,
    paddingHorizontal: 10,
    color: '#022B42',
    height: 40,
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
