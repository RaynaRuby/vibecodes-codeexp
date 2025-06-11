import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  ScrollView,
  Dimensions,
  SafeAreaView,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialIcons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';


export default function ARGuideScreen() {
  const navigation = useNavigation();
  const [selectedLocation, setSelectedLocation] = useState(null);

  const locations = [
    {
      id: 'hospital',
      title: 'Nearby Hospitals',
      description: 'Find emergency medical facilities in your area',
      image: 'https://api.a0.dev/assets/image?text=Hospital+Building+Medical+Center&aspect=1:1&seed=801',
      distance: '1.2 km',
    },
    {
      id: 'firstaid',
      title: 'First Aid Stations',
      description: 'Locate first aid kits and emergency equipment',
      image: 'https://api.a0.dev/assets/image?text=First+Aid+Kit+Emergency+Equipment&aspect=1:1&seed=802',
      distance: '0.3 km',
    },
    {
      id: 'shelter',
      title: 'Emergency Shelters',
      description: 'Find safe evacuation locations near you',
      image: 'https://api.a0.dev/assets/image?text=Emergency+Shelter+Safe+Location&aspect=1:1&seed=803',
      distance: '2.5 km',
    }
  ];

  return (
    <SafeAreaView style={styles.container}>

        {/* Header with Logo and Settings */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image 
              source={require('./assets/AppLogov3.png')} 
              style={styles.logo}
            />
            <Text style={styles.logoText}>RESQWISE</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <Ionicons name="settings-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>

        {/* AR Guide Title and Description */}
        <View style={styles.titleContainer}>
          <Text style={styles.pageTitle}>AR Navigation Guide</Text>
          <Text style={styles.pageDescription}>
            Get guided AR navigation to emergency resources nearby
          </Text>
        </View>

        {/* AR Navigation Preview */}
        <View style={styles.mapContainer}>
          <Image 
            source={{ uri: 'https://api.a0.dev/assets/image?text=AR+Navigation+Map+Route+GPS&aspect=16:9&seed=804' }} 
            style={styles.mapPreview}
          />
          <TouchableOpacity 
            style={styles.startNavigationButton}
            onPress={() => Alert.alert("Coming Soon", "This feature is under development. Stay tuned!")}
          >
            <Text style={styles.startNavigationButtonText}>Start Navigation</Text>
          </TouchableOpacity>
        </View>

        {/* Nearby Emergency Resources */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Nearby Emergency Resources</Text>
        
          {locations.map((location) => (

            <TouchableOpacity 
            key={location.id}
            style={styles.locationCard}
            onPress={() => navigation.navigate('LocationDetail', { id: location.id })}
            >
            <View style={styles.locationContent}>
                <Image
                source={{ uri: location.image }}
                style={styles.locationImage}
                />
                <View style={styles.locationTextContent}>
                <Text style={styles.locationTitle}>{location.title}</Text>
                <Text style={styles.locationDescription}>
                    {location.description}
                </Text>
                <View style={styles.distanceContainer}>
                    <MaterialCommunityIcons name="map-marker-distance" size={16} color="#4263eb" />
                    <Text style={styles.distanceText}>{location.distance}</Text>
                </View>
                </View>
            </View>
            </TouchableOpacity>
                
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('Dashboard')}
        >
          <Ionicons name="home" size={24} color="#777" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('FirstAid')}
        >
          <FontAwesome5 name="first-aid" size={24} color="#777" />
          <Text style={styles.navText}>First Aid</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <MaterialCommunityIcons name="navigation-variant" size={24} color="#4263eb" />
          <Text style={[styles.navText, styles.activeNav]}>AR Guide</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('AIWoundAnalyser')}
        >
          <MaterialCommunityIcons name="microscope" size={24} color="#777" />
          <Text style={styles.navText}>AI Analyser</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('Training')}
        >
          <Ionicons name="school-outline" size={24} color="#777" />
          <Text style={styles.navText}>Training</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 15,
    borderBottomColor: '#f0f0f0',
    backgroundColor: 'white',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  logoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4263eb',
    marginLeft: 8,
  },
  titleContainer: {
    marginBottom: 20,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  pageDescription: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
  },
  mapContainer: {
    position: 'relative',
    width: '100%',
    height: width * 0.5,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 24,
  },
  mapPreview: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  startNavigationButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: '#4263eb',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  startNavigationButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  sectionContainer: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  locationCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  locationContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  locationTextContent: {
    flex: 1,
  },
  locationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  locationDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 8,
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  distanceText: {
    fontSize: 14,
    color: '#4263eb',
    fontWeight: '600',
    marginLeft: 4,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
    color: '#777',
  },
  activeNav: {
    color: '#4263eb',
    fontWeight: '500',
  },
});