import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, Linking, Alert } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { useStore } from '~/store/store';
import { COLORS, ActionButton } from '~/components/UIComponents';

export default function ExhibitorDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { exhibitors } = useStore();
  
  // Find the exhibitor by id
  const exhibitor = exhibitors.find(item => item.id === id);
  
  // Contact exhibitor via WhatsApp
  const contactViaWhatsApp = () => {
    if (!exhibitor || !exhibitor.contact.whatsapp) return;
    
    const whatsappUrl = `https://wa.me/${exhibitor.contact.whatsapp}`;
    Linking.canOpenURL(whatsappUrl).then(supported => {
      if (supported) {
        Linking.openURL(whatsappUrl);
      } else {
        Alert.alert('Erro', 'WhatsApp não está instalado no dispositivo');
      }
    });
  };

  // Open exhibitor website
  const openWebsite = () => {
    if (!exhibitor || !exhibitor.contact.website) return;
    
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
  };
  
  // If exhibitor is not found
  if (!exhibitor) {
    return (
      <>
        <Stack.Screen options={{ title: 'Detalhes do Expositor' }} />
        <View style={[styles.container, styles.centered]}>
          <Ionicons name="alert-circle-outline" size={50} color={COLORS.primary} />
          <Text style={styles.notFoundText}>Expositor não encontrado</Text>
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
  
  return (
    <>
      <Stack.Screen options={{ title: exhibitor.name }} />
      <ScrollView style={styles.container}>
        {/* Exhibitor Banner */}
        <View style={styles.bannerContainer}>
          <Image 
            source={{ uri: exhibitor.logo }} 
            style={styles.banner} 
            resizeMode="cover" 
          />
        </View>
        
        {/* Exhibitor Info Card */}
        <View style={styles.infoCard}>
          <Text style={styles.exhibitorName}>{exhibitor.name}</Text>
          <View style={styles.sectorBadge}>
            <Text style={styles.sectorText}>{exhibitor.sector}</Text>
          </View>
          
          <Text style={styles.sectionTitle}>Sobre</Text>
          <Text style={styles.description}>{exhibitor.description}</Text>
          
          {/* Catalog */}
          {exhibitor.catalog && exhibitor.catalog.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>Catálogo de Produtos</Text>
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                style={styles.catalogContainer}
              >
                {exhibitor.catalog.map((imageUrl, index) => (
                  <TouchableOpacity 
                    key={index}
                    onPress={() => Alert.alert('Visualização', 'Visualização em tela cheia em breve disponível')}
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
          
          {/* Contact Section */}
          <Text style={styles.sectionTitle}>Contato</Text>
          <View style={styles.contactContainer}>
            {exhibitor.contact.phone && (
              <TouchableOpacity 
                style={styles.contactButton}
                onPress={() => Linking.openURL(`tel:${exhibitor.contact.phone}`)}
              >
                <View style={[styles.contactIcon, { backgroundColor: COLORS.primary }]}>
                  <Ionicons name="call-outline" size={20} color="#FFFFFF" />
                </View>
                <Text style={styles.contactText}>{exhibitor.contact.phone}</Text>
              </TouchableOpacity>
            )}
            
            {exhibitor.contact.whatsapp && (
              <TouchableOpacity 
                style={styles.contactButton}
                onPress={contactViaWhatsApp}
              >
                <View style={[styles.contactIcon, { backgroundColor: '#25D366' }]}>
                  <Ionicons name="logo-whatsapp" size={20} color="#FFFFFF" />
                </View>
                <Text style={styles.contactText}>WhatsApp</Text>
              </TouchableOpacity>
            )}
            
            {exhibitor.contact.website && (
              <TouchableOpacity 
                style={styles.contactButton}
                onPress={openWebsite}
              >
                <View style={[styles.contactIcon, { backgroundColor: COLORS.secondary }]}>
                  <Ionicons name="globe-outline" size={20} color="#FFFFFF" />
                </View>
                <Text style={styles.contactText}>{exhibitor.contact.website}</Text>
              </TouchableOpacity>
            )}
          </View>
          
          {/* Location */}
          <View style={styles.locationSection}>
            <Text style={styles.sectionTitle}>Localização no Evento</Text>
            <ActionButton 
              title="Ver no Mapa" 
              icon="navigate-outline" 
              onPress={() => router.push({
                pathname: '/map',
                params: { exhibitorId: exhibitor.id }
              })} 
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
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
  bannerContainer: {
    height: 180,
    width: '100%',
  },
  banner: {
    width: '100%',
    height: '100%',
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    marginTop: -20,
    flex: 1,
  },
  exhibitorName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 10,
  },
  sectorBadge: {
    backgroundColor: COLORS.primary,
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 15,
    marginBottom: 20,
  },
  sectorText: {
    color: '#FFFFFF',
    fontWeight: '500',
    fontSize: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginTop: 20,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: COLORS.text,
  },
  catalogContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  catalogImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
    marginRight: 10,
  },
  contactContainer: {
    marginVertical: 10,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  contactIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  contactText: {
    fontSize: 16,
    color: COLORS.text,
  },
  locationSection: {
    marginVertical: 20,
  },
});
