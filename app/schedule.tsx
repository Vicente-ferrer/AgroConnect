import { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Calendar } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';

import { useStore } from '~/store/store';
import { COLORS, Card, ActionButton } from '~/components/UIComponents';

// Calculate the date range for the current event (for the calendar)
const START_DATE = '2025-05-21';
const END_DATE = '2025-05-25';

// Categories for event filtering
const EVENT_CATEGORIES = [
  { id: 'all', name: 'Todos' },
  { id: 'show', name: 'Shows' },
  { id: 'leilao', name: 'Leilões' },
  { id: 'cavalgada', name: 'Cavalgadas' },
  { id: 'palestra', name: 'Palestras' },
  { id: 'rodeio', name: 'Rodeios' },
];

export default function ScheduleScreen() {
  const router = useRouter();
  const { events, savedEvents, addSavedEvent, removeSavedEvent } = useStore();
  const [selectedDate, setSelectedDate] = useState(START_DATE);
  const [selectedCategory, setSelectedCategory] = useState('all');
  // Prepare calendar marked dates
  const prepareMarkedDates = () => {
    const markedDates: Record<string, any> = {};
    
    // Mark selected date
    markedDates[selectedDate] = {
      selected: true,
      selectedColor: COLORS.primary,
    };
    
    // Mark dates with events
    events.forEach(event => {
      if (event.date in markedDates) {
        // If date is already marked
        if (event.date === selectedDate) {
          // Don't change selected date styling
        } else {
          // Add dot to existing date
          markedDates[event.date] = {
            ...markedDates[event.date],
            marked: true,
            dotColor: COLORS.accent,
          };
        }
      } else {
        // Mark new date with event
        markedDates[event.date] = {
          marked: true,
          dotColor: COLORS.accent,
        };
      }
    });
    
    return markedDates;
  };

  // Filter events by selected date and category
  const filteredEvents = events.filter(event => {
    const dateMatch = event.date === selectedDate;
    const categoryMatch = selectedCategory === 'all' || event.category === selectedCategory;
    return dateMatch && categoryMatch;
  });
  // Handle save/unsave event
  const toggleSaveEvent = (eventId: string) => {
    if (savedEvents.includes(eventId)) {
      removeSavedEvent(eventId);
    } else {
      addSavedEvent(eventId);
    }
  };

  return (
    <View style={styles.container}>
      {/* Calendar */}
      <Calendar
        current={selectedDate}
        minDate={START_DATE}
        maxDate={END_DATE}
        onDayPress={(day: { dateString: string }) => setSelectedDate(day.dateString)}
        markedDates={prepareMarkedDates()}
        theme={{
          calendarBackground: '#FFFFFF',
          textSectionTitleColor: COLORS.primary,
          selectedDayBackgroundColor: COLORS.primary,
          selectedDayTextColor: '#FFFFFF',
          todayTextColor: COLORS.secondary,
          dayTextColor: '#2d4150',
          dotColor: COLORS.accent,
          selectedDotColor: '#FFFFFF',
          arrowColor: COLORS.primary,
          monthTextColor: COLORS.primary,
          textDayFontWeight: '300',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: '300',
        }}
      />

      {/* Category Filter */}
      <View style={styles.categoryContainer}>
        <FlatList
          data={EVENT_CATEGORIES}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.categoryButton,
                selectedCategory === item.id && styles.categoryButtonActive,
              ]}
              onPress={() => setSelectedCategory(item.id)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === item.id && styles.categoryTextActive,
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.categoryList}
        />
      </View>

      {/* Events List */}
      <View style={styles.eventsContainer}>
        <Text style={styles.dateHeader}>
          {new Date(selectedDate).toLocaleDateString('pt-BR', { 
            weekday: 'long', 
            day: 'numeric', 
            month: 'long' 
          })}
        </Text>
        
        {filteredEvents.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="calendar-outline" size={50} color={COLORS.lightText} />
            <Text style={styles.emptyText}>
              Nenhum evento encontrado para esta data e categoria
            </Text>
          </View>
        ) : (
          <FlatList
            data={filteredEvents}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.eventCard}>
                <Card
                  title={item.title}
                  description={item.description}
                  imageUrl={item.image}
                  date={`Horário: ${item.time}`}
                  location={item.location}
                  onPress={() => router.push({
                    pathname: '/details',
                    params: { id: item.id, type: 'event' }
                  })}
                />
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={() => toggleSaveEvent(item.id)}
                >
                  <Ionicons
                    name={savedEvents.includes(item.id) ? 'star' : 'star-outline'}
                    size={24}
                    color={savedEvents.includes(item.id) ? COLORS.accent : COLORS.primary}
                  />
                </TouchableOpacity>
              </View>
            )}
            contentContainerStyle={styles.eventsList}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  categoryContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  categoryList: {
    paddingHorizontal: 16,
  },
  categoryButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#EEEEEE',
  },
  categoryButtonActive: {
    backgroundColor: COLORS.primary,
  },
  categoryText: {
    color: COLORS.text,
    fontSize: 14,
  },
  categoryTextActive: {
    color: '#FFFFFF',
  },
  eventsContainer: {
    flex: 1,
    padding: 16,
  },
  dateHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 16,
    textTransform: 'capitalize',
  },
  eventsList: {
    paddingBottom: 16,
  },
  eventCard: {
    position: 'relative',
    marginBottom: 16,
  },
  saveButton: {
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    marginTop: 10,
    color: COLORS.lightText,
    textAlign: 'center',
    fontSize: 16,
  },
});
