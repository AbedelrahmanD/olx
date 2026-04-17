import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CategoryService } from '../../services/CategoryService';
import { styles } from './FilterScreen.styles';
import { Colors } from '../../theme/Colors';
import { GlobalStyles } from '../../theme/GlobalStyles';

const FilterScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState({ id: '2', name: 'Properties' });
  const [dynamicFields, setDynamicFields] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchFields = async () => {
      setLoading(true);
      try {
        const fields = await CategoryService.getCategoryFields(selectedCategory.id);
        setDynamicFields(fields);
      } catch (err) {
        Alert.alert('Error', 'Failed to load dynamic filters for this category.');
      } finally {
        setLoading(false);
      }
    };
    fetchFields();
  }, [selectedCategory]);

  return (
    <SafeAreaView style={GlobalStyles.screenContainer}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name='close' size={24} color={Colors.black} />
        </TouchableOpacity>
        <Text style={styles.title}>Filters</Text>
        <TouchableOpacity>
          <Text style={styles.resetText}>Reset</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionTitle}>Basic Information</Text>
        
        <TouchableOpacity style={styles.filterItem}>
          <Text style={styles.filterLabel}>Category</Text>
          <View style={GlobalStyles.row}>
            <Text style={styles.filterValue}>{selectedCategory.name}</Text>
            <Icon name='chevron-right' size={20} color={Colors.mediumGray} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.filterItem}>
          <Text style={styles.filterLabel}>Location</Text>
          <View style={GlobalStyles.row}>
            <Text style={styles.filterValue}>All of Lebanon</Text>
            <Icon name='chevron-right' size={20} color={Colors.mediumGray} />
          </View>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Price (USD)</Text>
        <View style={styles.priceInputContainer}>
          <TextInput 
            placeholder='Min' 
            placeholderTextColor={Colors.mediumGray}
            style={styles.priceInput}
            keyboardType='numeric'
          />
          <TextInput 
            placeholder='Max' 
            placeholderTextColor={Colors.mediumGray}
            style={styles.priceInput}
            keyboardType='numeric'
          />
        </View>

        {loading ? (
          <View style={{ padding: 40 }}>
            <ActivityIndicator size='small' color={Colors.primary} />
          </View>
        ) : dynamicFields.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Details</Text>
            {dynamicFields.map((field) => (
              <TouchableOpacity key={field.id} style={styles.filterItem}>
                <Text style={styles.filterLabel}>{field.label}</Text>
                <View style={GlobalStyles.row}>
                  <Text style={styles.filterValue}>Any</Text>
                  <Icon name='chevron-right' size={20} color={Colors.mediumGray} />
                </View>
              </TouchableOpacity>
            ))}
          </>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.applyButton}>
          <Text style={styles.applyButtonText}>Apply Filters</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default FilterScreen;
