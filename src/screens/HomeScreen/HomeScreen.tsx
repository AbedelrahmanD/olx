import React from 'react';
import { ScrollView, SafeAreaView } from 'react-native';
import HomeHeader from '../../components/HomeHeader/HomeHeader';
import Banner from '../../components/Banner/Banner';
import CategoryList from '../../components/CategoryList/CategoryList';
import AdListSection from '../../components/AdListSection/AdListSection';
import { styles } from './HomeScreen.styles';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <HomeHeader />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <Banner />
        <CategoryList />
        
        <AdListSection 
          title="International Properties" 
          categoryExternalID="2" // Properties
        />
        
        <AdListSection 
          title="Cars for Sale" 
          categoryExternalID="23" // Cars for Sale
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
