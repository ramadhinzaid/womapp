import React from 'react';
import LoginScreen from '../screens/LoginScreen';
import HomePage from '../screens/HomePage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserDetailScreen from '../screens/UserDetailScreen';
import SplashScreen from '../screens/SplashScreen';

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Home: undefined;
  UserDetail: { id: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen 
        name="Splash" 
        component={SplashScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Home" component={HomePage} />
      <Stack.Screen 
        name="UserDetail" 
        component={UserDetailScreen} 
        options={({ route }) => ({ title: `User #${route.params.id}` })}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
