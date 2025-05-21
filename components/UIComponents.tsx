import { StyleSheet, View, Text, TouchableOpacity, Image, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Theme colors
export const COLORS = {
  primary: '#1E3A5F', // Azul escuro
  secondary: '#2E7D32', // Verde
  accent: '#FFD700', // Dourado
  background: '#FFFFFF', // Branco
  text: '#333333',
  lightText: '#888888',
  border: '#DDDDDD',
};

// Banner Component
interface BannerProps {
  imageUrl: string;
  title: string;
  onPress?: () => void;
}

export const Banner = ({ imageUrl, title, onPress }: BannerProps) => {
  return (
    <TouchableOpacity style={styles.bannerContainer} onPress={onPress} activeOpacity={0.9}>
      <Image source={{ uri: imageUrl }} style={styles.bannerImage} />
      <View style={styles.bannerOverlay}>
        <Text style={styles.bannerTitle}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

// Card Component
interface CardProps {
  title: string;
  description?: string;
  imageUrl?: string;
  date?: string;
  location?: string;
  onPress?: () => void;
  style?: ViewStyle;
}

export const Card = ({ title, description, imageUrl, date, location, onPress, style }: CardProps) => {
  return (
    <TouchableOpacity 
      style={[styles.cardContainer, style]} 
      onPress={onPress} 
      activeOpacity={0.7}
    >
      {imageUrl && (
        <Image source={{ uri: imageUrl }} style={styles.cardImage} />
      )}
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle} numberOfLines={1}>{title}</Text>
        {description && (
          <Text style={styles.cardDescription} numberOfLines={2}>{description}</Text>
        )}
        {date && (
          <View style={styles.cardMetaRow}>
            <Ionicons name="calendar-outline" size={14} color={COLORS.primary} />
            <Text style={styles.cardMetaText}>{date}</Text>
          </View>
        )}
        {location && (
          <View style={styles.cardMetaRow}>
            <Ionicons name="location-outline" size={14} color={COLORS.primary} />
            <Text style={styles.cardMetaText}>{location}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

// Quick Access Button
interface QuickAccessButtonProps {
  icon: string;
  label: string;
  onPress?: () => void;
  color?: string;
}

export const QuickAccessButton = ({ icon, label, onPress, color = COLORS.primary }: QuickAccessButtonProps) => {
  return (
    <TouchableOpacity style={styles.quickAccessButton} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.quickAccessIconContainer, { backgroundColor: color }]}>
        <Ionicons name={icon as any} size={24} color={COLORS.accent} />
      </View>
      <Text style={styles.quickAccessLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

// Section Header
interface SectionHeaderProps {
  title: string;
  onSeeAll?: () => void;
}

export const SectionHeader = ({ title, onSeeAll }: SectionHeaderProps) => {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {onSeeAll && (
        <TouchableOpacity onPress={onSeeAll}>
          <Text style={styles.seeAllText}>Ver todos</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

// ActionButton
interface ActionButtonProps {
  title: string;
  onPress?: () => void;
  icon?: string;
  primary?: boolean;
  style?: ViewStyle;
}

export const ActionButton = ({ title, onPress, icon, primary = true, style }: ActionButtonProps) => {
  return (
    <TouchableOpacity 
      style={[
        styles.actionButton, 
        primary ? styles.primaryButton : styles.secondaryButton,
        style
      ]} 
      onPress={onPress}
      activeOpacity={0.8}
    >
      {icon && (
        <Ionicons name={icon as any} size={18} color={primary ? COLORS.accent : COLORS.primary} style={styles.buttonIcon} />
      )}
      <Text style={[styles.actionButtonText, primary ? styles.primaryButtonText : styles.secondaryButtonText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // Banner styles
  bannerContainer: {
    height: 180,
    width: '100%',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 15,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  bannerOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  bannerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },

  // Card styles
  cardContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  cardImage: {
    width: '100%',
    height: 120,
  },
  cardContent: {
    padding: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: COLORS.text,
    marginBottom: 8,
  },
  cardMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  cardMetaText: {
    fontSize: 12,
    color: COLORS.lightText,
    marginLeft: 4,
  },

  // Quick Access Button styles
  quickAccessButton: {
    alignItems: 'center',
    marginHorizontal: 8,
    width: 70,
  },
  quickAccessIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  quickAccessLabel: {
    fontSize: 12,
    color: COLORS.primary,
    textAlign: 'center',
  },

  // Section Header styles
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  seeAllText: {
    fontSize: 14,
    color: COLORS.secondary,
  },

  // Action Button styles
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginVertical: 8,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  primaryButtonText: {
    color: 'white',
  },
  secondaryButtonText: {
    color: COLORS.primary,
  },
  buttonIcon: {
    marginRight: 8,
  },
});
