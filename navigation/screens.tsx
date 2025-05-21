import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

// Define screen options in one place to be used in the navigation config
export const screenOptions: Record<string, NativeStackNavigationOptions> = {
  Details: {
    title: 'Detalhes',
  },
  ExhibitorDetail: {
    title: 'Detalhes do Expositor',
  },
  NewsDetail: {
    title: 'Notícia',
  },
  SavedEvents: {
    title: 'Meus Eventos Salvos',
  },
};
