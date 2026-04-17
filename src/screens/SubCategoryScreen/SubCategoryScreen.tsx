import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useLanguage } from '../../context/LanguageContext';
import { Colors } from '../../theme/Colors';
import { GlobalStyles } from '../../theme/GlobalStyles';
import SubCategoryItem from '../../components/SubCategoryItem/SubCategoryItem';

const SubCategoryScreen = ({ route, navigation }: any) => {
  const { category } = route.params;
  const { language } = useLanguage();

  const handleCategoryPress = (item: any) => {
    if (item.children && item.children.length > 0) {
      navigation.push('SubCategory', { category: item });
    } else {
      navigation.navigate('AdList', { category: item });
    }
  };

  return (
    <SafeAreaView style={GlobalStyles.screenContainer}>
      <View style={[styles.header, { flexDirection: language === 'ar' ? 'row-reverse' : 'row' }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name={language === 'ar' ? 'arrow-right' : 'arrow-left'} size={24} color={Colors.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {language === 'ar' ? category.name_l1 : category.name}
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={category.children}
        renderItem={({ item }) => (
          <SubCategoryItem 
            item={item} 
            onPress={() => handleCategoryPress(item)} 
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.black,
  },
  list: {
    paddingVertical: 4,
  },
});

export default SubCategoryScreen;
