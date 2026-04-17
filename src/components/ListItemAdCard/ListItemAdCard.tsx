import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Ad } from '../../types';
import { styles } from './ListItemAdCard.styles';
import { Colors } from '../../theme/Colors';

type ListItemAdCardProps = {
  ad: Ad;
};

const ListItemAdCard = ({ ad }: ListItemAdCardProps) => {
  return (
    <TouchableOpacity style={styles.card}>
      <Image
        source={{ uri: ad.images?.[0]?.url || 'https://via.placeholder.com/120x120?text=No+Image' }}
        style={styles.image}
      />
      <View style={styles.content}>
        <View style={styles.topRow}>
          <Text style={styles.price}>
            {ad.price.currency} {ad.price.value?.toLocaleString()}
          </Text>
          <Icon name="heart-outline" size={20} color={Colors.black} />
        </View>
        
        <Text style={styles.title} numberOfLines={2}>
          {ad.title}
        </Text>

        <View style={styles.bottomRow}>
          <Text style={styles.location} numberOfLines={1}>
            {ad.location.name}
          </Text>
          <Text style={styles.time}>
            {ad.created_at}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ListItemAdCard;
