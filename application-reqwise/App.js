import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, CardStyleInterpolators } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from "react-native-safe-area-context"
import { Toaster } from 'sonner-native';
import OnboardingScreen from "./HomeScreen";
import DashboardScreen from "./DashboardScreen";
import TrainingScreen from "./TrainingScreen";
import FactsOrCapScreen from "./FactsOrCapScreen";
import CPRQuizScreen from "./CPRQuizScreen";
import ARFirstAidScreen from "./ARFirstAidScreen";
import ARGuideScreen from "./ARGuideScreen";
import AIWoundAnalyserScreen from "./AIWoundAnalyserScreen";

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false, animation: 'fade'}}>
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="Training" component={TrainingScreen} />
      <Stack.Screen name="FactsOrCap" component={FactsOrCapScreen} />
      <Stack.Screen name="CPRQuiz" component={CPRQuizScreen} />
      <Stack.Screen name="FirstAid" component={ARFirstAidScreen} />
      <Stack.Screen name="ARGuide" component={ARGuideScreen} />
      <Stack.Screen name="AIWoundAnalyser" component={AIWoundAnalyserScreen} />
      <Stack.Screen name="Home" component={OnboardingScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider style={styles.container}>
      <Toaster />
      <NavigationContainer>
          <RootStack />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    userSelect: "none"
  }
});