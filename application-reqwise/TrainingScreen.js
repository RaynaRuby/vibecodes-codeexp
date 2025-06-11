import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  ScrollView,
  Dimensions,
  SafeAreaView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialIcons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import cprTrainingMod from "./cprTrainingMod";

export default function TrainingScreen() {
  const navigation = useNavigation();

  const modules = [
    {
      id: '1',
      title: 'CPR Training',
      duration: '15 minutes',
      description: 'Learn proper CPR techniques for adults, children and infants',
      image: 'https://api.a0.dev/assets/image?text=CPR+training+first+aid+kit+with+hands+compressing+chest&aspect=1:1&seed=789',
      progress: 0.3,
    },
    {
      id: '2',
      title: 'Guide to Fire Safety',
      duration: '10 minutes',
      description: 'Gain fire fighting skills in case of any emergencies',
      image: 'https://api.a0.dev/assets/image?text=Fire+safety+with+extinguisher+and+person+in+uniform&aspect=1:1&seed=101',
      progress: 0.1,
    },
    {
      id: '3',
      title: 'Wound Care Basics',
      duration: '12 minutes',
      description: 'Essential techniques for wound treatment for adults, children and infants',
      image: 'https://api.a0.dev/assets/image?text=First+aid+bandaging+wound+care+medical+supplies&aspect=1:1&seed=102',
      progress: 0,
    }
  ];

  const games = [
    {
      id: '1',
      title: 'Facts or Cap!',
      description: 'Test your emergency knowledge with true or false questions',
      image: 'https://api.a0.dev/assets/image?text=Quiz+game+true+or+false+emergency+knowledge&aspect=1:1&seed=555',
      questions: 5,
      screenName: 'FactsOrCap'
    },
    {
      id: '2',
      title: 'CPR Quiz',
      description: 'Test your CPR skills with interactive scenarios',
      image: 'https://api.a0.dev/assets/image?text=CPR+quiz+multiple+choice+emergency&aspect=1:1&seed=556',
      questions: 5,
      screenName: 'CPRQuiz'
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

      <ScrollView style={styles.scrollView}>
      
        {/* Quizzes/Games Section */}
        <Text style={styles.pageTitle}>Quizzes/Games</Text>
        
        {games.map(game => (
          <View key={game.id} style={styles.gameCard}>
            <View style={styles.gameContent}>
              <View style={styles.gameTextContent}>
                <Text style={styles.gameTitle}>{game.title}</Text>
                <Text style={styles.gameDescription}>{game.description}</Text>
                <Text style={styles.gameQuestions}>{game.questions} questions</Text>
                
                <TouchableOpacity 
                  style={styles.playButton}
                  onPress={() => navigation.navigate(game.screenName)}
                >
                  <Text style={styles.playButtonText}>Play Now</Text>
                </TouchableOpacity>
              </View>

              <Image 
                source={{ uri: game.image }} 
                style={styles.gameImage}
              />
            </View>
          </View>
        ))}

        {/* Page Title */}
        <Text style={styles.pageTitle}>Training Modules</Text>

        {/* Training Modules */}
        {modules.map(module => (
          <View key={module.id} style={styles.moduleCard}>
            <View style={styles.moduleContent}>
              <View style={styles.moduleTextContent}>
                <Text style={styles.moduleTitle}>{module.title}</Text>
                <Text style={styles.moduleDuration}>Duration: {module.duration}</Text>
                <Text style={styles.moduleDescription}>{module.description}</Text>

                <View style={styles.progressContainer}>
                  <Text style={styles.progressLabel}>Progress</Text>
                  <View style={styles.progressBar}>
                    <View 
                      style={[
                        styles.progressFill, 
                        { width: `${module.progress * 100}%` }
                      ]} 
                    />
                  </View>
                </View>

                <TouchableOpacity 
                  style={styles.startButton}
                  onPress={() => navigation.navigate('cprTrainingMod', { moduleId: module.id })}
                >
                  <Text style={styles.startButtonText}>Start Learning</Text>
                </TouchableOpacity>
              </View>

              <Image 
                source={{ uri: module.image }} 
                style={styles.moduleImage}
              />
            </View>
          </View>
        ))}
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
        
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="school" size={24} color="#4263eb" />
          <Text style={[styles.navText, styles.activeNav]}>Training</Text>
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
    paddingTop: 10,
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
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    paddingHorizontal: 5,
    marginTop: 10,
  },
  moduleCard: {
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
  moduleContent: {
    flexDirection: 'row',
  },
  moduleTextContent: {
    flex: 1,
    marginRight: 10,
  },
  moduleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  moduleDuration: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  moduleDescription: {
    fontSize: 13,
    color: '#444',
    lineHeight: 18,
    marginBottom: 10,
  },
  progressContainer: {
    marginBottom: 12,
  },
  progressLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#e9ecef',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4263eb',
  },
  startButton: {
    backgroundColor: '#4263eb',
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: 'center',
  },
  startButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  moduleImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  gameCard: {
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
  gameContent: {
    flexDirection: 'row',
  },
  gameTextContent: {
    flex: 1,
    marginRight: 10,
  },
  gameTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  gameDescription: {
    fontSize: 13,
    color: '#444',
    lineHeight: 18,
    marginBottom: 5,
  },
  gameQuestions: {
    fontSize: 12,
    color: '#666',
    marginBottom: 10,
  },
  playButton: {
    backgroundColor: '#ff9500',
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: 'center',
    marginTop: 5,
  },
  playButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  gameImage: {
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
});