import React from 'react';
import LoginScreen from '../screens/LoginScreen';
import HomePage from '../screens/HomePage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Home" component={HomePage} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
