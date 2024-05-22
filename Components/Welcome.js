import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

const Welcome = ({ navigation }) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#F8F8F8',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
      }}
    >
      <Text
        style={{
          fontSize: 22,
          fontWeight: 'bold',
          marginBottom: 10,
          textAlign: 'center',
        }}
      >
        Welcome to HikeConnect!
      </Text>
      <Text
        style={{
          fontSize: 16,
          textAlign: 'center',
          marginBottom: 30,
        }}
      >
        Discover your elevation and see how you stack up against the world's most iconic landmarks, all in one app.
      </Text>
      {/* Make sure the path to the image is correct */}
      <Image source={require('../assets/welcome.png')} style={{ width: '100%', resizeMode: 'contain' }} />
      <TouchableOpacity
      onPress={() => navigation.navigate('Login')}
        style={{
          backgroundColor: '#4CAF50',
          paddingVertical: 12,
          paddingHorizontal: 20,
          borderRadius: 25,
          marginTop: 30,
        }}
      >
        <Text
          style={{
            color: 'white',
            fontSize: 18,
            textAlign: 'center',
          }}
        >
          Continue
        </Text>
      </TouchableOpacity>
      <Text
        style={{
          position: 'absolute',
          bottom: 10,
          color: 'grey',
        }}
      >
        Privacy Policy
      </Text>
    </View>
  );
};

export default Welcome;
