import React, { useEffect, useState, useCallback, useRef } from 'react';
import { View, Text, TouchableOpacity, FlatList, TextInput, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '../../theme/Colors';
import { useLanguage } from '../../context/LanguageContext';
import { AdService } from '../../services/AdService';
import { Ad } from '../../types/Ad';
import { SearchHit } from '../../types/Search';
import SearchAdCard from '../../components/SearchAdCard/SearchAdCard';
import { styles } from './AdListScreen.styles';
import { GlobalStyles } from '../../theme/GlobalStyles';

const AdListScreen = ({ route, navigation }: any) => {
  const { category, rootCategory } = route.params;
  const { language, t } = useLanguage();
  const [ads, setAds] = useState<Ad[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Filtering states
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  const [location, setLocation] = useState({
    externalID: '0-1',
    name: 'Lebanon',
    name_l1: 'لبنان'
  });

  const debounceTimer = useRef<any>(null);

  const fetchAds = useCallback(async (query: string, minP?: number, maxP?: number, locID: string = '0-1') => {
    setLoading(true);
    setError(null);
    try {
      const response = await AdService.searchAds(category.externalID, query, minP, maxP, locID);
      const hits = response?.hits?.hits || [];
      setAds(hits.map((h: SearchHit) => h._source));
      setTotal(response?.hits?.total?.value || 0);
    } catch (err) {
      const message = t('fetchError');
      setError(message);
      Alert.alert(t('errorTitle'), message);
    } finally {
      setLoading(false);
      setIsTyping(false);
    }
  }, [category.externalID, t]);

  // Handle Search Input with Debounce
  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
    setIsTyping(true);

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      fetchAds(text, minPrice, maxPrice, location.externalID);
    }, 500);
  };

  const handleOpenFilters = () => {
    navigation.navigate('FilterScreen', {
      category: category,
      rootCategory: rootCategory,
      initialMinPrice: minPrice,
      initialMaxPrice: maxPrice,
      initialLocation: location,
      onApply: (filters: { minPrice?: number, maxPrice?: number, location?: any }) => {
        setMinPrice(filters.minPrice);
        setMaxPrice(filters.maxPrice);
        if (filters.location) {
          setLocation(filters.location);
        }
        fetchAds(searchQuery, filters.minPrice, filters.maxPrice, filters.location?.externalID || location.externalID);
      }
    });
  };

  useEffect(() => {
    fetchAds('', minPrice, maxPrice, location.externalID);
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, []);

  const renderHeader = () => (
    <View style={styles.listHeader}>
      <View style={[styles.filterBar, { flexDirection: language === 'ar' ? 'row-reverse' : 'row' }]}>
        <TouchableOpacity style={styles.filterChip} onPress={handleOpenFilters}>
          <Icon name='filter-variant' size={16} color={Colors.primary} />
          <Text style={styles.filterChipText}>{t('filters')}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.filterChip} onPress={handleOpenFilters}>
          <Text style={styles.filterChipText}>
            {language === 'ar' ? location.name_l1 : location.name}
          </Text>
          <Icon name='chevron-down' size={16} color={Colors.mediumGray} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.filterChip}>
          <Text style={styles.filterChipText} numberOfLines={1}>{language === 'ar' ? category.name_l1 : category.name}</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.statusRow, { flexDirection: language === 'ar' ? 'row-reverse' : 'row' }]}>
        <Text style={styles.showingText}>
          {t('showing')}: {total} {t('resultsFor')} {language === 'ar' ? category.name_l1 : category.name}
        </Text>
        <TouchableOpacity style={[styles.sortButton, { flexDirection: language === 'ar' ? 'row-reverse' : 'row' }]}>
          <Text style={styles.sortText}>{t('sortBy')}</Text>
          <Icon name='swap-vertical' size={16} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={[styles.eliteSectionHeader, { flexDirection: language === 'ar' ? 'row-reverse' : 'row' }]}>
        <Text style={styles.eliteTitle}>{t('eliteAds')}</Text>
        <TouchableOpacity style={[styles.viewMore, { flexDirection: language === 'ar' ? 'row-reverse' : 'row' }]}>
          <Text style={styles.viewMoreText}>{t('viewMore')}</Text>
          <Icon name={language === 'ar' ? 'chevron-left' : 'chevron-right'} size={18} color={Colors.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.header, { flexDirection: language === 'ar' ? 'row-reverse' : 'row' }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name={language === 'ar' ? 'arrow-right' : 'arrow-left'} size={24} color={Colors.black} />
        </TouchableOpacity>

        <View style={[styles.searchContainer, { flexDirection: language === 'ar' ? 'row-reverse' : 'row' }]}>
          {isTyping || loading ? (
            <ActivityIndicator size='small' color={Colors.primary} />
          ) : (
            <Icon name='magnify' size={20} color={Colors.mediumGray} />
          )}
          <TextInput
            placeholder={t('searchPlaceholder')}
            placeholderTextColor={Colors.mediumGray}
            style={[styles.searchInput, { textAlign: language === 'ar' ? 'right' : 'left' }]}
            value={searchQuery}
            onChangeText={handleSearchChange}
          />
        </View>
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size='large' color={Colors.primary} />
        </View>
      ) : error ? (
        <View style={styles.center}>
          <Text style={GlobalStyles.errorText}>{error}</Text>
          <TouchableOpacity onPress={() => fetchAds(searchQuery, minPrice, maxPrice, location.externalID)} style={{ marginTop: 10 }}>
            <Text style={{ color: Colors.primary, fontWeight: 'bold' }}>{t('retry')}</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={ads}
          renderItem={({ item }) => <SearchAdCard ad={item} />}
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={renderHeader}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Icon name="magnify-close" size={60} color={Colors.mediumGray} />
              <Text style={styles.emptyText}>{t('noResults')}</Text>
            </View>
          }
          contentContainerStyle={styles.listContent}
          keyboardShouldPersistTaps='handled'
        />
      )}
    </SafeAreaView>
  );
};

export default AdListScreen;
