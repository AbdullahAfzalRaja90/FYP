import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const feedbackData = [
  { id: '1', user: 'Abdullah Afzal', comment: 'Amazing trail! The view from the top was breathtaking.', icon: 'person-circle-outline' },
  { id: '2', user: 'Waleed Malik', comment: 'Loved the hike, but the trail was a bit challenging.', icon: 'person-circle-outline' },
  { id: '3', user: 'Najam Shah', comment: 'Great experience! Will definitely come back.', icon: 'person-circle-outline' },
];

const renderFeedbackItem = ({ item }) => (
  <View style={styles.feedbackItem}>
    <Ionicons name={item.icon} size={40} color="#FDD387" style={styles.icon} />
    <View style={styles.textContainer}>
      <Text style={styles.userName}>{item.user}</Text>
      <Text style={styles.comment}>{item.comment}</Text>
    </View>
  </View>
);

const CommunityFeedbackScreen = () => {
  return (
    <LinearGradient
      colors={['#022B42', '#005F73']}
      style={styles.container}
    >
      <Text style={styles.title}>Community Feedback</Text>
      <Text style={styles.description}>
        Share your experiences and read feedback from the community. Your input helps us improve and grow.
      </Text>
      <FlatList
        data={feedbackData}
        renderItem={renderFeedbackItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FDD387',
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#E0FBFC',
    textAlign: 'center',
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  feedbackItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  icon: {
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  comment: {
    fontSize: 14,
    color: '#E0FBFC',
  },
});

export default CommunityFeedbackScreen;
