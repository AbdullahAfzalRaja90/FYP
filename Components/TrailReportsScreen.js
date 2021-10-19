import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const trailReportsData = [
  { id: '1', trailName: 'Mountain Trail', condition: 'Good', report: 'Trail is clear and well-marked.', icon: 'trail-sign-outline' },
  { id: '2', trailName: 'Forest Path', condition: 'Muddy', report: 'Recent rains have made the path muddy.', icon: 'water-outline' },
  { id: '3', trailName: 'River Walk', condition: 'Closed', report: 'Trail is closed due to maintenance.', icon: 'close-circle-outline' },
];

const renderTrailReportItem = ({ item }) => (
  <View style={styles.trailReportItem}>
    <Ionicons name={item.icon} size={40} color="#FDD387" style={styles.icon} />
    <View style={styles.textContainer}>
      <Text style={styles.trailName}>{item.trailName}</Text>
      <Text style={styles.trailCondition}>Condition: {item.condition}</Text>
      <Text style={styles.trailReport}>{item.report}</Text>
    </View>
  </View>
);

const TrailReportsScreen = () => {
  return (
    <LinearGradient
      colors={['#022B42', '#005F73']}
      style={styles.container}
    >
      <Text style={styles.title}>Trail Reports</Text>
      <Text style={styles.description}>
        Stay informed about trail conditions. Check out the latest reports and share your own findings with the community.
      </Text>
      <FlatList
        data={trailReportsData}
        renderItem={renderTrailReportItem}
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
  trailReportItem: {
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
  trailName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  trailCondition: {
    fontSize: 14,
    color: '#E0FBFC',
  },
  trailReport: {
    fontSize: 14,
    color: '#E0FBFC',
  },
});

export default TrailReportsScreen;
