 import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import * as Location from "expo-location";
import * as Speech from 'expo-speech';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import ENV from "../env";

// Custom Google Map style with darker green road outlines
const customMapStyle = [
  {
    elementType: "geometry",
    stylers: [{ color: "#e6f2e6" }], // Soft light green for general geometry
  },
  {
    elementType: "labels.icon",
    stylers: [{ visibility: "off" }],
  },
  {
    elementType: "labels.text.fill",
    stylers: [{ color: "#2c5f2d" }], // Dark green for text
  },
  {
    elementType: "labels.text.stroke",
    stylers: [{ color: "#ffffff" }], // White stroke for text to improve visibility
  },
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [{ color: "#a8d5a2" }], // Light green for administrative boundaries
  },
  {
    featureType: "administrative.country",
    elementType: "geometry.stroke",
    stylers: [{ color: "#56ab56" }], // Vibrant green for country borders
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#3e7e3c" }], // Dark green for points of interest text
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#81c784" }], // Fresh green for parks
  },
  {
    featureType: "road",
    elementType: "geometry.fill",
    stylers: [{ color: "#d0e8d0" }], // Soft greenish-grey for roads
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#2d6a2d" }], // Darker green for road outlines
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#a1d499" }], // Light green for highways
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#2c5f2d" }], // Dark green for highway outlines
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#84c1c1" }], // Muted teal for water bodies
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [{ color: "#a1d1a1" }], // Light green for transit lines
  },
  {
    featureType: "landscape",
    elementType: "geometry.fill",
    stylers: [{ color: "#d6e9c6" }], // Fresh green for landscape
  },
  {
    featureType: "poi.business",
    elementType: "geometry",
    stylers: [{ color: "#b1e0b1" }], // Soft green for business areas
  },
];


