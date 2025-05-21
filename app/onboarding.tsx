import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

import { ScreenNavigationProp } from '~/navigation/types';
import { COLORS } from '~/components/UIComponents';

const { width, height } = Dimensions.get('window');

const ONBOARDING_SLIDES = [
  {
    id: '1',
    title: 'Bem-vindo ao AgroConnect',
    description: 'Seu guia completo para a melhor experiência no evento agropecuário',
    image: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=1471&auto=format&fit=crop',
    icon: 'farm-outline',
  },
  {
    id: '2',
    title: 'Mapa Interativo',
    description: 'Localize todos os expositores, serviços e atrações com facilidade',
    image: 'https://images.unsplash.com/photo-1569360557816-5c6a229217b7?q=80&w=1479&auto=format&fit=crop',
    icon: 'map-outline',
  },
  {
    id: '3',
    title: 'Programação Completa',
    description: 'Confira a agenda de shows, leilões, palestras e não perca nenhum evento',
    image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?q=80&w=1474&auto=format&fit=crop',
    icon: 'calendar-outline',
  },
  {
    id: '4',
    title: 'Notificações em Tempo Real',
    description: 'Receba alertas sobre eventos de seu interesse e novidades do evento',
    image: 'https://images.unsplash.com/photo-1516467716199-8b782a7fa3f6?q=80&w=1470&auto=format&fit=crop',
    icon: 'notifications-outline',
  },
];

export default function OnboardingScreen() {
  const navigation = useNavigation<ScreenNavigationProp>();
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideProgress = useSharedValue(0);
  
  // Animation for slide transition
  useEffect(() => {
    slideProgress.value = withTiming(currentSlide, {
      duration: 300,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
  }, [currentSlide]);
  
  // Animation style for slide content
  const slideAnimStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: -slideProgress.value * width },
      ],
    };
  });
  
  // Handle next slide
  const handleNext = () => {
    if (currentSlide < ONBOARDING_SLIDES.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      finishOnboarding();
    }
  };
  
  // Handle skip to last slide
  const handleSkip = () => {
    setCurrentSlide(ONBOARDING_SLIDES.length - 1);
  };
    // Finish onboarding and mark as completed
  const finishOnboarding = async () => {
    try {
      await AsyncStorage.setItem('@onboarding_completed', 'true');
      navigation.navigate('Tabs');
    } catch (error) {
      console.error('Error saving onboarding status:', error);
      navigation.navigate('Tabs');
    }
  };
  
  return (
    <>
      <View style={styles.container}>
        {/* Skip Button */}
        {currentSlide < ONBOARDING_SLIDES.length - 1 && (
          <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
            <Text style={styles.skipText}>Pular</Text>
          </TouchableOpacity>
        )}
        
        {/* Slides */}
        <View style={styles.slidesContainer}>
          <Animated.View style={[styles.slidesContent, slideAnimStyle]}>
            {ONBOARDING_SLIDES.map((slide) => (
              <View key={slide.id} style={styles.slide}>
                <Image source={{ uri: slide.image }} style={styles.slideImage} />
                <View style={styles.slideOverlay} />
                <View style={styles.iconContainer}>
                  <Ionicons name={slide.icon as any} size={60} color={COLORS.accent} />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.slideTitle}>{slide.title}</Text>
                  <Text style={styles.slideDescription}>{slide.description}</Text>
                </View>
              </View>
            ))}
          </Animated.View>
        </View>
        
        {/* Pagination */}
        <View style={styles.pagination}>
          {ONBOARDING_SLIDES.map((_, index) => (
            <View 
              key={index} 
              style={[
                styles.paginationDot,
                currentSlide === index && styles.paginationDotActive
              ]} 
            />
          ))}
        </View>
        
        {/* Navigation Buttons */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity 
            style={styles.nextButton} 
            onPress={handleNext}
          >
            <Text style={styles.nextButtonText}>
              {currentSlide === ONBOARDING_SLIDES.length - 1 ? 'Começar' : 'Próximo'}
            </Text>
            <Ionicons 
              name={currentSlide === ONBOARDING_SLIDES.length - 1 ? 'checkmark-outline' : 'arrow-forward-outline'} 
              size={20} 
              color="white" 
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  skipButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10,
    padding: 10,
  },
  skipText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  slidesContainer: {
    width: width,
    height: height,
    overflow: 'hidden',
  },
  slidesContent: {
    flexDirection: 'row',
    width: width * ONBOARDING_SLIDES.length,
    height: '100%',
  },
  slide: {
    width: width,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  slideOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  textContainer: {
    padding: 20,
    alignItems: 'center',
  },
  slideTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 15,
  },
  slideDescription: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  pagination: {
    position: 'absolute',
    bottom: 180,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 5,
  },
  paginationDotActive: {
    backgroundColor: COLORS.accent,
    width: 20,
  },
  buttonsContainer: {
    position: 'absolute',
    bottom: 80,
    width: '100%',
    paddingHorizontal: 20,
  },
  nextButton: {
    backgroundColor: COLORS.primary,
    height: 56,
    borderRadius: 28,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 8,
  },
});
