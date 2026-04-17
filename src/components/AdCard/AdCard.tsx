import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Ad } from '../../types';
import { styles } from './AdCard.styles';

type AdCardProps = {
  ad: Ad;
};

const AdCard = ({ ad }: AdCardProps) => {
  const getParam = (id: string) => ad.parameters?.find((p) => p.id === id)?.formattedValue;

  const area = getParam('area');
  const bedrooms = getParam('bedrooms');
  const bathrooms = getParam('bathrooms');

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.9}>
      <Image 
        source={{ uri: ad.images?.[0]?.url }} 
        style={styles.image} 
      />
      <View style={styles.content}>
        <View style={styles.priceRow}>
          <Text style={styles.price}>
            {ad.price?.currency} {ad.price?.value?.toLocaleString()}
          </Text>
          <Icon name="heart-outline" size={20} color="#002f34" />
        </View>

        <Text style={styles.title} numberOfLines={2}>
          {ad.title}
        </Text>

        <View style={styles.paramsRow}>
          {area && (
            <View style={styles.paramItem}>
              <Icon name="vector-square" size={14} color="#7f9799" />
              <Text style={styles.paramText}>{area}</Text>
            </View>
          )}
          {bedrooms && (
            <View style={styles.paramItem}>
              <Icon name="bed-outline" size={14} color="#7f9799" />
              <Text style={styles.paramText}>{bedrooms}</Text>
            </View>
          )}
          {bathrooms && (
            <View style={styles.paramItem}>
              <Icon name="shower" size={14} color="#7f9799" />
              <Text style={styles.paramText}>{bathrooms}</Text>
            </View>
          )}
        </View>

        <Text style={styles.location} numberOfLines={1}>
          {ad.location?.city?.name}, {ad.location?.region?.name}
        </Text>
        
        <Text style={styles.time}>
          6 days ago
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default AdCard;
