import { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { ScreenNavigationProp } from '~/navigation/types';
import { useStore } from '~/store/store';
import { COLORS } from '~/components/UIComponents';

// Sector filter options
const SECTORS = [
  { id: 'all', name: 'Todos' },
  { id: 'Maquinário', name: 'Maquinário' },
  { id: 'Insumos', name: 'Insumos' },
  { id: 'Pecuária', name: 'Pecuária' },
  { id: 'Alimentos', name: 'Alimentos' },
];

export default function ExhibitorsScreen() {
  const navigation = useNavigation<ScreenNavigationProp>();
  const { exhibitors } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState('all');

  // Filter exhibitors based on search and sector
  const filteredExhibitors = exhibitors.filter(exhibitor => {
    const matchesSearch = exhibitor.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSector = selectedSector === 'all' || exhibitor.sector === selectedSector;
    return matchesSearch && matchesSector;
  });

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={COLORS.lightText} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar expositores..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={20} color={COLORS.lightText} />
          </TouchableOpacity>
        )}
      </View>

      {/* Sector Filter */}
      <View style={styles.sectorContainer}>
        <FlatList
          data={SECTORS}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.sectorButton,
                selectedSector === item.id && styles.sectorButtonActive,
              ]}
              onPress={() => setSelectedSector(item.id)}
            >
              <Text
                style={[
                  styles.sectorText,
                  selectedSector === item.id && styles.sectorTextActive,
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.sectorList}
        />
      </View>

      {/* Exhibitors List */}
      <FlatList
        data={filteredExhibitors}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.exhibitorCard}
            onPress={() => navigation.navigate('ExhibitorDetail', { id: item.id })}
          >
            <Image 
              source={{ uri: item.logo }} 
              style={styles.exhibitorLogo} 
              resizeMode="cover"
            />
            <View style={styles.exhibitorInfo}>
              <Text style={styles.exhibitorName}>{item.name}</Text>
              <Text style={styles.exhibitorSector}>{item.sector}</Text>
              <View style={styles.exhibitorActions}>
                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => navigation.navigate('Map', { exhibitorId: item.id })}
                >
                  <Ionicons name="location-outline" size={16} color={COLORS.primary} />
                  <Text style={styles.actionText}>Ver no mapa</Text>
                </TouchableOpacity>
                {item.contact.whatsapp && (
                  <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={() => {
                      // In a real app, this would open WhatsApp
                      alert(`Contato WhatsApp: ${item.contact.whatsapp}`);
                    }}
                  >
                    <Ionicons name="logo-whatsapp" size={16} color={COLORS.secondary} />
                    <Text style={[styles.actionText, { color: COLORS.secondary }]}>Contato</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.exhibitorsList}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="business-outline" size={50} color={COLORS.lightText} />
            <Text style={styles.emptyText}>
              Nenhum expositor encontrado
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  sectorContainer: {
    marginBottom: 10,
  },
  sectorList: {
    paddingHorizontal: 16,
  },
  sectorButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#EEEEEE',
  },
  sectorButtonActive: {
    backgroundColor: COLORS.primary,
  },
  sectorText: {
    color: COLORS.text,
    fontSize: 14,
  },
  sectorTextActive: {
    color: '#FFFFFF',
  },
  exhibitorsList: {
    padding: 16,
  },
  exhibitorCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  exhibitorLogo: {
    width: 100,
    height: '100%',
  },
  exhibitorInfo: {
    flex: 1,
    padding: 12,
  },
  exhibitorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 4,
  },
  exhibitorSector: {
    fontSize: 14,
    color: COLORS.secondary,
    marginBottom: 8,
  },
  exhibitorActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  actionText: {
    marginLeft: 4,
    fontSize: 12,
    color: COLORS.primary,
  },
  emptyContainer: {
    paddingVertical: 50,
    alignItems: 'center',
  },
  emptyText: {
    marginTop: 10,
    color: COLORS.lightText,
    textAlign: 'center',
    fontSize: 16,
  },
});
