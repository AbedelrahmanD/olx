import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from './FilterScreen.styles';
import { Colors } from '../../theme/Colors';
import { useLanguage } from '../../context/LanguageContext';
import { useFilters } from '../../context/FilterContext';
import { CATEGORY_IMAGE_MAP } from '../../utils/CategoryImageMap';

const FilterScreen = ({ navigation, route }: any) => {
  const { t, language } = useLanguage();
  const { filters, updateFilters, resetFilters } = useFilters();

  const {
    category,
    rootCategory,
  } = route.params || {};

  const [minPrice, setMinPrice] = useState(filters.minPrice ? String(filters.minPrice) : '');
  const [maxPrice, setMaxPrice] = useState(filters.maxPrice ? String(filters.maxPrice) : '');
  const [selectedLocation, setSelectedLocation] = useState(filters.location);

  useEffect(() => {
    setSelectedLocation(filters.location);
  }, [filters.location]);

  const handleApply = () => {
    updateFilters({
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      location: selectedLocation,
    });
    navigation.goBack();
  };

  const handleClearAll = () => {
    setMinPrice('');
    setMaxPrice('');
    setSelectedLocation({ externalID: '0-1', name: 'Lebanon', name_l1: 'لبنان' });
    resetFilters();
  };

  const handleLocationPress = () => {
    navigation.navigate('LocationPicker', {
      // No callback passed anymore, we'll use navigate back with params
    });
  };

  // Resolve Localized Names
  const rootName = rootCategory ? (language === 'ar' ? rootCategory.name_l1 : rootCategory.name) : t('category');
  const itemName = category ? (language === 'ar' ? category.name_l1 : category.name) : '';
  const rootSlug = rootCategory?.slug || category?.slug || '';
  const locationName = language === 'ar' ? selectedLocation.name_l1 : selectedLocation.name;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name='close' size={30} color='#333' />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleClearAll}>
            <Text style={styles.resetText}>{t('clearAll')}</Text>
          </TouchableOpacity>
        </View>
        <Text style={[styles.title,]}>
          {t('filters')}
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Category Section */}
        <View style={styles.section}>
          <Text style={[styles.label,]}>
            {t('category')}
          </Text>
          <View style={styles.categoryContainer}>
            <View style={styles.categoryInfo}>
              <View style={styles.categoryIcon}>
                {CATEGORY_IMAGE_MAP[rootSlug] ? (
                  <Image
                    source={CATEGORY_IMAGE_MAP[rootSlug]}
                    style={{ width: 50, height: 50 }}
                    resizeMode='contain'
                  />
                ) : (
                  <Icon name='tag' size={32} color='#333' />
                )}
              </View>
              <View style={styles.categoryTextContainer}>
                <Text style={styles.categoryName}>{rootName}</Text>
                <Text style={styles.categorySlug}>{itemName}</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('CategoryPicker')}>
              <Text style={styles.changeText}>{t('change')}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Location Section */}
        <TouchableOpacity style={styles.section} onPress={handleLocationPress}>
          <Text style={[styles.label,]}>
            {t('location')}
          </Text>
          <View style={styles.locationContainer}>
            <View style={[styles.locationTextContainer, { alignItems: language === 'ar' ? 'flex-end' : 'flex-start' }]}>
              <Text style={styles.locationName}>{locationName}</Text>
            </View>
            <Icon name={language === 'ar' ? 'chevron-left' : 'chevron-right'} size={24} color='#333' />
          </View>
        </TouchableOpacity>

        {/* Price Section */}
        <View style={[styles.section, styles.sectionNoBorder]}>
          <Text style={[styles.label,]}>
            {t('price')}
          </Text>
          <View style={styles.priceInputRow}>
            <TextInput
              style={[styles.priceInput,]}
              placeholder={t('min')}
              placeholderTextColor={Colors.mediumGray}
              keyboardType='numeric'
              value={minPrice}
              onChangeText={setMinPrice}
            />
            <TextInput
              style={[styles.priceInput,]}
              placeholder={t('max')}
              placeholderTextColor={Colors.mediumGray}
              keyboardType='numeric'
              value={maxPrice}
              onChangeText={setMaxPrice}
            />
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
          <Text style={styles.applyButtonText}>
            {t('seeResults')}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default FilterScreen;
