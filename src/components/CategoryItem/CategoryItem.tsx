import React from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import { Category } from '../../types/Category';
import { styles } from './CategoryItem.styles';
import { useLanguage } from '../../context/LanguageContext';
import { useNavigation } from '@react-navigation/native';

import { CATEGORY_IMAGE_MAP } from '../../utils/CategoryImageMap';

type CategoryItemProps = {
  item: Category;
};

const CategoryItem = ({ item }: CategoryItemProps) => {
  const { language } = useLanguage();
  const navigation = useNavigation<any>();
  const displayName = language === 'ar' ? item.name_l1 : item.name;

  const handlePress = () => {
    if (item.children && item.children.length > 0) {
      navigation.navigate('SubCategory', { category: item });
    } else {
      navigation.navigate('AdList', { category: item });
    }
  };

  return (
    <TouchableOpacity style={styles.categoryItem} onPress={handlePress}>
      <View style={styles.iconContainer}>
        {CATEGORY_IMAGE_MAP[item.slug] ? (
          <Image
            source={CATEGORY_IMAGE_MAP[item.slug]}
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
