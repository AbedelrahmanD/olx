import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useLanguage } from '../../context/LanguageContext';
import { Colors } from '../../theme/Colors';
import { GlobalStyles } from '../../theme/GlobalStyles';
import { StyleSheet } from 'react-native';

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

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[styles.item, { flexDirection: language === 'ar' ? 'row-reverse' : 'row' }]}
      onPress={() => handleCategoryPress(item)}
    >
      <Text style={styles.itemName}>
        {language === 'ar' ? item.name_l1 : item.name}
      </Text>
      <Icon
        name={language === 'ar' ? 'chevron-left' : 'chevron-right'}
        size={24}
        color={Colors.mediumGray}
      />
    </TouchableOpacity>
  );

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
        renderItem={renderItem}
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
    borderBottomColor: Colors.gray,
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
    paddingVertical: 8,
  },
  item: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray,
  },
  itemName: {
    fontSize: 16,
    color: Colors.black,
  },
});

export default SubCategoryScreen;
