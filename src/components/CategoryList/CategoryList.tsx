import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { CategoryService } from '../../services/CategoryService';
import { Category } from '../../types/Category';
import { styles } from './CategoryList.styles';
import CategoryItem from '../CategoryItem/CategoryItem';
import { Colors } from '../../theme/Colors';
import { GlobalStyles } from '../../theme/GlobalStyles';
import { useLanguage } from '../../context/LanguageContext';

const CategoryList = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { t, language } = useLanguage();

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

  if (loading) {
    return (
      <View style={[styles.container, { height: 100, justifyContent: 'center' }]}>
        <ActivityIndicator size='small' color={Colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={GlobalStyles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={[styles.headerContainer]}>
        <Text style={styles.headerTitle}>{language === 'ar' ? 'تصفح الفئات' : 'Browse Categories'}</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>{t('seeAll')}</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={categories}
        renderItem={({ item }) => <CategoryItem item={item} />}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

export default CategoryList;
