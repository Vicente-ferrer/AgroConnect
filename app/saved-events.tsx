import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { ScreenNavigationProp } from '~/navigation/types';
import { useStore } from '~/store/store';
import { COLORS, Card } from '~/components/UIComponents';

export default function SavedEventsScreen() {
  const navigation = useNavigation<ScreenNavigationProp>();
  const { events, savedEvents, removeSavedEvent } = useStore();
  
  // Get saved events data
  const userSavedEvents = events.filter(event => savedEvents.includes(event.id));

  // Unsave an event
  const handleUnsaveEvent = (eventId: string) => {
    removeSavedEvent(eventId);
  };

  return (
    <View style={styles.container}>
      {userSavedEvents.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="calendar-outline" size={60} color={COLORS.lightText} />
          <Text style={styles.emptyText}>
            Você ainda não salvou nenhum evento
          </Text>
          <TouchableOpacity 
            style={styles.browseButton}
            onPress={() => navigation.navigate('Schedule')}
          >
            <Text style={styles.browseButtonText}>Ver programação</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={userSavedEvents}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.eventContainer}>
              <Card
                title={item.title}
                description={item.description}
                imageUrl={item.image}
                date={`${item.date} às ${item.time}`}
                location={item.location}
                onPress={() => navigation.navigate('Details', { id: item.id, type: 'event' })}
              />
              <TouchableOpacity
                style={styles.unsaveButton}
                onPress={() => handleUnsaveEvent(item.id)}
              >
                <Ionicons name="close-circle" size={24} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
          )}
          contentContainerStyle={styles.eventsList}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    marginTop: 10,
    marginBottom: 20,
    color: COLORS.lightText,
    textAlign: 'center',
    fontSize: 16,
  },
  browseButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  browseButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  eventsList: {
    paddingBottom: 16,
  },
  eventContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  unsaveButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    zIndex: 1,
  },
});
