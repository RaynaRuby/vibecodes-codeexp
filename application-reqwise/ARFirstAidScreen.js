import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  ScrollView,
  Dimensions,
  Modal,
  SafeAreaView,
  StatusBar,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';


export default function ARFirstAidScreen() {

    const navigation = useNavigation();
    const [isModalVisible, setModalVisible] = useState(false);

    return(
        <>  
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

                    <ScrollView style={styles.scrollView}>
                        
        {/*-----------------------------------------------------------*/}
                        <SafeAreaView>
                            <View style={styles.titleContainer}>
                                <Text style={styles.pageTitle}>First Aid Assistant</Text>
                                <Text style={styles.pageDescription}>
                                    Take a photo of your wound and get instant, first aid recommendations.
                                </Text>
                            </View>

                            <View style={styles.cameraContainer}>
                                <Image 
                                    source={{ uri: 'https://api.a0.dev/assets/image?text=First+Aid+Kit+Red+Cross+Medical+Supplies&aspect=16:9&seed=904' }} 
                                    style={styles.cameraPreview}
                                />
                                <TouchableOpacity 
                                    style={styles.startGuideButton}
                                    onPress={() => navigation.navigate('AIWoundAnalyser')}
                                >
                                    <Text style={styles.startGuideButtonText}>Start Guide</Text>
                                </TouchableOpacity>
                            </View>

                            {/* Procedures Section */}
                            <View style={styles.sectionContainer}>
                                <Text style={styles.pageTitle}>First Aid Responses</Text>
                                <Text style={styles.sectionTitle}>Select a Procedure</Text>

                                <TouchableOpacity style={styles.procedureCard} onPress={() => setModalVisible(true)}>
                                    <Text style={styles.procedureTitle}>CPR</Text>
                                    <Text style={styles.procedureDescription}>Learn proper chest compression technique and rescue breathing</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.procedureCard}>
                                    <Text style={styles.procedureTitle}>Choking</Text>
                                    <Text style={styles.procedureDescription}>Learn the Heimlich maneuver and other techniques.</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.procedureCard}>
                                    <Text style={styles.procedureTitle}>Burns</Text>
                                    <Text style={styles.procedureDescription}>Learn how to treat different degrees of burns safely.</Text>
                                </TouchableOpacity>
                            </View>
                        </SafeAreaView>
                    </ScrollView>

        {/*-----------------------------------------------------------*/}



        {/*-----------------------------------------------------------*/}
                    <View style={styles.bottomNav}>
                        <TouchableOpacity 
                            style={styles.navItem}
                            onPress={() => navigation.navigate('Dashboard')}
                        >
                            <Ionicons name="home" size={24} color="#777" />
                            <Text style={styles.navText}>Home</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity style={styles.navItem}>
                            <FontAwesome5 name="first-aid" size={24} color="#4263eb" />
                            <Text style={[styles.navText, styles.activeNav]}>First Aid</Text>
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

            <Modal animationType="slide" transparent={true} visible={isModalVisible} onRequestClose={() => setModalVisible(false)}>
                <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <View style={styles.modalHeader}>
                                <Text style={styles.modalTitle}>CPR Procedure</Text>
                        
                                <TouchableOpacity style={styles.modalCloseIcon} onPress={() => setModalVisible(false)}>
                                    <Text style={styles.closeIconText}>X</Text>
                                </TouchableOpacity>
                            </View>
                                
                            <ScrollView>
                                <View style={styles.ModalProcedureCard}>
                                    <Text style={styles.modalProcCardHeaderTitle}>Step 1: Check Responsiveness</Text>
                                    <Text style={styles.modalProcCardSubTitle}>Tap the person's shoulder and ask loudly, "Are you OK?" to check for responsiveness</Text>
                                </View>
                                <View style={styles.ModalProcedureCard}>
                                    <Text style={styles.modalProcCardHeaderTitle}>Step 2: Call for help</Text>
                                    <Text style={styles.modalProcCardSubTitle}>If the person is unresponsive, call emergency services or ask someone else to call</Text>
                                </View>
                                <View style={styles.ModalProcedureCard}>
                                    <Text style={styles.modalProcCardHeaderTitle}>Step 3: Check breathing</Text>
                                    <Text style={styles.modalProcCardSubTitle}>Look, Listen, and feel for breathing for no more than 10 seconds</Text>
                                </View>
                            </ScrollView>
                            
                        </View>
                </View>
            </Modal>
        </>
    )
    


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
  cameraContainer: {
    position: 'relative',
    width: '100%',
    height: width * 0.5,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 24,
  },
  cameraPreview: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  startGuideButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: '#4263eb',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  startGuideButtonText: {
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
  procedureCard: {
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
  procedureContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  procedureTextContent: {
    flex: 1,
    paddingRight: 16,
  },
  procedureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  procedureDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  procedureImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
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
  // Modal Styles

modalContainer: {
  backgroundColor: 'transparent',
  flex: 1,
  justifyContent: 'flex-end',
  backgroundColor: 'rgba(0,0,0,0.4)', // Dimmed background

},

modalContent: {
  backgroundColor: 'white',
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  paddingBottom: 20,
  maxHeight: '80%', 
  minHeight: '80%', 
},

modalHeader: {
  backgroundColor: '#e53935', // Red header
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingHorizontal: 15,
  paddingVertical: 12,
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
},

modalTitle: {
  color: '#fff',
  fontSize: 18,
  fontWeight: 'bold',
},

modalCloseIcon: {
  padding: 4,
},

closeIconText: {
  color: '#fff',
  fontSize: 22,
  fontWeight: 'bold',
},

modalDescription: {
  padding: 16,
  paddingBottom: 800,
  fontSize: 16,
  color: '#333',
  lineHeight: 22,
},

ModalProcedureCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 10,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },

modalProcCardHeaderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },

modalProcCardSubTitle: {
    fontSize: 16,
    color: '#444',
    marginBottom: 16,
  },
});