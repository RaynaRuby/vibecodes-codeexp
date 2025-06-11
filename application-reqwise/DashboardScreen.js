import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  ScrollView,
  Dimensions 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialIcons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DashboardScreen() {
  const navigation = useNavigation();
  const [contacts, setContacts] = useState([
    { id: '1', name: 'Mom', phone: '+65 9234 5678' },
    { id: '2', name: 'Dad', phone: '+65 8765 4321' },
  ]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Logo */}
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
      <ScrollView style={styles.scrollView}>

        {/* Emergency Assistance Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Emergency Assistance</Text>
          
          <TouchableOpacity 
            style={[styles.emergencyButton, { backgroundColor: '#f44336' }]}
            onPress={() => navigation.navigate('FirstAid')}
          >
            <FontAwesome5 name="first-aid" size={24} color="white" />
            <Text style={styles.emergencyButtonText}>Locate First Aid</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.emergencyButton, { backgroundColor: '#2196f3' }]}
            onPress={() => navigation.navigate('Hospitals')}
          >
            <FontAwesome5 name="hospital" size={24} color="white" />
            <Text style={styles.emergencyButtonText}>Nearby Hospitals</Text>
          </TouchableOpacity>
        </View>

        {/* Information Card */}
        <View style={styles.card}>
          <Text style={styles.cardInfoTitle}>Discover how to react in critical situations!</Text>
          <Text style={styles.cardInfoSubtitle}>
            Explore our interactive modules to learn crucial responses to critical cases.
          </Text>
          
          <TouchableOpacity 
            style={styles.learningButton}
            onPress={() => navigation.navigate('Training')}
          >
            <Text style={styles.learningButtonText}>Start Learning</Text>
          </TouchableOpacity>
        </View>

        {/* Emergency Contacts */}
        <View style={styles.card}>
          <View style={styles.contactsHeader}>
            <Text style={styles.cardTitle}>My Emergency Contacts</Text>
            <TouchableOpacity onPress={() => navigation.navigate('AddContact')}>
              <Ionicons name="add-circle" size={28} color="#4263eb" />
            </TouchableOpacity>
          </View>
          
          {contacts.map(contact => (
            <View key={contact.id} style={styles.contactItem}>
              <View style={styles.contactIcon}>
                <Text style={styles.contactInitial}>{contact.name[0]}</Text>
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactName}>{contact.name}</Text>
                <Text style={styles.contactPhone}>{contact.phone}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={24} color="#4263eb" />
          <Text style={[styles.navText, styles.activeNav]}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('FirstAid')}
        >
          <FontAwesome5 name="first-aid" size={24} color="#777" />
          <Text style={styles.navText}>First Aid</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('ARGuide')}
        >
          <MaterialCommunityIcons name="navigation-variant" size={24} color="#777" />
          <Text style={styles.navText}>AR Guide</Text>
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
  card: {
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
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  emergencyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 12,
  },
  emergencyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  cardInfoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardInfoSubtitle: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 16,
  },
  learningButton: {
    backgroundColor: '#f0f2ff',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  learningButtonText: {
    color: '#4263eb',
    fontWeight: '600',
  },
  contactsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  contactIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#e9ecef',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  contactInitial: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#495057',
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 15,
    fontWeight: '500',
  },
  contactPhone: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
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