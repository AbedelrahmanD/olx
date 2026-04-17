import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Ad } from '../../types';
import { styles } from './ListItemAdCard.styles';
import { Colors } from '../../theme/Colors';
import { getRelativeTime } from '../../utils/DateUtils';

type ListItemAdCardProps = {
  ad: Ad;
};

const ListItemAdCard = ({ ad }: ListItemAdCardProps) => {
  // Extract attributes from formattedExtraFields
  const getFormattedAttr = (attr: string) =>
    ad.formattedExtraFields?.find((f) => f.attribute === attr)?.formattedValue;

  const price = getFormattedAttr('price');

  // Construct image URL
  const mainPhoto = ad.photos?.[0] || ad.coverPhoto;
  const imageUrl = mainPhoto
    ? `https://olx-lb-production.s3.eu-west-1.amazonaws.com/image/${mainPhoto.id}/${mainPhoto.externalID}`
    : 'https://via.placeholder.com/120x120?text=No+Image';

  return (
    <TouchableOpacity style={styles.card}>
      <Image
        source={{ uri: imageUrl }}
        style={styles.image}
      />
      <View style={styles.content}>
        <View style={styles.topRow}>
          <Text style={styles.price}>
            USD {price || '0'}
          </Text>
          <Icon name='heart-outline' size={20} color={Colors.black} />
        </View>
        
        <Text style={styles.title} numberOfLines={2}>
          {ad.title}
        </Text>

        <View style={styles.bottomRow}>
          <Text style={styles.location} numberOfLines={1}>
            {ad.location?.lvl2?.name || ad.location?.lvl1?.name}, {ad.location?.lvl1?.name}
          </Text>
          <Text style={styles.time}>
            {getRelativeTime(ad.createdAt)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ListItemAdCard;
