import React from 'react';
import { View, Text, StyleSheet, SectionList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const BadgesScreen = () => {
  const data = [
    {
      title: 'Your Badges',
      data: [
        { id: '1', name: 'Trail Blazer', description: 'Completed 10 hikes', icon: 'walk-outline' },
        { id: '2', name: 'Mountain Conqueror', description: 'Climbed 5 mountains', icon: 'trail-sign-outline' },
        { id: '3', name: 'Nature Lover', description: 'Spent 100 hours in nature', icon: 'leaf-outline' },
      ],
    },
    {
      title: 'Ongoing Contests',
      data: [
        { id: '1', name: 'Longest Hike', prize: 'Gold Badge', endDate: '2024-06-30', icon: 'trophy-outline' },
        { id: '2', name: 'Most Trails', prize: 'Silver Badge', endDate: '2024-07-15', icon: 'map-outline' },
      ],
    },
    {
      title: 'Leaderboard',
      data: [
        { id: '1', name: 'John Doe - 1500 points' },
        { id: '2', name: 'Jane Smith - 1300 points' },
        { id: '3', name: 'Bob Johnson - 1200 points' },
      ],
    },
  ];

  const renderSectionHeader = ({ section }) => (
    <Text style={styles.sectionTitle}>{section.title}</Text>
  );

  const renderItem = ({ item, section }) => {
    if (section.title === 'Your Badges' || section.title === 'Ongoing Contests') {
      return (
        <View style={styles.itemContainer}>
          <Ionicons name={item.icon} size={40} color="#FDD387" style={styles.icon} />
          <View style={styles.textContainer}>
            <Text style={styles.itemName}>{item.name}</Text>
            {item.description && <Text style={styles.itemDescription}>{item.description}</Text>}
            {item.prize && <Text style={styles.itemPrize}>Prize: {item.prize}</Text>}
            {item.endDate && <Text style={styles.itemEndDate}>Ends on: {item.endDate}</Text>}
          </View>
        </View>
      );
    } else if (section.title === 'Leaderboard') {
      return (
        <Text style={styles.leaderboardText}>{item.name}</Text>
      );
    }
    return null;
  };

  return (
    <LinearGradient
      colors={['#022B42', '#005F73']}
      style={styles.container}
    >
      <SectionList
        sections={data}
        keyExtractor={(item, index) => item.id + index}
        renderSectionHeader={renderSectionHeader}
        renderItem={renderItem}
        contentContainerStyle={styles.scrollContainer}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FDD387',
    marginBottom: 10,
    marginTop: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
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
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  itemDescription: {
    fontSize: 14,
    color: '#E0FBFC',
  },
  itemPrize: {
    fontSize: 14,
    color: '#E0FBFC',
  },
  itemEndDate: {
    fontSize: 14,
    color: '#E0FBFC',
  },
  leaderboardText: {
    fontSize: 16,
    color: '#E0FBFC',
    marginBottom: 5,
  },
});

export default BadgesScreen;
