<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import ENV from '../env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const JoinEventScreen = ({ route, navigation }) => {
  const { eventId, eventDetails } = route.params;
  const [participants, setParticipants] = useState([]);
  const [alreadyJoined, setAlreadyJoined] = useState(false);

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Error', 'Authentication token is missing.');
        throw new Error('Token is missing');
      }
      return token;
    } catch (error) {
      console.error('Error getting token:', error);
      throw new Error('Failed to retrieve token.');
    }
  };

  const fetchParticipants = async () => {
    try {
      const token = await getToken();  // Fetch the token from AsyncStorage
      const response = await axios.get(`${ENV.API_BASE_URL}/api/events/${eventId}/participants`, {
        headers: {
          Authorization: `Bearer ${token}`,  // Pass the token in the Authorization header
        },
      });
      if (response.status === 200) {
        setParticipants(response.data.participants);

        // Check if the current user is already in the participants list
        const currentUserId = await AsyncStorage.getItem('userId');  // Assuming userId is stored in AsyncStorage
        const userAlreadyJoined = response.data.participants.some(participant => participant.userId._id === currentUserId);

        setAlreadyJoined(userAlreadyJoined);  // Update the state if the user has already joined
      }
    } catch (error) {
      console.error('Error fetching participants:', error);
      Alert.alert('Error', 'Failed to fetch participants.');
    }
  };

  const handleJoinEvent = async () => {
    try {
      const token = await getToken();  // Fetch the token from AsyncStorage
      const response = await axios.post(
        `${ENV.API_BASE_URL}/api/events/join`,
        { eventId },  // Pass eventId in the body
        {
          headers: {
            Authorization: `Bearer ${token}`,  // Pass the token in Authorization header
          },
        }
      );
  
      if (response.status === 200) {
        Alert.alert('Success', 'You have joined the event!');
        fetchParticipants(); // Fetch participants after joining
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        // Handle "already joined" error
        Alert.alert('Info', 'You have already joined this event.');
      } else {
        console.error('Error joining event:', error);
        Alert.alert('Error', 'Failed to join the event. Please try again.');
      }
    }
  };
  

  useEffect(() => {
    fetchParticipants();  // Fetch participants when component mounts
  }, []);

  return (
    <LinearGradient colors={['#022B42', '#005F73']} style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{eventDetails.title}</Text>
        <Text style={styles.description}>{eventDetails.description}</Text>

        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Date:</Text>
          <Text style={styles.infoText}>{new Date(eventDetails.date).toLocaleDateString()}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Time:</Text>
          <Text style={styles.infoText}>
            {eventDetails.time ? new Date(eventDetails.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'No time set'}
          </Text>
        </View>

        {/* Conditionally render the Join Button or a message if already joined */}
        {alreadyJoined ? (
          <Text style={styles.alreadyJoinedText}>You have already joined this event.</Text>
        ) : (
          <TouchableOpacity style={styles.joinButton} onPress={handleJoinEvent}>
            <Text style={styles.joinButtonText}>Join Event</Text>
          </TouchableOpacity>
        )}

        <Text style={styles.participantsTitle}>Participants:</Text>
        <ScrollView style={styles.participantsList}>
          {participants.map((participant) => (
            <View key={participant._id} style={styles.participantItem}>
              <Text style={styles.participantName}>{participant.userId.name}</Text>
              <Text style={styles.participantEmail}>{participant.userId.email}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#022B42',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  infoContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#022B42',
    marginRight: 10,
  },
  infoText: {
    fontSize: 16,
    color: '#555',
  },
  joinButton: {
    backgroundColor: '#FDD387',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  joinButtonText: {
    color: '#022B42',
    fontSize: 18,
    fontWeight: 'bold',
  },
  alreadyJoinedText: {
    color: '#FF4500',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  participantsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#022B42',
    marginTop: 20,
  },
  participantsList: {
    marginTop: 10,
  },
  participantItem: {
    marginBottom: 10,
  },
  participantName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#022B42',
  },
  participantEmail: {
    fontSize: 14,
    color: '#555',
  },
});

export default JoinEventScreen;
=======
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
>>>>>>> bec44a0743f1c39075927b00910f63b749f8b555
