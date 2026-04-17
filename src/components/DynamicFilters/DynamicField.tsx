import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Colors } from '../../theme/Colors';
import { useLanguage } from '../../context/LanguageContext';

interface DynamicFieldProps {
  field: any;
  value: any;
  onUpdate: (value: any) => void;
  styles: any;
}

export const DynamicField: React.FC<DynamicFieldProps> = ({ 
  field, 
  value, 
  onUpdate,
  styles 
}) => {
  const { language, t } = useLanguage();
  const label = language === 'ar' ? field.seoTitle?.ar || field.name : field.name;

  switch (field.filterType) {
    case 'range':
      return (
        <View key={field.id} style={styles.section}>
          <Text style={styles.label}>{label}</Text>
          <View style={styles.priceInputRow}>
            <TextInput
              style={styles.priceInput}
              placeholder={t('min')}
              placeholderTextColor={Colors.mediumGray}
              keyboardType='numeric'
              value={value?.min ? String(value.min) : ''}
              onChangeText={(val) => onUpdate({ ...value, min: val ? Number(val) : undefined })}
            />
            <TextInput
              style={styles.priceInput}
              placeholder={t('max')}
              placeholderTextColor={Colors.mediumGray}
              keyboardType='numeric'
              value={value?.max ? String(value.max) : ''}
              onChangeText={(val) => onUpdate({ ...value, max: val ? Number(val) : undefined })}
            />
          </View>
        </View>
      );

    case 'single_choice':
    case 'multiple_choice':
      return (
        <View key={field.id} style={styles.section}>
          <Text style={styles.label}>{label}</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsRow}>
            {field.choices?.map((choice: any) => {
              const choiceLabel = language === 'ar' ? choice.seoSlug?.ar || choice.label : choice.label;
              const isSelected = field.filterType === 'multiple_choice' 
                ? Array.isArray(value) && value.includes(choice.value)
                : value === choice.value;

              return (
                <TouchableOpacity
                  key={choice.id}
                  style={[styles.chip, isSelected && styles.selectedChip]}
                  onPress={() => {
                    if (field.filterType === 'multiple_choice') {
                      const currentValues = Array.isArray(value) ? value : [];
                      const nextValues = isSelected 
                        ? currentValues.filter((v: any) => v !== choice.value)
                        : [...currentValues, choice.value];
                      onUpdate(nextValues);
                    } else {
                      onUpdate(isSelected ? undefined : choice.value);
                    }
                  }}
                >
                  <Text style={[styles.chipText, isSelected && styles.selectedChipText]}>
                    {choiceLabel}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      );

    default:
      return null;
  }
};
