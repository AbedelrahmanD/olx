import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Ad } from '../../types';
import { styles } from './ListItemAdCard.styles';
import { Colors } from '../../theme/Colors';
import { getRelativeTime } from '../../utils/DateUtils';
import { useLanguage } from '../../context/LanguageContext';

type ListItemAdCardProps = {
  ad: Ad;
};

const ListItemAdCard = ({ ad }: ListItemAdCardProps) => {
  const { t, language } = useLanguage();

  const getFormattedAttr = (attr: string) =>
    ad.formattedExtraFields?.find((f) => f.attribute === attr)?.formattedValue;

  const price = getFormattedAttr('price');

  const imageUrl = `https://images.olx.com.lb/thumbnails/${ad.coverPhoto.id}-400x300.webp`;

  const displayTitle = language === 'ar' ? ad.title_l1 : ad.title;
  const locationLvl2 = language === 'ar' ? ad.location?.lvl2?.name_l1 : ad.location?.lvl2?.name;
  const locationLvl1 = language === 'ar' ? ad.location?.lvl1?.name_l1 : ad.location?.lvl1?.name;

  return (
    <TouchableOpacity style={[styles.card, { flexDirection: language === 'ar' ? 'row-reverse' : 'row' }]}>
      <Image
        source={{ uri: imageUrl }}
        style={styles.image}
      />
      <View style={[styles.content, { alignItems: language === 'ar' ? 'flex-end' : 'flex-start' }]}>
        <View style={[styles.topRow, { flexDirection: language === 'ar' ? 'row-reverse' : 'row' }]}>
          <Text style={styles.price}>
            {t('usd')} {price || '0'}
          </Text>
          <Icon name='heart-outline' size={20} color={Colors.black} />
        </View>
        
        <Text style={[styles.title, { textAlign: language === 'ar' ? 'right' : 'left' }]} numberOfLines={2}>
          {displayTitle}
        </Text>

        <View style={[styles.bottomRow, { flexDirection: language === 'ar' ? 'row-reverse' : 'row' }]}>
          <Text style={styles.location} numberOfLines={1}>
            {locationLvl2 || locationLvl1}, {locationLvl1}
          </Text>
          <Text style={styles.time}>
            {getRelativeTime(ad.createdAt, language)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ListItemAdCard;
