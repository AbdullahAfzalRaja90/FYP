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

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen 
          name="Splash" 
          component={Splash}
          options={{ headerShown: false }}  // This line hides the header
        />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Registration" component={Registration} />
        <Stack.Screen name="Forgetpassword" component={Forgetpassword} />
        <Stack.Screen name="Dashboard" component={Dashboard}/>
        <Stack.Screen name="Welcome" component={Welcome}/>
        <Stack.Screen name="LeaderBoard" component={LeaderBoard}/>
        <Stack.Screen name="UserProfile" component={UserProfile}/>
        <Stack.Screen name="Eventcreat" component={Eventcreat}/>
        

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
