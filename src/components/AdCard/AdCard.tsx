import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Ad } from '../../types';
import { styles } from './AdCard.styles';
import { Colors } from '../../theme/Colors';
import { getRelativeTime } from '../../utils/DateUtils';

type AdCardProps = {
  ad: Ad;
};

const AdCard = ({ ad }: AdCardProps) => {
  // Extract attributes from formattedExtraFields
  const getFormattedAttr = (attr: string) =>
    ad.formattedExtraFields?.find((f) => f.attribute === attr)?.formattedValue;

  const price = getFormattedAttr('price');
  const area = getFormattedAttr('ft');
  const mileage = getFormattedAttr('mileage');
  const year = getFormattedAttr('year');
  const rooms = getFormattedAttr('rooms');
  const bathrooms = getFormattedAttr('bathrooms');

  // Construct image URL: https://olx-lb-production.s3.eu-west-1.amazonaws.com/image/{id}/{externalID}
  const mainPhoto = ad.photos?.[0] || ad.coverPhoto;
  // const imageUrl = mainPhoto
  //   ? `https://olx-lb-production.s3.eu-west-1.amazonaws.com/image/${mainPhoto.id}/${mainPhoto.externalID}`
  //   : null;
  const imageUrl = `https://images.olx.com.lb/thumbnails/${ad.id}-800x600.webp`;

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.9}>
      <View style={{ backgroundColor: Colors.gray, height: 120 }}>
        {imageUrl && (
          <Image
            source={{ uri: imageUrl }}
            style={styles.image}
          />
        )}
      </View>

      <View style={styles.content}>
        <View style={styles.priceRow}>
          <Text style={styles.price}>
            USD {price || '0'}
          </Text>
          <Icon name='heart-outline' size={20} color='#002f34' />
        </View>

        <Text style={styles.title} numberOfLines={2}>
          {ad.title}
        </Text>

        <View style={styles.paramsRow}>
          {rooms && (
            <View style={styles.paramItem}>
              <Icon name='bed-outline' size={14} color='#7f9799' />
              <Text style={styles.paramText}>{rooms}</Text>
            </View>
          )}
          {bathrooms && (
            <View style={styles.paramItem}>
              <Icon name='shower' size={14} color='#7f9799' />
              <Text style={styles.paramText}>{bathrooms}</Text>
            </View>
          )}
          {area && (
            <View style={styles.paramItem}>
              <Icon name='vector-square' size={14} color='#7f9799' />
              <Text style={styles.paramText}>{area} m²</Text>
            </View>
          )}
          {mileage && (
            <View style={styles.paramItem}>
              <Icon name='gauge' size={14} color='#7f9799' />
              <Text style={styles.paramText}>{mileage} km</Text>
            </View>
          )}
          {year && !area && (
            <View style={styles.paramItem}>
              <Icon name='calendar-outline' size={14} color='#7f9799' />
              <Text style={styles.paramText}>{year}</Text>
            </View>
          )}
        </View>

        <Text style={styles.location} numberOfLines={1}>
          {ad.location?.lvl2?.name || ad.location?.lvl1?.name}, {ad.location?.lvl1?.name}
        </Text>

        <Text style={styles.time}>
          {getRelativeTime(ad.createdAt)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default AdCard;
