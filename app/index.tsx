import { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, FlatList, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Animated, { useSharedValue, useAnimatedScrollHandler, interpolate, useAnimatedStyle } from 'react-native-reanimated';

import { ScreenNavigationProp } from '~/navigation/types';
import { useStore } from '~/store/store';
import { Banner, Card, QuickAccessButton, SectionHeader, COLORS } from '~/components/UIComponents';

// Banner rotation data
const BANNERS = [
  {
    id: '1',
    imageUrl: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=1471&auto=format&fit=crop',
    title: 'Palestra: Agricultura de Precisão',
  },
  {
    id: '2',
    imageUrl: 'https://images.unsplash.com/photo-1575908539614-ff89490f4a78?q=80&w=1470&auto=format&fit=crop',
    title: 'Cavalgada Solidária',
  },
  {
    id: '3',
    imageUrl: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?q=80&w=1474&auto=format&fit=crop',
    title: 'Show Bruno & Marrone',
  },
  {
    id: '4',
    imageUrl: 'https://images.unsplash.com/photo-1581376436131-e2013344fd5f?q=80&w=1470&auto=format&fit=crop',
    title: 'Rodeio Profissional',
  },
];

export default function HomeScreen() {
  const navigation = useNavigation<ScreenNavigationProp>();
  const { width } = useWindowDimensions();
  const { events, news } = useStore();
  const [currentBanner, setCurrentBanner] = useState(0);
  const scrollX = useSharedValue(0);

  // Auto-rotate banners
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev === BANNERS.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  // Filter events for today and tomorrow
  const upcomingEvents = events
    .filter((event) => {
      const eventDate = new Date(event.date);
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      return (
        eventDate.toDateString() === today.toDateString() ||
        eventDate.toDateString() === tomorrow.toDateString()
      );
    })
    .slice(0, 3);

  // Latest news
  const latestNews = news.slice(0, 3);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Rotating Banner */}
      <View style={styles.bannerContainer}>
        <Animated.FlatList
          data={BANNERS}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={[styles.bannerItem, { width }]}>
              <Banner 
                imageUrl={item.imageUrl} 
                title={item.title}
                onPress={() => navigation.navigate('Schedule')}
              />
            </View>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onScroll={scrollHandler}
          scrollEventThrottle={16}
        />
        
        {/* Dot indicators */}
        <View style={styles.dotContainer}>
          {BANNERS.map((_, index) => {
            const animatedDotStyle = useAnimatedStyle(() => {
              const inputRange = [
                (index - 1) * width,
                index * width,
                (index + 1) * width,
              ];
              
              return {
                width: interpolate(
                  scrollX.value,
                  inputRange,
                  [8, 16, 8],
                  'clamp'
                ),
                opacity: interpolate(
                  scrollX.value,
                  inputRange,
                  [0.5, 1, 0.5],
                  'clamp'
                ),
                backgroundColor: 
                  index === currentBanner 
                    ? COLORS.accent 
                    : '#FFFFFF',
              };
            });
            
            return (
              <Animated.View
                key={index.toString()}
                style={[styles.dot, animatedDotStyle]}
              />
            );
          })}
        </View>
      </View>
      
      {/* Quick Access Buttons */}
      <View style={styles.quickAccessContainer}>
        <QuickAccessButton 
          icon="map-outline" 
          label="Mapa" 
          onPress={() => navigation.navigate('Map')} 
        />
        <QuickAccessButton 
          icon="calendar-outline" 
          label="Programação" 
          onPress={() => navigation.navigate('Schedule')} 
          color={COLORS.secondary}
        />
        <QuickAccessButton 
          icon="business-outline" 
          label="Expositores" 
          onPress={() => navigation.navigate('Exhibitors')} 
        />
        <QuickAccessButton 
          icon="star-outline" 
          label="Meus Eventos" 
          onPress={() => navigation.navigate('Profile')} 
          color={COLORS.secondary}
        />
      </View>
      
      {/* Upcoming Events */}
      <SectionHeader 
        title="Próximos Eventos" 
        onSeeAll={() => navigation.navigate('Schedule')} 
      />
      
      <View style={styles.eventsContainer}>
        {upcomingEvents.map((event) => (
          <Card
            key={event.id}
            title={event.title}
            description={event.description}
            imageUrl={event.image}
            date={`${event.date} às ${event.time}`}
            location={event.location}
            onPress={() => navigation.navigate('Details', { id: event.id, type: 'event' })}
          />
        ))}
      </View>
      
      {/* Latest News */}
      <SectionHeader 
        title="Últimas Notícias" 
        onSeeAll={() => navigation.navigate('News')} 
      />
      
      <View style={styles.newsContainer}>
        {latestNews.map((item) => (
          <Card
            key={item.id}
            title={item.title}
            description={item.content}
            imageUrl={item.image}
            date={item.date}
            onPress={() => navigation.navigate('NewsDetail', { id: item.id })}
            style={styles.newsCard}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 30,
  },
  bannerContainer: {
    height: 180,
    marginBottom: 20,
  },
  bannerItem: {
    height: 180,
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 10,
    width: '100%',
  },
  dot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: COLORS.accent,
    marginHorizontal: 4,
  },
  quickAccessContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  eventsContainer: {
    marginBottom: 10,
  },
  newsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  newsCard: {
    width: '48%',
    marginBottom: 10,
  },
});
