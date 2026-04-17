import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, SafeAreaView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { AdService } from '../../services/AdService';
import { Ad, SearchHit } from '../../types';
import ListItemAdCard from '../../components/ListItemAdCard/ListItemAdCard';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from './SearchScreen.styles';
import { Colors } from '../../theme/Colors';
import { GlobalStyles } from '../../theme/GlobalStyles';

const SearchScreen = () => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    setLoading(true);
    try {
      const response = await AdService.searchAds();
      const hits = response?.hits?.hits || [];
      setAds(hits.map((h: SearchHit) => h._source));
      setTotal(response?.hits?.total?.value || 0);
    } catch (err) {
      Alert.alert('Error', 'Failed to fetch search results. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const renderAdItem = ({ item }: { item: Ad }) => (
    <ListItemAdCard ad={item} />
  );

  return (
    <SafeAreaView style={GlobalStyles.screenContainer}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name='arrow-left' size={24} color={Colors.black} />
        </TouchableOpacity>
        <View style={styles.searchInfo}>
          <Text style={styles.resultCount}>{total} ads</Text>
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Icon name='filter-variant' size={20} color={Colors.black} />
          <Text style={styles.filterText}>Filter</Text>
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
          keyExtractor={(item) => item.id}
          style={styles.list}
          refreshing={loading}
          onRefresh={fetchResults}
          ListEmptyComponent={
            <View style={GlobalStyles.center}>
              <Text>No ads found.</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
};

export default SearchScreen;
