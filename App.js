import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Splash from './Components/Splash';
import Login from './Components/Login';
import Registration from './Components/Registration';
import Forgetpassword from './Components/Forgetpassword';

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

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
