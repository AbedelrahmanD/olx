import React, { useEffect, useState, useCallback } from 'react';
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

const AdListScreen = ({ route, navigation }: any) => {
  const { category } = route.params;
  const { language, t } = useLanguage();
  const [ads, setAds] = useState<Ad[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchAds = useCallback(async () => {
    setLoading(true);
    try {
      const response = await AdService.searchAds(category.externalID, searchQuery);
      const hits = response?.hits?.hits || [];
      setAds(hits.map((h: SearchHit) => h._source));
      setTotal(response?.hits?.total?.value || 0);
    } catch (err) {
      Alert.alert(t('errorTitle'), t('fetchError'));
    } finally {
      setLoading(false);
    }
  }, [category.externalID, searchQuery, t]);

  useEffect(() => {
    fetchAds();
  }, [fetchAds]);

  const renderHeader = () => (
    <View style={styles.listHeader}>
      <View style={[styles.filterBar, { flexDirection: language === 'ar' ? 'row-reverse' : 'row' }]}>
        <TouchableOpacity style={styles.filterChip}>
          <Icon name='filter-variant' size={16} color={Colors.primary} />
          <Text style={styles.filterChipText}>{t('filters')}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.filterChip}>
          <Text style={styles.filterChipText}>{t('allCountry')}</Text>
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
          <Icon name='magnify' size={20} color={Colors.mediumGray} />
          <TextInput
            placeholder={t('searchPlaceholder')}
            placeholderTextColor={Colors.mediumGray}
            style={[styles.searchInput, { textAlign: language === 'ar' ? 'right' : 'left' }]}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onBlur={fetchAds}
          />
        </View>
      </View>

      {loading && ads.length === 0 ? (
        <View style={styles.center}>
          <ActivityIndicator size='large' color={Colors.primary} />
        </View>
      ) : (
        <FlatList
          data={ads}
          renderItem={({ item }) => <SearchAdCard ad={item} />}
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={renderHeader}
          contentContainerStyle={styles.listContent}
        />
      )}
    </SafeAreaView>
  );
};

export default AdListScreen;
