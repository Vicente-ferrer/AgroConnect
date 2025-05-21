import { useEffect, useState } from 'react';
import { Tabs, Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useStore } from '~/store/store';
import { mockEvents, mockExhibitors, mockNews } from '~/data/mockData';

// Theme colors
const COLORS = {
  primary: '#1E3A5F', // Azul escuro
  secondary: '#2E7D32', // Verde
  accent: '#FFD700', // Dourado
  background: '#FFFFFF', // Branco
};

export default function RootLayout() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const { setEvents, setExhibitors, setNews } = useStore();
  const [showOnboarding, setShowOnboarding] = useState<boolean | null>(null);

  // Check if onboarding has been completed
  useEffect(() => {
    const checkOnboarding = async () => {
      try {
        const value = await AsyncStorage.getItem('@onboarding_completed');
        if (value === null) {
          // User has not completed onboarding
          setShowOnboarding(true);
          router.replace('/onboarding');
        } else {
          setShowOnboarding(false);
        }
      } catch (error) {
        console.error('Error checking onboarding status:', error);
        setShowOnboarding(false);
      }
    };
    
    checkOnboarding();
  }, [router]);

  // Load mock data when app starts
  useEffect(() => {
    setEvents(mockEvents);
    setExhibitors(mockExhibitors);
    setNews(mockNews);
  }, []);

  return (
    <>
      <StatusBar style="light" />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: COLORS.accent,
          tabBarInactiveTintColor: '#FFFFFF',
          tabBarStyle: {
            backgroundColor: COLORS.primary,
            borderTopWidth: 0,
            elevation: 0,
            height: 60,
            paddingBottom: 10,
          },
          tabBarLabelStyle: {
            fontWeight: '500',
          },
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, size }: { color: string; size: number }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="map"
          options={{
            title: 'Mapa',
            tabBarIcon: ({ color, size }: { color: string; size: number }) => (
              <Ionicons name="map-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="schedule"
          options={{
            title: 'Agenda',
            tabBarIcon: ({ color, size }: { color: string; size: number }) => (
              <Ionicons name="calendar-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="exhibitors"
          options={{
            title: 'Expositores',
            tabBarIcon: ({ color, size }: { color: string; size: number }) => (
              <Ionicons name="business-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="news"
          options={{
            title: 'Notícias',
            tabBarIcon: ({ color, size }: { color: string; size: number }) => (
              <Ionicons name="newspaper-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Perfil',
            tabBarIcon: ({ color, size }: { color: string; size: number }) => (
              <Ionicons name="person-outline" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
