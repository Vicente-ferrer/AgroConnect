import { StyleSheet, View, Text, Image, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { ScreenNavigationProp } from '~/navigation/types';
import { useStore } from '~/store/store';
import { COLORS, ActionButton, Card } from '~/components/UIComponents';

export default function ProfileScreen() {
  const navigation = useNavigation<ScreenNavigationProp>();
  const { events, savedEvents, removeSavedEvent } = useStore();
  
  // Get saved events data
  const userSavedEvents = events.filter(event => savedEvents.includes(event.id));
  
  // Dummy user data (in a real app, this would come from authentication)
  const userData = {
    name: 'Usuário AgroConnect',
    email: 'usuario@exemplo.com',
    profileImage: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=1480&auto=format&fit=crop',
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <Image 
          source={{ uri: userData.profileImage }} 
          style={styles.profileImage} 
        />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{userData.name}</Text>
          <Text style={styles.profileEmail}>{userData.email}</Text>
        </View>
      </View>

      {/* Options */}
      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.optionItem}>
          <Ionicons name="notifications-outline" size={24} color={COLORS.primary} />
          <Text style={styles.optionText}>Notificações</Text>
          <Ionicons name="chevron-forward" size={20} color={COLORS.lightText} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.optionItem}>
          <Ionicons name="settings-outline" size={24} color={COLORS.primary} />
          <Text style={styles.optionText}>Configurações</Text>
          <Ionicons name="chevron-forward" size={20} color={COLORS.lightText} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.optionItem}>
          <Ionicons name="download-outline" size={24} color={COLORS.primary} />
          <Text style={styles.optionText}>Mapa Offline</Text>
          <Ionicons name="chevron-forward" size={20} color={COLORS.lightText} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.optionItem}>
          <Ionicons name="help-circle-outline" size={24} color={COLORS.primary} />
          <Text style={styles.optionText}>Ajuda e Suporte</Text>
          <Ionicons name="chevron-forward" size={20} color={COLORS.lightText} />
        </TouchableOpacity>
      </View>

      {/* Saved Events */}
      <View style={styles.savedEventsContainer}>
        <Text style={styles.sectionTitle}>Meus Eventos Salvos</Text>
        
        {userSavedEvents.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="calendar-outline" size={50} color={COLORS.lightText} />
            <Text style={styles.emptyText}>
              Você ainda não salvou nenhum evento
            </Text>
            <ActionButton
              title="Explorar Programação"
              onPress={() => navigation.navigate('Schedule')}
              style={{ marginTop: 16 }}
            />
          </View>
        ) : (
          <FlatList
            data={userSavedEvents}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.eventCard}>
                <Card
                  title={item.title}
                  description={item.description}
                  imageUrl={item.image}
                  date={`${item.date} às ${item.time}`}
                  location={item.location}
                  onPress={() => navigation.navigate('Details', { id: item.id, type: 'event' })}
                />
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removeSavedEvent(item.id)}
                >
                  <Ionicons name="close" size={16} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            )}
            scrollEnabled={false}
            nestedScrollEnabled={true}
            style={{ marginTop: 10 }}
          />
        )}
      </View>
      
      {/* Sign Out Button */}
      <ActionButton
        title="Sair"
        primary={false}
        onPress={() => alert('Você saiu da conta!')}
        style={styles.signOutButton}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: COLORS.primary,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: COLORS.accent,
  },
  profileInfo: {
    marginLeft: 15,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  optionsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginHorizontal: 16,
    marginTop: -20,
    marginBottom: 16,
    paddingVertical: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  optionText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
    color: COLORS.text,
  },
  savedEventsContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 10,
  },
  eventCard: {
    position: 'relative',
    marginBottom: 16,
  },
  removeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255, 0, 0, 0.7)',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  emptyText: {
    marginTop: 10,
    color: COLORS.lightText,
    textAlign: 'center',
    fontSize: 16,
  },
  signOutButton: {
    marginHorizontal: 16,
    marginBottom: 30,
  },
});
