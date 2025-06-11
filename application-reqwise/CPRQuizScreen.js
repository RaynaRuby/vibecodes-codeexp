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
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

export default function CPRQuizScreen() {
  const navigation = useNavigation();
  const [currentStep, setCurrentStep] = useState(1);
  const [voiceInstructions, setVoiceInstructions] = useState(true);

  // Steps data
  const steps = [
    {
      id: 1,
      title: 'Check responsiveness',
      description: 'Tap the person\'s shoulder and ask loudly, "Are you OK?" to check for responsiveness',
      image: 'https://api.a0.dev/assets/image?text=CPR+checking+responsiveness+medical+emergency&aspect=1:1&seed=789',
    },
    {
      id: 2,
      title: 'Call for help',
      description: 'If the person is unresponsive, call emergency services immediately or ask someone else to call',
      image: 'https://api.a0.dev/assets/image?text=Calling+emergency+911+for+help&aspect=1:1&seed=790',
    },
    {
      id: 3,
      title: 'Check breathing',
      description: 'Look, listen, and feel for breathing for no more than 10 seconds',
      image: 'https://api.a0.dev/assets/image?text=Check+breathing+CPR+procedure&aspect=1:1&seed=791',
    },
  ];

  const currentStepData = steps.find(step => step.id === currentStep);

  const toggleVoiceInstructions = () => {
    setVoiceInstructions(!voiceInstructions);
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      {/* Header with close button */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>CPR</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="close" size={28} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Voice Instructions Toggle */}
      <View style={styles.voiceToggleContainer}>
        <Ionicons 
          name={voiceInstructions ? "volume-high" : "volume-mute"} 
          size={20} 
          color={voiceInstructions ? "#333" : "#999"} 
        />
        <Text style={styles.voiceToggleText}>
          Voice instructions: {voiceInstructions ? 'ON' : 'OFF'}
        </Text>
        <TouchableOpacity onPress={toggleVoiceInstructions}>
          <View style={[
            styles.toggleSwitch,
            voiceInstructions ? styles.toggleSwitchOn : styles.toggleSwitchOff
          ]}>
            <View style={[
              styles.toggleButton,
              voiceInstructions ? styles.toggleButtonOn : styles.toggleButtonOff
            ]} />
          </View>
        </TouchableOpacity>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[styles.progressFill, { width: `${(currentStep / steps.length) * 100}%` }]} 
          />
        </View>
      </View>

      <ScrollView style={styles.contentScrollView}>
        {/* Step Title */}
        <View style={styles.stepTitleContainer}>
          <Text style={styles.stepNumber}>Step {currentStep}: {currentStepData.title}</Text>
          <Text style={styles.stepDetailText}>{`Step ${currentStep}: ${currentStepData.title}`}</Text>
        </View>

        {/* Step Image */}
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: currentStepData.image }} 
            style={styles.stepImage}
          />
          
          {/* Video Controls Overlay */}
          <View style={styles.videoControls}>
            <TouchableOpacity style={styles.playButton}>
              <Ionicons name="play" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Step Description */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>{currentStepData.description}</Text>
        </View>

        {/* Navigation Buttons */}
        <View style={styles.navigationButtons}>
          <TouchableOpacity 
            style={[styles.navButton, styles.backButton]}
            onPress={handleBack}
          >
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.navButton, styles.nextButton]}
            onPress={handleNext}
          >
            <Text style={styles.nextButtonText}>Next</Text>
            <Ionicons name="chevron-forward" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  header: {
    backgroundColor: '#f44336',
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  voiceToggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'white',
  },
  voiceToggleText: {
    flex: 1,
    marginLeft: 8,
    fontSize: 15,
    color: '#333',
  },
  toggleSwitch: {
    width: 46,
    height: 24,
    borderRadius: 12,
    padding: 2,
  },
  toggleSwitchOn: {
    backgroundColor: '#4caf50',
  },
  toggleSwitchOff: {
    backgroundColor: '#e0e0e0',
  },
  toggleButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  toggleButtonOn: {
    marginLeft: 20,
  },
  toggleButtonOff: {
    marginLeft: 0,
  },
  progressContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#e9ecef',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4caf50',
  },
  contentScrollView: {
    flex: 1,
  },
  stepTitleContainer: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  stepNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  stepDetailText: {
    color: '#666',
    fontSize: 14,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: width * 0.7, // Aspect ratio for the image container
  },
  stepImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  videoControls: {
    position: 'absolute',
    bottom: 15,
    right: 15,
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  descriptionContainer: {
    padding: 20,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  navButton: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 100,
  },
  backButton: {
    backgroundColor: '#f0f2ff',
    borderWidth: 1,
    borderColor: '#4263eb',
  },
  nextButton: {
    backgroundColor: '#4263eb',
  },
  backButtonText: {
    color: '#4263eb',
    fontSize: 16,
    fontWeight: '600',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 4,
  },
});