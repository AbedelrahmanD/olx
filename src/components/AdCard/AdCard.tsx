import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Ad } from '../../types/Ad';
import { styles } from './AdCard.styles';
import { Colors } from '../../theme/Colors';
import { getRelativeTime } from '../../utils/DateUtils';
import { useLanguage } from '../../context/LanguageContext';

type AdCardProps = {
  ad: Ad;
};

const AdCard = ({ ad }: AdCardProps) => {
  const { t, language } = useLanguage();

  const getFormattedAttr = (attr: string) =>
    ad.formattedExtraFields?.find((f) => f.attribute === attr)?.formattedValue;

  const price = getFormattedAttr('price');
  const area = getFormattedAttr('ft');
  const mileage = getFormattedAttr('mileage');
  const year = getFormattedAttr('year');
  const rooms = getFormattedAttr('rooms');
  const bathrooms = getFormattedAttr('bathrooms');

  const imageUrl = `https://images.olx.com.lb/thumbnails/${ad.coverPhoto.id}-400x300.webp`;

  const displayTitle = language === 'ar' ? ad.title_l1 : ad.title;
  const locationLvl2 = language === 'ar' ? ad.location?.lvl2?.name_l1 : ad.location?.lvl2?.name;
  const locationLvl1 = language === 'ar' ? ad.location?.lvl1?.name_l1 : ad.location?.lvl1?.name;

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.9}>
      <View style={{ backgroundColor: Colors.gray, height: 120 }}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
        />
      </View>

      <View style={styles.content}>
        <View style={[styles.priceRow, { flexDirection: language === 'ar' ? 'row-reverse' : 'row' }]}>
          <Text style={styles.price}>
            {t('usd')} {price || '0'}
          </Text>
          <Icon name='heart-outline' size={20} color='#002f34' />
        </View>

        <Text style={[styles.title, { textAlign: language === 'ar' ? 'right' : 'left' }]} numberOfLines={2}>
          {displayTitle}
        </Text>

        <View style={[styles.paramsRow, { flexDirection: language === 'ar' ? 'row-reverse' : 'row' }]}>
          {rooms && (
            <View style={[styles.paramItem, { flexDirection: language === 'ar' ? 'row-reverse' : 'row' }]}>
              <Icon name='bed-outline' size={14} color='#7f9799' />
              <Text style={styles.paramText}>{rooms}</Text>
            </View>
          )}
          {bathrooms && (
            <View style={[styles.paramItem, { flexDirection: language === 'ar' ? 'row-reverse' : 'row' }]}>
              <Icon name='shower' size={14} color='#7f9799' />
              <Text style={styles.paramText}>{bathrooms}</Text>
            </View>
          )}
          {area && (
            <View style={[styles.paramItem, { flexDirection: language === 'ar' ? 'row-reverse' : 'row' }]}>
              <Icon name='vector-square' size={14} color='#7f9799' />
              <Text style={styles.paramText}>{area} {t('m2')}</Text>
            </View>
          )}
          {mileage && (
            <View style={[styles.paramItem, { flexDirection: language === 'ar' ? 'row-reverse' : 'row' }]}>
              <Icon name='gauge' size={14} color='#7f9799' />
              <Text style={styles.paramText}>{mileage} {t('km')}</Text>
            </View>
          )}
          {year && !area && (
            <View style={[styles.paramItem, { flexDirection: language === 'ar' ? 'row-reverse' : 'row' }]}>
              <Icon name='calendar-outline' size={14} color='#7f9799' />
              <Text style={styles.paramText}>{year}</Text>
            </View>
          )}
        </View>

        <Text style={[styles.location, { textAlign: language === 'ar' ? 'right' : 'left' }]} numberOfLines={1}>
          {locationLvl2 || locationLvl1}, {locationLvl1}
        </Text>

        <Text style={[styles.time, { textAlign: language === 'ar' ? 'right' : 'left' }]}>
          {getRelativeTime(ad.createdAt, language)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default AdCard;
