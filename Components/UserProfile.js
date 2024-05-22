import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';

const UserProfile = ({ user }) => {
  const [profile, setProfile] = useState(user || {
    name: '',
    email: '',
    achievements: ''
  });

  const updateProfile = () => {
    // API call to update the user profile
    console.log('Profile updated:', profile);
    alert('Profile Updated Successfully!');
  };

  return (
    <View style={styles.container}>
      <Text>User Profile</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        onChangeText={text => setProfile({...profile, name: text})}
        value={profile.name}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={text => setProfile({...profile, email: text})}
        value={profile.email}
      />
      <TextInput
        style={styles.input}
        placeholder="Achievements"
        onChangeText={text => setProfile({...profile, achievements: text})}
        value={profile.achievements}
      />
      <Button
        title="Update Profile"
        onPress={updateProfile}
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

export default UserProfile;
