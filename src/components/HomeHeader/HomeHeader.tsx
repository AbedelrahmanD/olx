import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '../../theme/Colors';
import { styles } from './HomeHeader.styles';

const HomeHeader = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.locationContainer}>
        <Icon name="map-marker-outline" size={20} color={Colors.accent} />
        <Text style={styles.locationText}>Lebanon</Text>
        <Icon name="chevron-down" size={20} color={Colors.black} />
      </TouchableOpacity>
      
      <View style={styles.searchContainer}>
        <Icon name="magnify" size={24} color={Colors.mediumGray} style={styles.searchIcon} />
        <TextInput
          placeholder="What are you looking for?"
          placeholderTextColor={Colors.mediumGray}
          style={styles.searchInput}
        />
      </View>
    </View>
  );
};

export default HomeHeader;
