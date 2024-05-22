import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';  // Import useNavigation

const DashboardScreen = () => {
  const [location, setLocation] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const navigation = useNavigation();  // Use the useNavigation hook

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    })();
  }, []);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <View style={styles.container}>
      {/* Optional Button for Other Actions */}
      <TouchableOpacity style={styles.drawerButton} onPress={toggleMenu}>
        <Ionicons name="menu-outline" size={24} color="black" />
      </TouchableOpacity>
      {location && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{ latitude: location.latitude, longitude: location.longitude }}
            title="Your Location"
            pinColor="blue"
          />
        </MapView>
      )}
      {!location && <Text>Loading...</Text>}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showMenu}
        onRequestClose={() => {
          setShowMenu(!showMenu);
        }}
      >
        <TouchableWithoutFeedback onPress={toggleMenu}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={styles.menuContainer}>
          <TouchableOpacity onPress={toggleMenu} style={styles.menuItem}>
            <Text>Contact Us</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleMenu} style={styles.menuItem}>
            <Text>Policy</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  drawerButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  menuContainer: {
    position: 'absolute',
    top: 50,
    right: 10,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
  },
  menuItem: {
    padding: 10,
  },
});

export default DashboardScreen;