const DashboardScreen = () => {
  const [location, setLocation] = useState(null);
  const [locationName, setLocationName] = useState(""); // To store the place name
  const [markerCoords, setMarkerCoords] = useState(null); // To track marker coordinates
  const [drawerVisible, setDrawerVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    let locationSubscription;

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }

      // Get high-accuracy location updates
      locationSubscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.Highest,  // Ensure highest accuracy
          distanceInterval: 1, // Update location after moving 1 meter
          timeInterval: 5000,  // Update every 5 seconds
        },
        (loc) => {
          setLocation(loc.coords);
          setMarkerCoords(loc.coords); // Set initial marker position to current location
          reverseGeocodeAndSpeak(loc.coords);  // Get the place name and speak the location
        }
      );
    })();

    // Cleanup subscription on component unmount
    return () => {
      if (locationSubscription) {
        locationSubscription.remove();
      }
    };
  }, []);

  // Function to reverse geocode and get the name of the location
  const reverseGeocodeAndSpeak = async (coords) => {
    try {
      const address = await Location.reverseGeocodeAsync({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
      if (address.length > 0) {
        const { name, city, region } = address[0];
        const placeName = name ? name : `${city}, ${region}`;
        setLocationName(placeName);

        // Speak the location name using Text-to-Speech
      //   if (placeName) {
      //     Speech.speak(`You are now at ${placeName}`);
      //   }
      }
    } catch (error) {
      console.error("Error getting location name:", error);
    }
  };

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  const handleMapPress = (event) => {
    const coords = event.nativeEvent.coordinate;
    setMarkerCoords(coords); // Move marker to new location
    reverseGeocodeAndSpeak(coords); // Get the location name and speak the new location
  };

  const handleNavigation = (screen) => {
    closeDrawer();
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      {/* Hamburger Menu Button */}
      <TouchableOpacity style={styles.drawerButton} onPress={toggleDrawer}>
        <Ionicons name="menu-outline" size={30} color="white" />
      </TouchableOpacity>

      {/* Map Display */}
      {location ? (
        <MapView
          style={styles.map}
          provider="google"
          customMapStyle={customMapStyle}  // Apply custom map style
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.005, // Zoom in for better precision
            longitudeDelta: 0.005,
          }}
          showsUserLocation={true} // Show default user location marker
          loadingEnabled={true} // Show loading indicator while map is loading
          onPress={handleMapPress} // Capture map presses to move marker
        >
          {/* Show marker if coordinates are set */}
          {markerCoords && (
            <Marker
              coordinate={markerCoords}
              pinColor="red"
            >
              {/* Callout shows when marker is clicked */}
              <Callout>
                <View style={styles.callout}>
                  <Text style={styles.calloutTitle}>{locationName}</Text>
                </View>
              </Callout>
            </Marker>
          )}
        </MapView>
      ) : (
        <Text style={styles.loadingText}>Fetching your location...</Text>
      )}

      {/* Bottom Navigation Components */}
      <ScrollView
        style={styles.bottomDrawer}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="map-outline" size={24} color="black" />
          <Text style={styles.navText}>Map</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="compass-outline" size={24} color="black" />
          <Text style={styles.navText}>Discover</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="heart-outline" size={24} color="black" />
          <Text style={styles.navText}>Saved</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('EventsScreen')}
        >
          <Ionicons name="calendar-outline" size={24} color="black" />
          <Text style={styles.navText}>Events</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Custom Drawer */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={drawerVisible}
        onRequestClose={toggleDrawer}
      >
        <View style={styles.modalContainer}>
          <View style={styles.drawer}>
            <TouchableOpacity onPress={closeDrawer} style={styles.closeButton}>
              <Ionicons name="close-outline" size={30} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleNavigation("Dashboard")}
              style={styles.drawerItem}
            >
              <Ionicons name="map-outline" size={24} color="white" />
              <Text style={styles.drawerText}>Dashboard</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleNavigation("ActivitiesScreen")}
              style={styles.drawerItem}
            >
              <Ionicons name="walk-outline" size={24} color="white" />
              <Text style={styles.drawerText}>Activities</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleNavigation("CommunityFeedbackScreen")}
              style={styles.drawerItem}
            >
              <Ionicons name="people-outline" size={24} color="white" />
              <Text style={styles.drawerText}>Community Feedback</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleNavigation("TrailReportsScreen")}
              style={styles.drawerItem}
            >
              <Ionicons name="alert-circle-outline" size={24} color="white" />
              <Text style={styles.drawerText}>Trail Reports</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleNavigation("Eventcreat")}
              style={styles.drawerItem}
            >
              <Ionicons name="calendar-outline" size={24} color="white" />
              <Text style={styles.drawerText}>Create Events</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleNavigation("BadgesScreen")}
              style={styles.drawerItem}
            >
              <Ionicons name="trophy-outline" size={24} color="white" />
              <Text style={styles.drawerText}>Badges & Contests</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleNavigation("UserProfile")}
              style={styles.drawerItem}
            >
              <Ionicons name="person-outline" size={24} color="white" />
              <Text style={styles.drawerText}>Account</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleNavigation("Settings")}
              style={styles.drawerItem}
            >
              <Ionicons name="settings-outline" size={24} color="white" />
              <Text style={styles.drawerText}>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleNavigation("Login")}
              style={styles.drawerItem}
            >
              <Ionicons name="log-out-outline" size={24} color="white" />
              <Text style={styles.drawerText}>Logout</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleNavigation("EmergencyScreen")}
              style={styles.emergencyButton}
            >
              <Ionicons name="alert-circle-outline" size={24} color="white" />
              <Text style={styles.emergencyButtonText}>Emergency Info</Text>
            </TouchableOpacity>
          </View>
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
    flex: 1,
  },
  drawerButton: {
    position: "absolute",
    top: 15,
    left: 16,
    zIndex: 1,
    backgroundColor: "#2d6a2d",
    padding: 10,
    borderRadius: 50,
  },
  callout: {
    flexDirection: "column",
    alignItems: "center",
    padding: 10,
    width: 150, // Increase width to accommodate longer text
  },
  calloutTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
    textAlign: "center",  // Center the text
  },
  loadingText: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 18,
    color: "black",
  },
  bottomDrawer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#2d6a2d",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 10,
  },
  scrollViewContent: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  navButton: {
    alignItems: "center",
    paddingHorizontal: 20,
   
    
  },
  navText: {
    marginTop: 5,
    color: "white",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  drawer: {
    flex: 1,
    backgroundColor: "rgba(2, 43, 66, 0.5)",
    paddingTop: 20,
    paddingLeft: 20,
  },
  closeButton: {
    marginBottom: 20,
  },
  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
  },
  drawerText: {
    color: "white",
    marginLeft: 20,
    fontSize: 18,
  },
  emergencyButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    width: "70%",
  },
  emergencyButtonText: {
    color: "white",
    marginLeft: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default DashboardScreen;
