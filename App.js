<<<<<<< HEAD
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Splash from './Components/Splash';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Forgetpassword from './Components/Forgetpassword';
import Dashboard from './Components/Dashboard';
import Welcome from './Components/Welcome';
import LeaderBoard from './Components/LeaderBoard';
import UserProfile from './Components/UserProfile';
import Eventcreat from './Components/Eventcreat';
import ActivitiesScreen from './Components/ActivitiesScreen';
import CommunityFeedbackScreen from './Components/CommunityFeedbackScreen';
import TrailReportsScreen from './Components/TrailReportsScreen';
import BadgesScreen from './Components/BadgesScreen';
import EmergencyScreen from './Components/EmergencyScreen';
import EventsScreen from './Components/EventsScreen';
import JoinEventScreen from './Components/JoinEventScreen';
import EmailVerificationPage from './Components/EmailVerificationPage';


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}  // Default options for all screens
      >
        <Stack.Screen 
          name="Splash" 
          component={Splash}
          options={{ headerShown: false }}  // This explicitly hides the header for Splash
        />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Forgetpassword" component={Forgetpassword} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="LeaderBoard" component={LeaderBoard} />
        <Stack.Screen name="UserProfile" component={UserProfile} />
        <Stack.Screen name="Eventcreat" component={Eventcreat} />
        <Stack.Screen name="ActivitiesScreen" component={ActivitiesScreen} />
        <Stack.Screen name="CommunityFeedbackScreen" component={CommunityFeedbackScreen} />
        <Stack.Screen name="TrailReportsScreen" component={TrailReportsScreen} />
        <Stack.Screen name="BadgesScreen" component={BadgesScreen} />
        <Stack.Screen name="EmergencyScreen" component={EmergencyScreen} />
        <Stack.Screen name="EventsScreen" component={EventsScreen} />
        <Stack.Screen name="JoinEventScreen" component={JoinEventScreen} />
        <Stack.Screen name="EmailVerificationPage" component={EmailVerificationPage} />
       
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
=======
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Splash from './Components/Splash';
import Login from './Components/Login';
import Registration from './Components/Registration';
import Forgetpassword from './Components/Forgetpassword';
import Dashboard from './Components/Dashboard';
import Welcome from './Components/Welcome';
import LeaderBoard from './Components/LeaderBoard';
import UserProfile from './Components/UserProfile';
import Eventcreat from './Components/Eventcreat';
import ActivitiesScreen from './Components/ActivitiesScreen';
import CommunityFeedbackScreen from './Components/CommunityFeedbackScreen';
import TrailReportsScreen from './Components/TrailReportsScreen';
import BadgesScreen from './Components/BadgesScreen';
import EmergencyScreen from './Components/EmergencyScreen';
import EventsScreen from './Components/EventsScreen';
import JoinEventScreen from './Components/JoinEventScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}  // Default options for all screens
      >
        <Stack.Screen 
          name="Splash" 
          component={Splash}
          options={{ headerShown: false }}  // This explicitly hides the header for Splash
        />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Registration" component={Registration} />
        <Stack.Screen name="Forgetpassword" component={Forgetpassword} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="LeaderBoard" component={LeaderBoard} />
        <Stack.Screen name="UserProfile" component={UserProfile} />
        <Stack.Screen name="Eventcreat" component={Eventcreat} />
        <Stack.Screen name="ActivitiesScreen" component={ActivitiesScreen} />
        <Stack.Screen name="CommunityFeedbackScreen" component={CommunityFeedbackScreen} />
        <Stack.Screen name="TrailReportsScreen" component={TrailReportsScreen} />
        <Stack.Screen name="BadgesScreen" component={BadgesScreen} />
        <Stack.Screen name="EmergencyScreen" component={EmergencyScreen} />
        <Stack.Screen name="EventsScreen" component={EventsScreen} />
        <Stack.Screen name="JoinEventScreen" component={JoinEventScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
>>>>>>> bec44a0743f1c39075927b00910f63b749f8b555
