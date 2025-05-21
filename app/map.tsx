import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';

import { ScreenNavigationProp, RootStackParamList } from '~/navigation/types';
import { useStore } from '~/store/store';
import { COLORS, ActionButton } from '~/components/UIComponents';

// Map filter categories
const FILTER_CATEGORIES = [
  { id: 'all', name: 'Todos', icon: 'grid-outline' },
  { id: 'maquinario', name: 'Máquinas', icon: 'car-outline' },
  { id: 'insumos', name: 'Insumos', icon: 'leaf-outline' },
  { id: 'pecuaria', name: 'Pecuária', icon: 'paw-outline' },
  { id: 'alimentos', name: 'Alimentos', icon: 'restaurant-outline' },
  { id: 'servicos', name: 'Serviços', icon: 'construct-outline' },
];

// Default map coordinates - can be updated to fit your event location
const DEFAULT_MAP_REGION = {
  latitude: -22.9142,
  longitude: -47.0558,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

export default function MapScreen() {
  const navigation = useNavigation<ScreenNavigationProp>();
  const route = useRoute<RouteProp<RootStackParamList, 'Map'>>();
  const { exhibitorId, location: locationParam } = route.params || {};
  const { exhibitors } = useStore();
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Get user location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permissão de localização negada');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  // Filter exhibitors by category
  const filteredExhibitors = selectedCategory === 'all'
    ? exhibitors
    : exhibitors.filter(exhibitor => exhibitor.sector.toLowerCase() === selectedCategory);

  return (
    <View style={styles.container}>
      {/* Map */}
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={DEFAULT_MAP_REGION}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        {/* Exhibitor Markers */}
        {filteredExhibitors.map((exhibitor) => (
          <Marker
            key={exhibitor.id}
            coordinate={{
              latitude: exhibitor.location.latitude,
              longitude: exhibitor.location.longitude,
            }}
            pinColor={COLORS.primary}
          >
            <Callout 
              tooltip
              onPress={() => navigation.navigate('ExhibitorDetail', { id: exhibitor.id })}
            >
              <View style={styles.calloutContainer}>
                <Text style={styles.calloutTitle}>{exhibitor.name}</Text>
                <Text style={styles.calloutSector}>{exhibitor.sector}</Text>
                <Text style={styles.calloutAction}>Toque para detalhes</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
      
      {/* Category Filter */}
      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {FILTER_CATEGORIES.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.filterButton,
                selectedCategory === category.id && styles.filterButtonActive
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <Ionicons 
                name={category.icon as any} 
                size={18} 
                color={selectedCategory === category.id ? 'white' : COLORS.primary} 
              />
              <Text 
                style={[
                  styles.filterText,
                  selectedCategory === category.id && styles.filterTextActive
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      
      {/* Route Button */}
      <View style={styles.routeButtonContainer}>
        <ActionButton
          title="Traçar Rota"
          icon="navigate-outline"
          onPress={() => {
            // In a real app, this would integrate with a maps service
            alert('Funcionalidade de rota estará disponível em breve!');
          }}
          style={{ width: '100%' }}
        />
      </View>
      
      {/* Map Info - if there's an error */}
      {errorMsg && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errorMsg}</Text>
        </View>
      )}
      
      {/* Download Map Button */}
      <TouchableOpacity 
        style={styles.downloadButton}
        onPress={() => alert('Mapa baixado para uso offline!')}
      >
        <Ionicons name="download-outline" size={24} color={COLORS.primary} />
      </TouchableOpacity>
    </View>
  );
}

import { ScrollView } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  calloutContainer: {
    width: 200,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 6,
    borderColor: COLORS.primary,
    borderWidth: 1,
  },
  calloutTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    color: COLORS.primary,
  },
  calloutSector: {
    fontSize: 12,
    color: COLORS.secondary,
    marginBottom: 4,
  },
  calloutAction: {
    fontSize: 12,
    color: COLORS.lightText,
    fontStyle: 'italic',
  },
  filterContainer: {
    position: 'absolute',
    top: 16,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  filterButtonActive: {
    backgroundColor: COLORS.primary,
  },
  filterText: {
    fontSize: 12,
    color: COLORS.primary,
    marginLeft: 4,
  },
  filterTextActive: {
    color: 'white',
  },
  routeButtonContainer: {
    position: 'absolute',
    bottom: 30,
    left: 16,
    right: 16,
  },
  errorContainer: {
    position: 'absolute',
    top: 70,
    left: 16,
    right: 16,
    backgroundColor: 'rgba(255, 0, 0, 0.7)',
    padding: 10,
    borderRadius: 6,
  },
  errorText: {
    color: 'white',
    textAlign: 'center',
  },
  downloadButton: {
    position: 'absolute',
    top: 80,
    right: 16,
    backgroundColor: 'white',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
});
