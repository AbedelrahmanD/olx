import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator, BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '../theme/Colors';
import { styles } from './TabNavigator.styles';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import SellScreen from '../screens/SellScreen';
import ChatScreen from '../screens/ChatScreen';
import AccountScreen from '../screens/AccountScreen';
import MyAdsScreen from '../screens/MyAdsScreen';
import SubCategoryScreen from '../screens/SubCategoryScreen/SubCategoryScreen';
import AdListScreen from '../screens/AdListScreen/AdListScreen';

import { useLanguage } from '../context/LanguageContext';
import { useNavigationState } from '@react-navigation/native';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='HomeMain' component={HomeScreen} />
      <Stack.Screen name='SubCategory' component={SubCategoryScreen} />
      <Stack.Screen name='AdList' component={AdListScreen} />
    </Stack.Navigator>
  );
};

type TabButtonProps = BottomTabBarButtonProps & {
  label: string;
  icon: string;
  activeIcon: string;
  routeName: string;
};

const TabButton = (props: TabButtonProps) => {
  const { label, icon, activeIcon, onPress, routeName } = props;

  const focused = useNavigationState((state) => {
    const route = state?.routes[state.index];
    return route?.name === routeName;
  });

  const color = focused ? Colors.primary : Colors.mediumGray;

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      style={styles.tabItem}
    >
      {focused && <View style={styles.activeIndicator} />}
      <Icon name={focused ? activeIcon : icon} size={24} color={color} />
      <Text style={[styles.label, { color }]} numberOfLines={1}>{label}</Text>
    </TouchableOpacity>
  );
};

const SellButton = ({ onPress }: BottomTabBarButtonProps) => {
  const { t } = useLanguage();
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={styles.sellButtonContainer}
    >
      <View style={styles.sellButton}>
        <Icon name={'plus'} size={31} color={Colors.black} />
      </View>
      <Text style={[styles.label, { color: Colors.black, marginTop: 5 }]} numberOfLines={1}>{t('sell')}</Text>
    </TouchableOpacity>
  );
};

const TabNavigator = () => {
  const { t, language } = useLanguage();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: [
          styles.tabBar,
          { flexDirection: language === 'ar' ? 'row-reverse' : 'row' }
        ],
      }}
    >
      <Tab.Screen
        name={'HOME'}
        component={HomeStack}
        options={{
          tabBarButton: (props) => (
            <TabButton
              {...props}
              label={t('home')}
              icon={'home-outline'}
              activeIcon={'home'}
              routeName={'HOME'}
            />
          ),
        }}
      />
      <Tab.Screen
        name={'CHATS'}
        component={ChatScreen}
        options={{
          tabBarButton: (props) => (
            <TabButton
              {...props}
              label={t('chats')}
              icon={'message-outline'}
              activeIcon={'message'}
              routeName={'CHATS'}
            />
          ),
        }}
      />
      <Tab.Screen
        name={'SELL'}
        component={SellScreen}
        options={{
          tabBarButton: (props) => <SellButton {...props} />,
        }}
      />
      <Tab.Screen
        name={'MY ADS'}
        component={MyAdsScreen}
        options={{
          tabBarButton: (props) => (
            <TabButton
              {...props}
              label={t('myAds')}
              icon={'view-list-outline'}
              activeIcon={'view-list'}
              routeName={'MY ADS'}
            />
          ),
        }}
      />
      <Tab.Screen
        name={'ACCOUNT'}
        component={AccountScreen}
        options={{
          tabBarButton: (props) => (
            <TabButton
              {...props}
              label={t('account')}
              icon={'account-outline'}
              activeIcon={'account'}
              routeName={'ACCOUNT'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
