import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import SubCategoryScreen from '../screens/SubCategoryScreen/SubCategoryScreen';
import AdListScreen from '../screens/AdListScreen/AdListScreen';
import FilterScreen from '../screens/FilterScreen/FilterScreen';
import CategoryPickerScreen from '../screens/CategoryPickerScreen/CategoryPickerScreen';
import LocationPickerScreen from '../screens/LocationPickerScreen/LocationPickerScreen';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={TabNavigator} />
      <Stack.Screen name="SubCategory" component={SubCategoryScreen} />
      <Stack.Screen name="AdList" component={AdListScreen} />
      <Stack.Screen name="FilterScreen" component={FilterScreen} />
      <Stack.Screen name="CategoryPicker" component={CategoryPickerScreen} />
      <Stack.Screen name="LocationPicker" component={LocationPickerScreen} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
