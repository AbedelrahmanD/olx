import React from 'react';
import { View, Image, FlatList } from 'react-native';
import { styles } from './Banner.styles';

const BANNERS = [
  require('../../assets/images/banners/one.jpeg'),
  require('../../assets/images/banners/two.jpeg'),
  require('../../assets/images/banners/three.jpeg'),
];

const Banner = () => {
  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.container}>
      <Image 
        source={item} 
        style={styles.bannerImage}
      />
    </View>
  );

  return (
    <FlatList
      data={BANNERS}
      renderItem={renderItem}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      keyExtractor={(_, index) => index.toString()}
    />
  );
};

export default Banner;
