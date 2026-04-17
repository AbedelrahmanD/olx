import React from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import { Category } from '../../../types';
import { styles } from '../CategoryList.styles';
import { useLanguage } from '../../../context/LanguageContext';

const IMAGE_MAP: { [key: string]: any } = {
  'vehicles': require('../../../assets/images/categories/vehicles.png'),
  'properties': require('../../../assets/images/categories/property.png'),
  'mobile-phones-accessories': require('../../../assets/images/categories/mobile-phones-accessories.png'),
  'electronics-home-appliances': require('../../../assets/images/categories/electronics-home-appliances.png'),
  'home-furniture-decor': require('../../../assets/images/categories/home-furniture-decor.png'),
  'business-industrial': require('../../../assets/images/categories/business-industrial.png'),
  'pets': require('../../../assets/images/categories/pets.png'),
  'services': require('../../../assets/images/categories/services.png'),
  'jobs': require('../../../assets/images/categories/jobs.png'),
  'kids-babies': require('../../../assets/images/categories/kids-babies.png'),
  'fashion-beauty': require('../../../assets/images/categories/fashion-beauty.png'),
  'sports-equipment': require('../../../assets/images/categories/sports-equipment.png'),
  'hobbies-music-art-books': require('../../../assets/images/categories/hobbies-music-art-books.png'),
};

type CategoryItemProps = {
  item: Category;
};

const CategoryItem = ({ item }: CategoryItemProps) => {
  const { language } = useLanguage();
  const displayName = language === 'ar' ? item.name_l1 : item.name;

  return (
    <TouchableOpacity style={styles.categoryItem}>
      <View style={styles.iconContainer}>
        {IMAGE_MAP[item.slug] ? (
          <Image
            source={IMAGE_MAP[item.slug]}
            style={styles.categoryIcon}
          />
        ) : (
          <View style={styles.categoryIcon} />
        )}
      </View>
      <Text style={styles.categoryName} numberOfLines={2}>
        {displayName}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryItem;
