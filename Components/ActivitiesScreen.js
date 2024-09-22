import React from 'react';
import { View, Text, StyleSheet, SectionList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const ActivitiesScreen = () => {
  const data = [
    {
      title: 'Recent Activities',
      data: [
        { id: '1', name: 'Morning Hike', date: '2024-05-20', duration: '2 hours', icon: 'walk-outline' },
        { id: '2', name: 'Mountain Climb', date: '2024-05-18', duration: '5 hours', icon: 'trail-sign-outline' },
      ],
    },
    {
      title: 'Upcoming Activities',
      data: [
        { id: '1', name: 'Sunset Hike', date: '2024-05-22', duration: '1.5 hours', icon: 'sunny-outline' },
        { id: '2', name: 'River Trail', date: '2024-05-25', duration: '3 hours', icon: 'water-outline' },
      ],
    },
  ];

  const renderSectionHeader = ({ section }) => (
    <Text style={styles.sectionTitle}>{section.title}</Text>
  );

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Ionicons name={item.icon} size={40} color="#FDD387" style={styles.icon} />
      <View style={styles.textContainer}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemDate}>{item.date}</Text>
        <Text style={styles.itemDuration}>{item.duration}</Text>
      </View>
    </View>
  );

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
  itemDate: {
    fontSize: 14,
    color: '#E0FBFC',
  },
  itemDuration: {
    fontSize: 14,
    color: '#E0FBFC',
  },
});

export default ActivitiesScreen;
