import React, { useContext } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import CountrySearchScreen from '../screens/CountrySearch/CountrySearchScreen';
import FavoriteCountryScreen from '../screens/FavoriteCountry/FavoriteCountryScreen';
import { ApplicationStackParamList } from '../../@types/navigation';
import ThemeContext from '../services/ThemeContext';

const Stack = createStackNavigator<ApplicationStackParamList>();

const ApplicationNavigator = () => {
  const theme = useContext(ThemeContext);
  const isDark = (theme === 'dark');
  const navigationRef = useNavigationContainerRef();

  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer ref={navigationRef}>
        <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="CountrySearchScreen"
            component={CountrySearchScreen}
          />
          <Stack.Screen
            name="FavoriteCountryScreen"
            component={FavoriteCountryScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default ApplicationNavigator;
