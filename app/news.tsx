import { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image, TextInput } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { useStore } from '~/store/store';
import { COLORS } from '~/components/UIComponents';

export default function NewsScreen() {
  const router = useRouter();
  const { news } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter news based on search
  const filteredNews = news.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.content.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <>
      <Stack.Screen options={{ title: 'Notícias' }} />
      <View style={styles.container}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={COLORS.lightText} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar notícias..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color={COLORS.lightText} />
            </TouchableOpacity>
          )}
        </View>
        
        {/* News List */}
        <FlatList
          data={filteredNews}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.newsCard}
              onPress={() => router.push({
                pathname: '/news-detail',
                params: { id: item.id }
              })}
            >
              <Image 
                source={{ uri: item.image }} 
                style={styles.newsImage} 
                resizeMode="cover"
              />
              <View style={styles.newsContent}>
                <Text style={styles.newsTitle}>{item.title}</Text>
                <Text style={styles.newsDate}>{item.date}</Text>
                <Text style={styles.newsExcerpt} numberOfLines={2}>
                  {item.content}
                </Text>
                <Text style={styles.readMore}>Ler mais</Text>
              </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.newsList}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="newspaper-outline" size={50} color={COLORS.lightText} />
              <Text style={styles.emptyText}>
                Nenhuma notícia encontrada
              </Text>
            </View>
          }
        />
      </View>
    </>
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
  newsList: {
    padding: 16,
  },
  newsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  newsImage: {
    width: '100%',
    height: 150,
  },
  newsContent: {
    padding: 12,
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 4,
  },
  newsDate: {
    fontSize: 12,
    color: COLORS.lightText,
    marginBottom: 8,
  },
  newsExcerpt: {
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.text,
    marginBottom: 8,
  },
  readMore: {
    fontSize: 14,
    color: COLORS.secondary,
    fontWeight: '500',
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
