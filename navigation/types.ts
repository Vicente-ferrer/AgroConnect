import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

// Define all the possible route parameters here
export type RootStackParamList = {
  Tabs: undefined;
  Home: undefined;
  Map: { exhibitorId?: string; location?: string } | undefined;
  Details: { id: string; type: 'event' | 'exhibitor' };
  ExhibitorDetail: { id: string };
  NewsDetail: { id: string };
  Schedule: undefined;
  News: undefined;
  Profile: undefined;
  Exhibitors: undefined;
  SavedEvents: undefined;
  Onboarding: undefined;
};

// Tab parameter list is a subset of the root stack param list
export type TabParamList = {
  Home: undefined;
  Mapa: undefined;
  Agenda: undefined;
  Notícias: undefined;
  Perfil: undefined;
};

// Type for screen navigation props
export type ScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Types for specific route params
export type DetailsRouteProp = RouteProp<RootStackParamList, 'Details'>;
export type ExhibitorDetailRouteProp = RouteProp<RootStackParamList, 'ExhibitorDetail'>;
export type NewsDetailRouteProp = RouteProp<RootStackParamList, 'NewsDetail'>;

// Tab navigation prop (for when you're specifically using tab navigation)
export type TabNavigationProp = BottomTabNavigationProp<TabParamList>;
