import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { AdService } from '../../services/AdService';
import { Ad, SearchHit } from '../../types';
import AdCard from '../AdCard/AdCard';
import { styles } from './AdListSection.styles';
import { Colors } from '../../theme/Colors';
import { GlobalStyles } from '../../theme/GlobalStyles';

type AdListSectionProps = {
  title: string;
  categoryExternalID?: string;
};

const AdListSection = ({ title, categoryExternalID }: AdListSectionProps) => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAds = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await AdService.searchAds(categoryExternalID);
        const hits = response?.hits?.hits || [];
        setAds(hits.map((h: SearchHit) => h._source));
      } catch (err) {
        const message = 'Failed to load ads. Please check your connection.';
        setError(message);
        Alert.alert('Error', message);
      } finally {
        setLoading(false);
      }
    };
    fetchAds();
  }, [categoryExternalID, title]);

  const renderAdCard = ({ item }: { item: Ad }) => (
    <AdCard ad={item} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>{title}</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>See all</Text>
        </TouchableOpacity>
      </View>
      
      {loading ? (
        <View style={{ height: 150, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size='small' color={Colors.primary} />
        </View>
      ) : error ? (
        <Text style={[GlobalStyles.errorText, { margin: 20 }]}>{error}</Text>
      ) : (
        <FlatList
          data={ads}
          renderItem={renderAdCard}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};

export default AdListSection;
