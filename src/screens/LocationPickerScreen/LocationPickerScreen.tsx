import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from './LocationPickerScreen.styles';
import { LocationService, Location } from '../../services/LocationService';
import { useLanguage } from '../../context/LanguageContext';
import { useFilters } from '../../context/FilterContext';
import { Colors } from '../../theme/Colors';
import { GlobalStyles } from '../../theme/GlobalStyles';

const LocationPickerScreen = ({ navigation, route }: any) => {
  const { t, language } = useLanguage();
  const { updateFilters } = useFilters();
  const { parentLocation } = route.params || {};
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Level logic: Lebanon 0, Region 1, City 2
  const targetLevel = parentLocation ? parentLocation.level + 1 : 1;

  useEffect(() => {
    const fetchLocations = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await LocationService.getLocations(
          parentLocation?.externalID || '0-1',
          targetLevel
        );
        setLocations(data);
      } catch (err) {
        const message = t('somethingWentWrong');
        setError(message);
        Alert.alert(t('errorTitle'), message);
      } finally {
        setLoading(false);
      }
    };
    fetchLocations();
  }, [parentLocation, targetLevel, t]);

  const handleLocationPress = useCallback((item: Location) => {
    if (item.level < 2) {
      // Navigate deeper
      navigation.push('LocationPicker', {
        parentLocation: item
      });
    } else {
      // Final Area Selection 
      // As requested: pop twice then navigate to filter screen
      updateFilters({ location: item });
      navigation.pop(2);
      navigation.navigate({
        name: 'FilterScreen',
        merge: true,
      });
    }
  }, [navigation]);

  const renderItem = ({ item }: { item: Location }) => {
    const name = language === 'ar' ? item.name_l1 : item.name;
    const isRegion = item.level === 1;

    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => handleLocationPress(item)}
      >
        <View style={styles.iconCircle}>
          <Icon name="map-marker" size={20} color={Colors.mediumGray} />
        </View>
        <View style={styles.nameWrapper}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{name}</Text>
            <View style={[styles.badge, isRegion ? styles.regionBadge : styles.cityBadge]}>
              <Text style={[styles.badgeText, isRegion ? styles.regionBadgeText : styles.cityBadgeText]}>
                {isRegion ? (language === 'ar' ? 'منطقة' : 'REGION') : (language === 'ar' ? 'مدينة' : 'CITY')}
              </Text>
            </View>
          </View>
          <Text style={styles.subText}>ID: {item.externalID} • Level: {item.level}</Text>
        </View>
        {item.level < 2 && (
          <Icon
            name={language === 'ar' ? 'chevron-left' : 'chevron-right'}
            size={18}
            color="#ccc"
          />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="close" size={24} color="#002f34" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {parentLocation ? (language === 'ar' ? parentLocation.name_l1 : parentLocation.name) : t('location')}
        </Text>
        <View style={{ width: 24 }} />
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#00a49f" />
        </View>
      ) : error ? (
        <View style={styles.center}>
          <Text style={GlobalStyles.errorText}>{error}</Text>
        </View>
      ) : (
        <FlatList
          data={locations}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          ListHeaderComponent={!parentLocation ? (
            <TouchableOpacity
              style={styles.item}
              onPress={() => {
                updateFilters({ location: { externalID: '0-1', name: 'Lebanon', name_l1: 'لبنان' } });
                navigation.pop(1);
                navigation.navigate({
                  name: 'FilterScreen',
                  merge: true,
                });

              }}
            >
              <View style={styles.iconCircle}>
                <Icon name="earth" size={20} color="#01579b" />
              </View>
              <View style={styles.nameWrapper}>
                <Text style={[styles.name, { color: '#01579b' }]}>{t('allLebanon')}</Text>
              </View>
            </TouchableOpacity>
          ) : null}
        />
      )}
    </SafeAreaView>
  );
};

export default LocationPickerScreen;
