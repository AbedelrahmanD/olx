import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Category } from '../../types/Category';
import { useLanguage } from '../../context/LanguageContext';
import { Colors } from '../../theme/Colors';
import { styles } from './SubCategoryItem.styles';

type SubCategoryItemProps = {
  item: Category;
  onPress: () => void;
};

const SubCategoryItem = ({ item, onPress }: SubCategoryItemProps) => {
  const { language } = useLanguage();
  const displayName = language === 'ar' ? item.name_l1 : item.name;

  return (
    <TouchableOpacity
      style={[styles.item, { flexDirection: language === 'ar' ? 'row-reverse' : 'row' }]}
      onPress={onPress}
    >
      <View style={[styles.leftSection, { flexDirection: language === 'ar' ? 'row-reverse' : 'row' }]}>
        <Text style={styles.itemName}>{displayName}</Text>
      </View>
      
      <Icon
        name={language === 'ar' ? 'chevron-left' : 'chevron-right'}
        size={24}
        color={Colors.mediumGray}
      />
    </TouchableOpacity>
  );
};

export default SubCategoryItem;
