import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Ad } from '../../types/Ad';
import { styles } from './SearchAdCard.styles';
import { Colors } from '../../theme/Colors';
import { getRelativeTime } from '../../utils/DateUtils';
import { useLanguage } from '../../context/LanguageContext';

type SearchAdCardProps = {
  ad: Ad;
};

const SearchAdCard = ({ ad }: SearchAdCardProps) => {
  const { t, language } = useLanguage();

  const getFormattedAttr = (attr: string) =>
    ad.formattedExtraFields?.find((f) => f.attribute === attr)?.formattedValue;

  const price = getFormattedAttr('price');
  const year = getFormattedAttr('year');
  const fuel = getFormattedAttr('fuel');
  const mileage = getFormattedAttr('mileage');

  const imageUrl = `https://images.olx.com.lb/thumbnails/${ad.coverPhoto.id}-400x300.webp`;
  const isElite = true;
  const isVerified = true;

  return (
    <View style={styles.container}>
      {isElite && (
        <View style={[styles.eliteBadge, { flexDirection: language === 'ar' ? 'row-reverse' : 'row' }]}>
          <Icon name='crown' size={14} color='#a38119' />
          <Text style={styles.eliteText}>{t('elite')}</Text>
        </View>
      )}

      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
        {isVerified && (
          <View style={[styles.verifiedBadge, { flexDirection: language === 'ar' ? 'row-reverse' : 'row' }]}>
            <Icon name='check-decagram' size={14} color='#fff' />
            <Text style={styles.verifiedText}>{t('verified')}</Text>
          </View>
        )}
        <TouchableOpacity style={styles.favButton}>
          <Icon name='heart-outline' size={24} color='#fff' />
        </TouchableOpacity>
      </View>

      <View style={styles.details}>
        <Text style={[styles.price, { textAlign: language === 'ar' ? 'right' : 'left' }]}>
          {t('usd')} {price || '0'}
        </Text>

        <Text style={[styles.title, { textAlign: language === 'ar' ? 'right' : 'left' }]} numberOfLines={2}>
          {language === 'ar' ? ad.title_l1 : ad.title}
        </Text>

        <View style={[styles.infoRow, { flexDirection: language === 'ar' ? 'row-reverse' : 'row' }]}>
          {year && (
            <View style={[styles.infoItem, { flexDirection: language === 'ar' ? 'row-reverse' : 'row' }]}>
              <Icon name='calendar-outline' size={16} color={Colors.mediumGray} />
              <Text style={styles.infoText}>{year}</Text>
            </View>
          )}
          {fuel && (
            <View style={[styles.infoItem, { flexDirection: language === 'ar' ? 'row-reverse' : 'row' }]}>
              <Icon name='gas-station-outline' size={16} color={Colors.mediumGray} />
              <Text style={styles.infoText}>{fuel}</Text>
            </View>
          )}
          {mileage && (
            <View style={[styles.infoItem, { flexDirection: language === 'ar' ? 'row-reverse' : 'row' }]}>
              <Icon name='gauge' size={16} color={Colors.mediumGray} />
              <Text style={styles.infoText}>{mileage}</Text>
            </View>
          )}
        </View>

        <Text style={[styles.address, { textAlign: language === 'ar' ? 'right' : 'left' }]}>
          {language === 'ar' ? ad.location?.lvl2?.name_l1 : ad.location?.lvl2?.name}, {language === 'ar' ? ad.location?.lvl1?.name_l1 : ad.location?.lvl1?.name}
        </Text>

        <Text style={[styles.time, { textAlign: language === 'ar' ? 'right' : 'left' }]}>
          {getRelativeTime(ad.createdAt, language)}
        </Text>

        <View style={[styles.actions, { flexDirection: language === 'ar' ? 'row-reverse' : 'row' }]}>
          <TouchableOpacity style={styles.whatsappButton}>
            <Icon name='whatsapp' size={20} color='#25D366' />
          </TouchableOpacity>
          <TouchableOpacity style={styles.callButton}>
            <Icon name='phone-outline' size={20} color={Colors.primary} />
            <Text style={styles.callText}>{t('call')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SearchAdCard;
