import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AdService } from '../../services/AdService';
import { Ad, SearchHit } from '../../types';
import ListItemAdCard from '../../components/ListItemAdCard/ListItemAdCard';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from './SearchScreen.styles';
import { Colors } from '../../theme/Colors';
import { GlobalStyles } from '../../theme/GlobalStyles';
import { useLanguage } from '../../context/LanguageContext';

const SearchScreen = () => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const { t, language } = useLanguage();

  const fetchResults = useCallback(async () => {
    setLoading(true);
    try {
      const response = await AdService.searchAds(undefined);
      const hits = response?.hits?.hits || [];
      setAds(hits.map((h: SearchHit) => h._source));
      setTotal(response?.hits?.total?.value || 0);
    } catch (err) {
      Alert.alert(t('errorTitle'), t('fetchError'));
    } finally {
      setLoading(false);
    }
  }, [language, t]);

  useEffect(() => {
    fetchResults();
  }, [fetchResults]);

  const renderAdItem = ({ item }: { item: Ad }) => (
    <ListItemAdCard ad={item} />
  );

  return (
    <SafeAreaView style={GlobalStyles.screenContainer}>
      <View style={[styles.header, { flexDirection: language === 'ar' ? 'row-reverse' : 'row' }]}>
        <TouchableOpacity>
          <Icon name={language === 'ar' ? 'arrow-right' : 'arrow-left'} size={24} color={Colors.black} />
        </TouchableOpacity>
        <View style={styles.searchInfo}>
          <Text style={styles.resultCount}>{total} {t('latestAds')}</Text>
        </View>
        <TouchableOpacity style={[styles.filterButton, { flexDirection: language === 'ar' ? 'row-reverse' : 'row' }]}>
          <Icon name='filter-variant' size={20} color={Colors.black} />
          <Text style={styles.filterText}>{t('filters')}</Text>
        </TouchableOpacity>
      </View>

      {loading && ads.length === 0 ? (
        <View style={GlobalStyles.center}>
          <ActivityIndicator size='large' color={Colors.primary} />
        </View>
      ) : (
        <FlatList
          data={ads}
          renderItem={renderAdItem}
          keyExtractor={(item) => item.id.toString()}
          style={styles.list}
          refreshing={loading}
          onRefresh={fetchResults}
          ListEmptyComponent={
            <View style={GlobalStyles.center}>
              <Text>{t('noAds')}</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
};

export default SearchScreen;
