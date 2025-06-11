// LocationDetailScreen.js
import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


const locationData = {
  hospital: {
    title: 'Nearby Hospitals',
    description: 'Hospitals around your area offering 24/7 emergency care.\n\n1. Beacon Medical Clinic - 2.9 KM\n2. Raffles Hospital - 3.1 KM\n3. Singapore General Hospital - 3.3 KM',
    mapUrl: 'https://www.google.com/maps/d/u/0/embed?mid=1Kzxbz20HUhjmvs8NCJ2j6wdkXlzbL8k&ehbc=2E312F&noprof=1',
  },
  firstaid: {
    title: 'First Aid Stations',
    description: 'Nearest 3 AED Stations from current location\n\nLess than 500m\n: 1. Near HEYTEA @ Marina Bay Sands\n2. Level 3 MICE (Near Room 3513)\n3. Near CHANEL Store',
    mapUrl: 'https://www.google.com/maps/d/u/0/embed?mid=1UfmxohCS82aNBnA9_6bRZMX5C14wLbY&ehbc=2E312F&noprof=1',
  },
  shelter: {
    title: 'Emergency Shelters',
    description: 'Find the nearest shelters available during emergencies.\n\n1. Marina Bay MRT - 1.0 KM\n2. Raffles Place MRT - 1.9 KM\n3. Gardens by the Bay MRT - 2.5 KM',
    mapUrl: 'https://www.google.com/maps/d/u/0/embed?mid=1lmT-siIhUVq-Op5rFU0is-loPakztVU&ehbc=2E312F&noprof=1',
  },
};

export default function LocationDetailScreen({ route }) {
  const { id } = route.params;
  const location = locationData[id];
  const navigation = useNavigation();

  if (!location) return <Text>Invalid location selected.</Text>;

  return (
    <View style={styles.container}>
      {/* Close Button */}
      <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
        <Ionicons name="close" size={28} color="#333" />
      </TouchableOpacity>

      {/* Title and Description */}
      <Text style={styles.title}>{location.title}</Text>
      <Text style={styles.description}>{location.description}</Text>

      {/* Embedded Google Map */}
      <WebView 
        source={{ uri: location.mapUrl }}
        style={styles.map}
      />
    </View>
  );
}

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff'
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 10,
    padding: 8,
    backgroundColor: '#eee',
    borderRadius: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginBottom: 16
  },
  map: {
    flex: 1,
    width: width - 32,
    height: height * 0.5,
    borderRadius: 12,
    overflow: 'hidden'
  }
});
