import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '../../theme/Colors';
import { styles } from './HomeHeader.styles';
import { useLanguage } from '../../context/LanguageContext';

const HomeHeader = () => {
  const { t, language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <TouchableOpacity style={styles.locationContainer}>
          <Icon name='map-marker-outline' size={20} color={Colors.accent} />
          <Text style={styles.locationText}>{t('allLebanon')}</Text>
          <Icon name='chevron-down' size={20} color={Colors.black} />
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={toggleLanguage}
          style={styles.langButton}
        >
          <Text style={styles.langButtonText}>
            {language === 'en' ? 'العربية' : 'English'}
          </Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.searchContainer}>
        <Icon name='magnify' size={24} color={Colors.mediumGray} style={styles.searchIcon} />
        <TextInput
          placeholder={t('searchPlaceholder')}
          placeholderTextColor={Colors.mediumGray}
          style={styles.searchInput}
        />
      </View>
    </View>
  );
};

export default HomeHeader;
