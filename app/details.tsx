import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, Linking, Share, Alert } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { useStore } from '~/store/store';
import { COLORS, ActionButton } from '~/components/UIComponents';
import { Event, Exhibitor } from '~/store/store';

export default function Details() {
  const router = useRouter();
  const { id, type } = useLocalSearchParams();
  const { events, exhibitors, savedEvents, addSavedEvent, removeSavedEvent } = useStore();
  const [item, setItem] = useState<Event | Exhibitor | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    // Find the correct item based on type and id
    if (type === 'event') {
      const event = events.find(e => e.id === id);
      setItem(event || null);
      setIsSaved(savedEvents.includes(id as string));
    } else if (type === 'exhibitor') {
      const exhibitor = exhibitors.find(e => e.id === id);
      setItem(exhibitor || null);
    }
  }, [id, type, events, exhibitors, savedEvents]);

  // Handle save/unsave event
  const toggleSaveEvent = () => {
    if (!item || type !== 'event') return;
    
    if (isSaved) {
      removeSavedEvent(id as string);
      setIsSaved(false);
    } else {
      addSavedEvent(id as string);
      setIsSaved(true);
    }
  };

  // Share event or exhibitor details
  const shareItem = async () => {
    try {
      if (!item) return;
      
      const message = type === 'event'
        ? `Confira esse evento na AgroExpo 2025: ${(item as Event).title} em ${(item as Event).date} às ${(item as Event).time}, ${(item as Event).location}`
        : `Confira esse expositor na AgroExpo 2025: ${(item as Exhibitor).name}, ${(item as Exhibitor).description}`;
      
      await Share.share({
        message,
        title: type === 'event' ? (item as Event).title : (item as Exhibitor).name,
      });
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível compartilhar');
    }
  };

  // Contact exhibitor via WhatsApp
  const contactViaWhatsApp = () => {
    if (!item || type !== 'exhibitor') return;
    
    const exhibitor = item as Exhibitor;
    if (exhibitor.contact.whatsapp) {
      const whatsappUrl = `https://wa.me/${exhibitor.contact.whatsapp}`;
      Linking.canOpenURL(whatsappUrl).then(supported => {
        if (supported) {
          Linking.openURL(whatsappUrl);
        } else {
          Alert.alert('Erro', 'WhatsApp não está instalado no dispositivo');
        }
      });
    }
  };

  // Open exhibitor website
  const openWebsite = () => {
    if (!item || type !== 'exhibitor') return;
    
    const exhibitor = item as Exhibitor;
    if (exhibitor.contact.website) {
      const websiteUrl = exhibitor.contact.website.startsWith('http') 
        ? exhibitor.contact.website 
        : `https://${exhibitor.contact.website}`;
        
      Linking.canOpenURL(websiteUrl).then(supported => {
        if (supported) {
          Linking.openURL(websiteUrl);
        } else {
          Alert.alert('Erro', 'Não foi possível abrir o site');
        }
      });
    }
  };

  // If item is not found
  if (!item) {
    return (
      <>
        <Stack.Screen options={{ title: 'Detalhes' }} />
        <View style={[styles.container, styles.centered]}>
          <Ionicons name="alert-circle-outline" size={50} color={COLORS.primary} />
          <Text style={styles.notFoundText}>Item não encontrado</Text>
          <ActionButton 
            title="Voltar" 
            icon="arrow-back-outline" 
            onPress={() => router.back()} 
            style={{ marginTop: 20 }}
          />
        </View>
      </>
    );
  }

  // Render event details
  if (type === 'event') {
    const event = item as Event;
    return (
      <>
        <Stack.Screen options={{ title: 'Detalhes do Evento' }} />
        <ScrollView style={styles.container}>
          {/* Event Image */}
          <View style={styles.imageContainer}>
            <Image 
              source={{ uri: event.image }} 
              style={styles.eventImage} 
              resizeMode="cover" 
            />
            <TouchableOpacity 
              style={styles.saveButton}
              onPress={toggleSaveEvent}
            >
              <Ionicons 
                name={isSaved ? 'star' : 'star-outline'} 
                size={28} 
                color={isSaved ? COLORS.accent : '#FFFFFF'} 
              />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.shareButton}
              onPress={shareItem}
            >
              <Ionicons 
                name="share-social-outline" 
                size={28} 
                color="#FFFFFF" 
              />
            </TouchableOpacity>
          </View>
          
          {/* Event Details */}
          <View style={styles.detailsContainer}>
            <Text style={styles.title}>{event.title}</Text>
            
            <View style={styles.infoRows}>
              <View style={styles.infoRow}>
                <Ionicons name="calendar-outline" size={20} color={COLORS.primary} />
                <Text style={styles.infoText}>{event.date}</Text>
              </View>
              
              <View style={styles.infoRow}>
                <Ionicons name="time-outline" size={20} color={COLORS.primary} />
                <Text style={styles.infoText}>{event.time}</Text>
              </View>
              
              <View style={styles.infoRow}>
                <Ionicons name="location-outline" size={20} color={COLORS.primary} />
                <Text style={styles.infoText}>{event.location}</Text>
              </View>
              
              <View style={styles.infoRow}>
                <Ionicons name="pricetag-outline" size={20} color={COLORS.primary} />
                <Text style={styles.infoText}>
                  {event.category === 'show' && 'Show'}
                  {event.category === 'leilao' && 'Leilão'}
                  {event.category === 'cavalgada' && 'Cavalgada'}
                  {event.category === 'palestra' && 'Palestra'}
                  {event.category === 'rodeio' && 'Rodeio'}
                </Text>
              </View>
            </View>
            
            <Text style={styles.sectionTitle}>Descrição</Text>
            <Text style={styles.description}>{event.description}</Text>
            
            <View style={styles.actionButtons}>
              <ActionButton 
                title="Ver Localização" 
                icon="navigate-outline" 
                onPress={() => router.push({
                  pathname: '/map',
                  params: { location: event.location }
                })} 
                style={{ flex: 1, marginRight: 8 }}
              />
              <ActionButton 
                title={isSaved ? "Remover" : "Salvar"} 
                icon={isSaved ? "star" : "star-outline"} 
                onPress={toggleSaveEvent} 
                primary={!isSaved}
                style={{ flex: 1, marginLeft: 8 }}
              />
            </View>
          </View>
        </ScrollView>
      </>
    );
  }
  
  // Render exhibitor details
  else {
    const exhibitor = item as Exhibitor;
    return (
      <>
        <Stack.Screen options={{ title: 'Detalhes do Expositor' }} />
        <ScrollView style={styles.container}>
          {/* Exhibitor Logo */}
          <View style={styles.imageContainer}>
            <Image 
              source={{ uri: exhibitor.logo }} 
              style={styles.exhibitorImage} 
              resizeMode="cover" 
            />
            <TouchableOpacity 
              style={styles.shareButton}
              onPress={shareItem}
            >
              <Ionicons 
                name="share-social-outline" 
                size={28} 
                color="#FFFFFF" 
              />
            </TouchableOpacity>
          </View>
          
          {/* Exhibitor Details */}
          <View style={styles.detailsContainer}>
            <Text style={styles.title}>{exhibitor.name}</Text>
            <View style={styles.badgeContainer}>
              <Text style={styles.badge}>{exhibitor.sector}</Text>
            </View>
            
            <Text style={styles.sectionTitle}>Sobre</Text>
            <Text style={styles.description}>{exhibitor.description}</Text>
            
            {exhibitor.catalog && exhibitor.catalog.length > 0 && (
              <>
                <Text style={styles.sectionTitle}>Catálogo</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {exhibitor.catalog.map((imageUrl, index) => (
                    <TouchableOpacity 
                      key={index}
                      onPress={() => Alert.alert('Catálogo', 'Visualização completa em breve disponível!')}
                    >
                      <Image 
                        source={{ uri: imageUrl }} 
                        style={styles.catalogImage} 
                      />
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </>
            )}
            
            <Text style={styles.sectionTitle}>Contato</Text>
            <View style={styles.contactButtons}>
              {exhibitor.contact.whatsapp && (
                <TouchableOpacity 
                  style={[styles.contactButton, { backgroundColor: '#25D366' }]}
                  onPress={contactViaWhatsApp}
                >
                  <Ionicons name="logo-whatsapp" size={22} color="#FFFFFF" />
                  <Text style={styles.contactButtonText}>WhatsApp</Text>
                </TouchableOpacity>
              )}
              
              {exhibitor.contact.phone && (
                <TouchableOpacity 
                  style={[styles.contactButton, { backgroundColor: COLORS.primary }]}
                  onPress={() => Linking.openURL(`tel:${exhibitor.contact.phone}`)}
                >
                  <Ionicons name="call-outline" size={22} color="#FFFFFF" />
                  <Text style={styles.contactButtonText}>Ligar</Text>
                </TouchableOpacity>
              )}
              
              {exhibitor.contact.website && (
                <TouchableOpacity 
                  style={[styles.contactButton, { backgroundColor: COLORS.secondary }]}
                  onPress={openWebsite}
                >
                  <Ionicons name="globe-outline" size={22} color="#FFFFFF" />
                  <Text style={styles.contactButtonText}>Site</Text>
                </TouchableOpacity>
              )}
            </View>
            
            <ActionButton 
              title="Ver no Mapa" 
              icon="navigate-outline" 
              onPress={() => router.push({
                pathname: '/map',
                params: { exhibitorId: exhibitor.id }
              })} 
              style={{ marginTop: 20 }}
            />
          </View>
        </ScrollView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
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
  },
  imageContainer: {
    position: 'relative',
    height: 200,
    width: '100%',
  },
  eventImage: {
    width: '100%',
    height: '100%',
  },
  exhibitorImage: {
    width: '100%',
    height: '100%',
  },
  saveButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: 8,
  },
  shareButton: {
    position: 'absolute',
    top: 10,
    right: type === 'event' ? 60 : 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: 8,
  },
  detailsContainer: {
    padding: 16,
    marginTop: -20,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 10,
  },
  badgeContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  badge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 15,
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  infoRows: {
    marginVertical: 15,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    marginLeft: 10,
    fontSize: 16,
    color: COLORS.text,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 8,
    marginTop: 15,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: COLORS.text,
  },
  actionButtons: {
    flexDirection: 'row',
    marginTop: 20,
  },
  catalogImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
    marginRight: 10,
    marginBottom: 10,
  },
  contactButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  contactButtonText: {
    color: '#FFFFFF',
    marginLeft: 5,
    fontWeight: '500',
  },
});
