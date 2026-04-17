import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CategoryService } from '../../services/CategoryService';
import { styles } from './FilterScreen.styles';
import { Colors } from '../../theme/Colors';
import { GlobalStyles } from '../../theme/GlobalStyles';
import { useLanguage } from '../../context/LanguageContext';

const FilterScreen = () => {
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState({ id: '2', name: t('properties') });
  const [dynamicFields, setDynamicFields] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchFields = async () => {
      setLoading(true);
      try {
        const fields = await CategoryService.getCategoryFields(selectedCategory.id);
        setDynamicFields(fields);
      } catch (err) {
        Alert.alert(t('errorTitle'), t('fetchError'));
      } finally {
        setLoading(false);
      }
    };
    fetchFields();
  }, [selectedCategory, t]);

  return (
    <SafeAreaView style={GlobalStyles.screenContainer}>
      <View style={[styles.header, { flexDirection: language === 'ar' ? 'row-reverse' : 'row' }]}>
        <TouchableOpacity>
          <Icon name='close' size={24} color={Colors.black} />
        </TouchableOpacity>
        <Text style={styles.title}>{t('filters')}</Text>
        <TouchableOpacity>
          <Text style={styles.resetText}>{t('reset')}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={[styles.sectionTitle, { textAlign: language === 'ar' ? 'right' : 'left' }]}>
          {t('basicInformation')}
        </Text>
        
        <TouchableOpacity style={[styles.filterItem, { flexDirection: language === 'ar' ? 'row-reverse' : 'row' }]}>
          <Text style={styles.filterLabel}>{t('category')}</Text>
          <View style={[GlobalStyles.row, { flexDirection: language === 'ar' ? 'row-reverse' : 'row' }]}>
            <Text style={styles.filterValue}>{selectedCategory.name}</Text>
            <Icon name={language === 'ar' ? 'chevron-left' : 'chevron-right'} size={20} color={Colors.mediumGray} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.filterItem, { flexDirection: language === 'ar' ? 'row-reverse' : 'row' }]}>
          <Text style={styles.filterLabel}>{t('location')}</Text>
          <View style={[GlobalStyles.row, { flexDirection: language === 'ar' ? 'row-reverse' : 'row' }]}>
            <Text style={styles.filterValue}>{t('allLebanon')}</Text>
            <Icon name={language === 'ar' ? 'chevron-left' : 'chevron-right'} size={20} color={Colors.mediumGray} />
          </View>
        </TouchableOpacity>

        <Text style={[styles.sectionTitle, { textAlign: language === 'ar' ? 'right' : 'left' }]}>
          {t('priceUnits')}
        </Text>
        <View style={[styles.priceInputContainer, { flexDirection: language === 'ar' ? 'row-reverse' : 'row' }]}>
          <TextInput 
            placeholder={t('min')} 
            placeholderTextColor={Colors.mediumGray}
            style={[styles.priceInput, { textAlign: language === 'ar' ? 'right' : 'left' }]}
            keyboardType='numeric'
          />
          <TextInput 
            placeholder={t('max')} 
            placeholderTextColor={Colors.mediumGray}
            style={[styles.priceInput, { textAlign: language === 'ar' ? 'right' : 'left' }]}
            keyboardType='numeric'
          />
        </View>

        {loading ? (
          <View style={{ padding: 40 }}>
            <ActivityIndicator size='small' color={Colors.primary} />
          </View>
        ) : dynamicFields.length > 0 && (
          <>
            <Text style={[styles.sectionTitle, { textAlign: language === 'ar' ? 'right' : 'left' }]}>
              {t('details')}
            </Text>
            {dynamicFields.map((field) => (
              <TouchableOpacity key={field.id} style={[styles.filterItem, { flexDirection: language === 'ar' ? 'row-reverse' : 'row' }]}>
                <Text style={styles.filterLabel}>{field.label}</Text>
                <View style={[GlobalStyles.row, { flexDirection: language === 'ar' ? 'row-reverse' : 'row' }]}>
                  <Text style={styles.filterValue}>{t('any')}</Text>
                  <Icon name={language === 'ar' ? 'chevron-left' : 'chevron-right'} size={20} color={Colors.mediumGray} />
                </View>
              </TouchableOpacity>
            ))}
          </>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.applyButton}>
          <Text style={styles.applyButtonText}>{t('apply')}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default FilterScreen;
