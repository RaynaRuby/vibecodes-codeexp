import React, { useState, useEffect } from 'react';
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
import { AntDesign } from '@expo/vector-icons';

export default function CPRQuizScreen() {
  const navigation = useNavigation();
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  
  // Quiz questions data
  const questions = [
    {
      id: 1,
      type: 'roleplay',
      scenario: 'What is the first thing you should do when someone collapses',
      options: [
        { id: 'check', text: 'Start chest compressions', isCorrect: true },
        { id: 'walk', text: 'Check for responsiveness', isCorrect: false }
      ],
      correctFeedback: 'Great! Always check if the person is responsive first.',
      incorrectFeedback: 'The correct first step is to check if the person is responsive before doing anything else.'
    },
    {
      id: 2,
      type: 'roleplay',
      scenario: 'What number should you call in an emergency in',
      options: [
        { id: 'check', text: '995', isCorrect: true },
        { id: 'walk', text: '911', isCorrect: false }
      ],
      correctFeedback: 'That’s right! 995 connects you to emergency medical services in Singapore.',
      incorrectFeedback: 'The correct number is 995 for medical emergencies in Singapore.'
    },
    {
      id: 3,
      type: 'roleplay',
      scenario: 'What is the correct hand position for chest compressions?',
      options: [
        { id: 'check', text: 'Both hands in the center of the chest', isCorrect: true },
        { id: 'walk', text: 'One hand on each side of the chest', isCorrect: false }
      ],
      correctFeedback: 'Yes! Place both hands on the center of the chest.',
      incorrectFeedback: 'You should place both hands in the center of the chest, not on the sides.'
    },
    {
      id: 4,
      type: 'roleplay',
      scenario: 'How deep should you press during adult chest compressions?',
      options: [
        { id: 'check', text: 'About 5 to 6 cm', isCorrect: true },
        { id: 'walk', text: 'Just 2 cm', isCorrect: false }
      ],
      correctFeedback: ' Well done! 5 to 6 cm is the recommended depth for adults.',
      incorrectFeedback: 'Chest compressions should go 5 to 6 cm deep for adults.'
    },
    {
      id: 5,
      type: 'roleplay',
      scenario: 'What’s the recommended rate of chest compressions per minute?',
      options: [
        { id: 'check', text: '100–120', isCorrect: true },
        { id: 'walk', text: '60–80', isCorrect: false }
      ],
      correctFeedback: ' Nice! 100 to 120 compressions per minute is ideal.',
      incorrectFeedback: 'The correct rate is 100 to 120 compressions per minute.'
    },
  ];

  // Get current question data
  const currentQuestionData = questions[currentQuestion];

  // Handle answer selection
  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    
    let isCorrect = false;
    let feedbackText = '';
    
    if (currentQuestionData.type === 'factorcap') {
      isCorrect = answer === currentQuestionData.correctAnswer;
      feedbackText = isCorrect ? currentQuestionData.correctFeedback : currentQuestionData.incorrectFeedback;
    } else {
      // For roleplay questions
      const selectedOption = currentQuestionData.options.find(option => option.id === answer);
      isCorrect = selectedOption.isCorrect;
      feedbackText = isCorrect ? currentQuestionData.correctFeedback : currentQuestionData.incorrectFeedback;
    }
    
    // Update score
    if (isCorrect) {
      setScore(score + 5);
      setFeedback({
        text: "That's Correct!",
        points: "+5 points",
        explanation: feedbackText,
        isCorrect: true
      });
    } else {
      setScore(Math.max(0, score - 3)); // Ensure score doesn't go below 0
      setFeedback({
        text: "That's Incorrect!",
        points: "-3 points",
        explanation: feedbackText,
        isCorrect: false
      });
    }
    
    setShowFeedback(true);
  };
  
  // Handle moving to next question
  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      // Quiz completed
      setQuizCompleted(true);
    }
  };

  // Component for the progress bar
  const ProgressBar = ({ current, total }) => {
    const progressWidth = (current / total) * 100;
    
    return (
      <View style={styles.progressBarContainer}>
        {Array.from({ length: total }).map((_, index) => (
          <View 
            key={index} 
            style={[
              styles.progressSegment, 
              index <= current ? styles.progressSegmentFilled : styles.progressSegmentEmpty
            ]} 
          />
        ))}
      </View>
    );
  };
  
  // RolePlay question component
  const RolePlayQuestion = ({ data }) => (
    <View style={styles.questionContent}>
      <View style={styles.scenarioHeader}>
        <Text style={styles.scenarioText}>{data.scenario}</Text>
      </View>
      
      <Image 
        source={{ uri: 'https://api.a0.dev/assets/image?text=First+aid+emergency+situation+person+collapsed&aspect=16:9&seed=123' }} 
        style={styles.scenarioImage}
      />
      
      <View style={styles.optionsContainer}>
        {data.options.map(option => (
          <TouchableOpacity 
            key={option.id}
            style={[
              styles.optionButton,
              selectedAnswer === option.id && option.isCorrect && showFeedback && styles.correctOptionButton,
              selectedAnswer === option.id && !option.isCorrect && showFeedback && styles.wrongOptionButton,
            ]}
            onPress={() => handleAnswer(option.id)}
            disabled={showFeedback}
          >
            <Text style={styles.optionText}>{option.text}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
  
  // Facts or Cap question component
  const FactOrCapQuestion = ({ data }) => (
    <View style={styles.questionContent}>
      <View style={styles.factCapHeader}>
        <Text style={styles.questionTag}>❓ Question:</Text>
        <Text style={styles.factCapText}>"{data.statement}"</Text>
      </View>
      
      <View style={styles.optionsContainer}>
        <TouchableOpacity 
          style={[
            styles.factCapButton,
            selectedAnswer === 'fact' && data.correctAnswer === 'fact' && showFeedback && styles.correctOptionButton,
            selectedAnswer === 'fact' && data.correctAnswer !== 'fact' && showFeedback && styles.wrongOptionButton,
          ]}
          onPress={() => handleAnswer('fact')}
          disabled={showFeedback}
        >
          <AntDesign name="checkcircle" size={16} color="#4caf50" style={styles.factCapIcon} />
          <Text style={styles.factCapButtonText}>Fact</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.factCapButton,
            selectedAnswer === 'cap' && data.correctAnswer === 'cap' && showFeedback && styles.correctOptionButton,
            selectedAnswer === 'cap' && data.correctAnswer !== 'cap' && showFeedback && styles.wrongOptionButton,
          ]}
          onPress={() => handleAnswer('cap')}
          disabled={showFeedback}
        >
          <AntDesign name="closecircle" size={16} color="#f44336" style={styles.factCapIcon} />
          <Text style={styles.factCapButtonText}>Cap (Not true)</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Results screen shown after completing all questions
  const ResultsScreen = () => (
    <View style={styles.resultsContainer}>
      <Text style={styles.resultsTitle}>Quiz Completed!</Text>
      
      <View style={styles.scoreCircle}>
        <Text style={styles.scoreText}>{score}</Text>
        <Text style={styles.scoreLabel}>points</Text>
      </View>
      
      <Text style={styles.resultsSummary}>
        You've completed all 5 questions in the Facts or Cap quiz!
      </Text>
      
      <TouchableOpacity 
        style={styles.playAgainButton}
        onPress={() => {
          setCurrentQuestion(0);
          setScore(0);
          setSelectedAnswer(null);
          setShowFeedback(false);
          setQuizCompleted(false);
        }}
      >
        <Text style={styles.playAgainButtonText}>Play Again</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.backToTrainingButton}
        onPress={() => navigation.navigate('Training')}
      >
        <Text style={styles.backToTrainingText}>Back to Training</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>

      {/* Header with Logo and Settings */}
        <View style={styles.header}>
            <View style={styles.headerLeft}>
            <Image 
                source={{ uri: 'https://api.a0.dev/assets/image?text=ResqWise+Logo+ECG+Heart+Line&aspect=1:1&seed=123' }} 
                style={styles.logo}
            />
            <Text style={styles.logoText}>RESQWISE</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <Ionicons name="settings-outline" size={24} color="#333" />
            </TouchableOpacity>
        </View>
      <ScrollView style={styles.scrollView}>

        {/* Game Header */}
        <View style={styles.gameHeaderContainer}>
          <View style={styles.gameHeader}>
            <Text style={styles.gameTitle}>CPR Quiz!</Text>
            <View style={styles.fireEmoji}>
              <Text style={styles.emojiText}>🔥</Text>
            </View>
          </View>
          <Text style={styles.gameProgress}>Question {currentQuestion + 1} of {questions.length}</Text>
          
          {/* Progress Bar */}
          <ProgressBar current={currentQuestion} total={questions.length} />
        </View>

        {!quizCompleted ? (
          <>
            {/* Question Content */}
            <View style={styles.questionCard}>
              {currentQuestionData.type === 'roleplay' ? (
                <RolePlayQuestion data={currentQuestionData} />
              ) : (
                <FactOrCapQuestion data={currentQuestionData} />
              )}
            </View>
            
            {/* Feedback card (shown after selection) */}
            {showFeedback && feedback && (
              <View style={[
                styles.feedbackCard,
                feedback.isCorrect ? styles.correctFeedbackCard : styles.incorrectFeedbackCard
              ]}>
                <Text style={styles.feedbackTitle}>{feedback.text}</Text>
                <Text style={styles.feedbackPoints}>{feedback.points}</Text>
                <Text style={styles.feedbackExplanation}>{feedback.explanation}</Text>
                
                <TouchableOpacity 
                  style={styles.nextButton}
                  onPress={handleNextQuestion}
                >
                  <Text style={styles.nextButtonText}>Next Question</Text>
                  <MaterialIcons name="navigate-next" size={20} color="#fff" />
                </TouchableOpacity>
              </View>
            )}
          </>
        ) : (
          <ResultsScreen />
        )}

        {!quizCompleted && !showFeedback && (
          <View style={styles.helperContainer}>
            <Text style={styles.helperText}>Select an answer to continue</Text>
          </View>
        )}
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
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('Training')}
        >
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
    paddingTop: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 15,
    borderBottomColor: '#f0f0f0',
    backgroundColor: 'white',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  logoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4263eb',
    marginLeft: 8,
  },
  gameHeaderContainer: {
    marginBottom: 20,
  },
  gameHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  gameTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  fireEmoji: {
    marginLeft: 8,
  },
  emojiText: {
    fontSize: 24,
  },
  gameProgress: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  progressBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  progressSegment: {
    flex: 1,
    height: 8,
    marginHorizontal: 2,
    borderRadius: 4,
  },
  progressSegmentFilled: {
    backgroundColor: '#4263eb',
  },
  progressSegmentEmpty: {
    backgroundColor: '#e0e0e0',
  },
  questionCard: {
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
  questionContent: {
    width: '100%',
  },
  scenarioHeader: {
    backgroundColor: '#b3c2ff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  scenarioText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    color: '#111',
  },
  scenarioImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
    resizeMode: 'cover',
  },
  factCapHeader: {
    backgroundColor: '#b3c2ff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  questionTag: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#111',
  },
  factCapText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111',
  },
  optionsContainer: {
    marginVertical: 8,
  },
  optionButton: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  factCapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  factCapIcon: {
    marginRight: 10,
  },
  factCapButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  correctOptionButton: {
    backgroundColor: '#e8f5e9',
    borderColor: '#4caf50',
  },
  wrongOptionButton: {
    backgroundColor: '#ffebee',
    borderColor: '#f44336',
  },
  feedbackCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  correctFeedbackCard: {
    backgroundColor: '#e8f5e9',
  },
  incorrectFeedbackCard: {
    backgroundColor: '#ffebee',
  },
  feedbackTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  feedbackPoints: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  feedbackExplanation: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  nextButton: {
    backgroundColor: '#4263eb',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 4,
  },
  helperContainer: {
    marginBottom: 30,
  },
  helperText: {
    textAlign: 'center',
    color: '#777',
    fontSize: 14,
  },
  resultsContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    marginBottom: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  resultsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#4263eb',
  },
  scoreCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#4263eb',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  scoreText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  scoreLabel: {
    fontSize: 16,
    color: '#ffffff',
  },
  resultsSummary: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
    color: '#333',
  },
  playAgainButton: {
    backgroundColor: '#4263eb',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 12,
    width: '100%',
    alignItems: 'center',
  },
  playAgainButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  backToTrainingButton: {
    backgroundColor: '#f5f6fa',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  backToTrainingText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '500',
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