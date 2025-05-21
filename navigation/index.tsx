import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList, TabParamList } from './types';
import { screenOptions } from './screens';

import HomeScreen from '../app/index';
import MapScreen from '../app/map';
import ScheduleScreen from '../app/schedule';
import NewsScreen from '../app/news';
import ProfileScreen from '../app/profile';
import DetailsScreen from '../app/details';
import ExhibitorDetailScreen from '../app/exhibitor-detail';
import NewsDetailScreen from '../app/news-detail';
import SavedEventsScreen from '../app/saved-events';
import ExhibitorsScreen from '../app/exhibitors';
import OnboardingScreen from '../app/onboarding';

const Tab = createBottomTabNavigator<TabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = 'home-outline';
          if (route.name === 'Home') iconName = 'home-outline';
          if (route.name === 'Mapa') iconName = 'map-outline';
          if (route.name === 'Agenda') iconName = 'calendar-outline';
          if (route.name === 'Notícias') iconName = 'newspaper-outline';
          if (route.name === 'Perfil') iconName = 'person-outline';
          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FFD700',
        tabBarInactiveTintColor: '#FFFFFF',
        tabBarStyle: {
          backgroundColor: '#1E3A5F',
          borderTopWidth: 0,
          elevation: 0,
          height: 64,
          paddingBottom: 4,
        },
        tabBarLabelStyle: {
          fontWeight: '500',
          fontSize: 11,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Mapa" component={MapScreen} />
      <Tab.Screen name="Agenda" component={ScheduleScreen} />
      <Tab.Screen name="Notícias" component={NewsScreen} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function RootNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Tabs" component={TabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="Details" component={DetailsScreen} options={screenOptions.Details} />
        <Stack.Screen name="ExhibitorDetail" component={ExhibitorDetailScreen} options={screenOptions.ExhibitorDetail} />
        <Stack.Screen name="NewsDetail" component={NewsDetailScreen} options={screenOptions.NewsDetail} />
        <Stack.Screen name="SavedEvents" component={SavedEventsScreen} options={screenOptions.SavedEvents} />
        <Stack.Screen name="Exhibitors" component={ExhibitorsScreen} options={{ title: 'Expositores' }} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
