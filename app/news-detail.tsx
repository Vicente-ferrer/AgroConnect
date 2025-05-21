import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { ScreenNavigationProp, NewsDetailRouteProp } from '~/navigation/types';
import { useStore } from '~/store/store';
import { COLORS } from '~/components/UIComponents';

export default function NewsDetail() {
  const navigation = useNavigation<ScreenNavigationProp>();
  const route = useRoute<NewsDetailRouteProp>();
  const { id } = route.params;
  const { news } = useStore();
  
  // Find the news item by id
  const newsItem = news.find(item => item.id === id);
  
  // If news item is not found
  if (!newsItem) {
    return (
      <>
        <View style={[styles.container, styles.centered]}>
          <Ionicons name="alert-circle-outline" size={50} color={COLORS.primary} />
          <Text style={styles.notFoundText}>Notícia não encontrada</Text>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={20} color="#FFFFFF" />
            <Text style={styles.backButtonText}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  }
  
  return (
    <>
      <ScrollView style={styles.container}>
        {/* News Image */}
        {newsItem.image && (
          <Image 
            source={{ uri: newsItem.image }} 
            style={styles.newsImage} 
            resizeMode="cover" 
          />
        )}
        
        {/* News Content */}
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{newsItem.title}</Text>
          
          <View style={styles.infoRow}>
            <Ionicons name="calendar-outline" size={16} color={COLORS.lightText} />
            <Text style={styles.infoText}>{newsItem.date}</Text>
          </View>
          
          <Text style={styles.content}>{newsItem.content}</Text>
          
          {/* For demo purposes, adding more content */}
          <Text style={styles.content}>
            A AgroExpo 2025 está superando todas as expectativas em sua edição deste ano. Conheça as novidades e participe dos eventos especiais que acontecerão nos próximos dias.
          </Text>
          
          <Text style={styles.content}>
            Especialistas do setor compartilham conhecimentos sobre as mais recentes tecnologias agrícolas e tendências de mercado, proporcionando uma experiência enriquecedora para todos os visitantes.
          </Text>
          
          <Text style={styles.content}>
            Não deixe de visitar os estandes dos expositores para conferir lançamentos exclusivos e aproveitar condições especiais disponíveis apenas durante o evento.
          </Text>
          
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={20} color="#FFFFFF" />
            <Text style={styles.backButtonText}>Voltar para notícias</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  notFoundText: {
    fontSize: 18,
    color: COLORS.text,
    marginTop: 10,
    marginBottom: 20,
  },
  newsImage: {
    width: '100%',
    height: 200,
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  infoText: {
    marginLeft: 5,
    fontSize: 14,
    color: COLORS.lightText,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: COLORS.text,
    marginBottom: 15,
  },
  backButton: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
    alignSelf: 'center',
  },
  backButtonText: {
    color: '#FFFFFF',
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '500',
  },
});
