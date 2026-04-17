import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { AdService } from '../../services/AdService';
import { Ad } from '../../types/Ad';
import { SearchHit } from '../../types/Search';
import AdCard from '../AdCard/AdCard';
import { styles } from './AdListSection.styles';
import { Colors } from '../../theme/Colors';
import { GlobalStyles } from '../../theme/GlobalStyles';
import { useLanguage } from '../../context/LanguageContext';

type AdListSectionProps = {
  title: string;
  categoryExternalID?: string;
};

const AdListSection = ({ title, categoryExternalID }: AdListSectionProps) => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { language, t } = useLanguage();

  useEffect(() => {
    const fetchAds = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await AdService.searchAds(categoryExternalID);
        const hits = response?.hits?.hits || [];
        setAds(hits.map((h: SearchHit) => h._source));
      } catch (err) {
        const message = t('fetchError');
        setError(message);
        Alert.alert(t('errorTitle'), message);
      } finally {
        setLoading(false);
      }
    };
    fetchAds();
  }, [categoryExternalID, language, t]);

  const renderAdCard = ({ item }: { item: Ad }) => (
    <AdCard ad={item} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>{title}</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>{t('seeAll')}</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size='small' color={Colors.primary} />
        </View>
      ) : error ? (
        <Text style={[GlobalStyles.errorText, { margin: 20 }]}>{error}</Text>
      ) : (
        <FlatList
          data={ads}
          renderItem={renderAdCard}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};

export default AdListSection;
