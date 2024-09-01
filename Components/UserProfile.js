import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ENV from '../env'; // Adjust the path as necessary

const UserProfile = ({ navigation }) => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    gender: '', // Updated property
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user data when component mounts
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('token'); // Assuming token is stored in AsyncStorage
        if (!token) {
          throw new Error('Token not found');
        }

        const response = await axios.post(`${ENV.API_BASE_URL}/userdata`, { token });

        if (response.data.status === 'ok') {
          setProfile(response.data.data);
        } else {
          console.error('Error fetching user data:', response.data.error);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const updateProfile = async () => {
    try {
      // Log the current profile state before update
      console.log('Profile before update:', profile);

      // Send HTTP request to update user profile
      const token = await AsyncStorage.getItem('token');
      const response = await axios.post(`${ENV.API_BASE_URL}/updateuser`, {
        token,
        updatedData: profile,
      });

      // Check if the update was successful
      if (response.data.status === 'ok') {
        console.log('Profile updated:', profile);
        alert('Profile Updated Successfully!');
        setIsEditing(false);
      } else {
        console.error('Error updating profile:', response.data.error);
        alert('Failed to update profile. Please try again.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <LinearGradient colors={['#022B42', '#005F73']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.iconContainer}>
          <Icon name="user-circle" size={100} color="#FDD387" style={styles.icon} />
        </View>
        <Text style={styles.title}>User Profile</Text>
        
        {isEditing ? (
          <>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your name"
                placeholderTextColor="#aaa"
                value={profile.name}
                onChangeText={text => setProfile({ ...profile, name: text })}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="#aaa"
                keyboardType="email-address"
                autoCapitalize="none"
                value={profile.email}
                onChangeText={text => setProfile({ ...profile, email: text })}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Gender</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your gender"
                placeholderTextColor="#aaa"
                value={profile.gender}
                onChangeText={text => setProfile({ ...profile, gender: text })}
              />
            </View>
            <TouchableOpacity style={styles.button} onPress={updateProfile}>
              <Text style={styles.buttonText}>Save Profile</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <View style={styles.detailGroup}>
              <Text style={[styles.label, styles.labelBlack]}>Name</Text>
              <Text style={styles.detail}>{profile.name}</Text>
            </View>
            <View style={styles.detailGroup}>
              <Text style={[styles.label, styles.labelBlack]}>Email</Text>
              <Text style={styles.detail}>{profile.email}</Text>
            </View>
            <View style={styles.detailGroup}>
              <Text style={[styles.label, styles.labelBlack]}>Gender</Text>
              <Text style={styles.detail}>{profile.gender}</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => setIsEditing(true)}>
              <Text style={styles.buttonText}>Update Profile</Text>
            </TouchableOpacity>
          </>
        )}
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
  inputGroup: {
    marginBottom: 20,
  },
  detailGroup: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#E0FBFC',
  },
  labelBlack: {
    color: 'black', // Change the color to black
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
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
  detail: {
    fontSize: 16,
    color: '#333333',
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default UserProfile;
