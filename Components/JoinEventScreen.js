import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert
} from 'react-native';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';
import ENV from '../env';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Function to retrieve token from AsyncStorage
const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    if (token !== null) {
      return token;
    }
  } catch (error) {
    console.error('Error getting token from storage:', error);
  }
  return null;
};

const JoinEventScreen = () => {
  const [event, setEvent] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const route = useRoute();
  const { eventId } = route.params;

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`${ENV.API_BASE_URL}/events/${eventId}`);
        setEvent(response.data.data);
      } catch (error) {
        console.error('Error fetching event details:', error.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchMembers = async () => {
      try {
        const response = await axios.get(`${ENV.API_BASE_URL}/events/${eventId}/members`);
        setMembers(response.data.data);
      } catch (error) {
        console.error('Error fetching event members:', error.message);
        Alert.alert('Error', 'Error fetching event members. Please try again later.');
      }
    };

    fetchEventDetails();
    fetchMembers();
  }, [eventId]);

  const joinEvent = async () => {
    try {
      const token = await getToken(); // Retrieve the token from AsyncStorage
      if (!token) {
        throw new Error('No token found');
      }
      console.log("Token sent:", token); // Log token to ensure it is correct

      const response = await axios.post(
        `${ENV.API_BASE_URL}/events/${eventId}/join`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token in the Authorization header
          },
        }
      );
      if (response.data.status === 'ok') {
        alert('You have successfully joined the event!');
        // Define and call fetchMembers here to refresh the members list
        const fetchMembers = async () => {
          try {
            const response = await axios.get(`${ENV.API_BASE_URL}/events/${eventId}/members`);
            setMembers(response.data.data);
          } catch (error) {
            console.error('Error fetching event members:', error.message);
          }
        };
        fetchMembers(); // Refresh the members list
      } else {
        alert('Failed to join the event.');
      }
    } catch (error) {
      console.error('Error joining the event:', error.message);
      Alert.alert('Error', 'Error joining the event. Please try again later.');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FDD387" />
        <Text style={styles.loadingText}>Loading Event Details...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {event && (
        <>
          <Image source={require('../assets/welcome.png')} style={styles.eventImage} />
          <View style={styles.eventDetails}>
            <Text style={styles.eventTitle}>{event.title}</Text>
            <Text style={styles.eventDescription}>{event.description}</Text>
            <Text style={styles.eventDate}>{new Date(event.date).toLocaleDateString()}</Text>
          </View>
          <TouchableOpacity style={styles.joinButton} onPress={joinEvent}>
            <Text style={styles.joinButtonText}>Join Event</Text>
          </TouchableOpacity>
          <Text style={styles.membersHeader}>Members:</Text>
          <View style={styles.membersList}>
            {members.map(member => (
              <View key={member._id} style={styles.memberContainer}>
                <Text style={styles.memberName}>{member.name}</Text>
              </View>
            ))}
          </View>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#022B42',
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
  eventImage: {
    width: '100%',
    height: 200,
  },
  eventDetails: {
    padding: 20,
    backgroundColor: '#FDD387',
    borderRadius: 15,
    margin: 20,
  },
  eventTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#022B42',
    marginBottom: 10,
  },
  eventDescription: {
    fontSize: 16,
    color: '#022B42',
    marginBottom: 10,
  },
  eventDate: {
    fontSize: 14,
    color: '#022B42',
  },
  joinButton: {
    backgroundColor: '#FDD387',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    margin: 20,
  },
  joinButtonText: {
    color: '#022B42',
    fontWeight: 'bold',
    fontSize: 16,
  },
  membersHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FDD387',
    textAlign: 'center',
    marginBottom: 10,
  },
  membersList: {
    padding: 20,
  },
  memberContainer: {
    backgroundColor: '#FDD387',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  memberName: {
    color: '#022B42',
    fontSize: 16,
  },
});

export default JoinEventScreen;
