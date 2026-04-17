import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from './CategoryPickerScreen.styles';
import { CategoryService } from '../../services/CategoryService';
import { Category } from '../../types/Category';
import { useLanguage } from '../../context/LanguageContext';
import { CATEGORY_IMAGE_MAP } from '../../utils/CategoryImageMap';
import { Colors } from '../../theme/Colors';
import { GlobalStyles } from '../../theme/GlobalStyles';

const CategoryPickerScreen = ({ navigation }: any) => {
  const { t, language } = useLanguage();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await CategoryService.getCategories();
        setCategories(data);
      } catch (err) {
        const message = t('somethingWentWrong');
        setError(message);
        Alert.alert(t('errorTitle'), message);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, [t]);

  const handleCategoryPress = (item: Category) => {
    if (item.children && item.children.length > 0) {
      // Navigate to subcategory selection, passing this item as root
      navigation.push('SubCategory', {
        category: item,
        rootCategory: item
      });
    } else {
      // Direct navigation to ad list
      navigation.navigate('AdList', {
        category: item,
        rootCategory: item
      });
    }
  };

  const renderItem = ({ item }: { item: Category }) => {
    const name = language === 'ar' ? item.name_l1 : item.name;
    const icon = CATEGORY_IMAGE_MAP[item.slug];

    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => handleCategoryPress(item)}
      >
        <View style={[styles.iconContainer, language === 'ar' ? { marginLeft: 16, marginRight: 0 } : { marginRight: 16 }]}>
          {icon ? (
            <Image source={icon} style={styles.icon} resizeMode="contain" />
          ) : (
            <Icon name="tag" size={24} color="#ccc" />
          )}
        </View>
        <Text style={[styles.name, { textAlign: language === 'ar' ? 'right' : 'left' }]}>
          {name}
        </Text>
        <Icon
          name={language === 'ar' ? 'chevron-left' : 'chevron-right'}
          size={24}
          color="#ccc"
        />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name={language === 'ar' ? 'arrow-right' : 'arrow-left'} size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('browseCategories')}</Text>
        <View style={{ width: 24 }} />
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      ) : error ? (
        <View style={styles.center}>
          <Text style={GlobalStyles.errorText}>{error}</Text>
        </View>
      ) : (
        <FlatList
          data={categories}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
        />
      )}
    </SafeAreaView>
  );
};

export default CategoryPickerScreen;
