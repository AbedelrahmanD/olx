import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator, BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '../theme/Colors';
import { styles } from './TabNavigator.styles';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import SearchScreen from '../screens/SearchScreen/SearchScreen';
import SellScreen from '../screens/SellScreen';
import ChatScreen from '../screens/ChatScreen';
import AccountScreen from '../screens/AccountScreen';

import { useNavigationState } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

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
      <Text style={[styles.label, { color }]}>{label}</Text>
    </TouchableOpacity>
  );
};

const SellButton = ({ onPress }: BottomTabBarButtonProps) => (
  <TouchableOpacity
    activeOpacity={0.8}
    onPress={onPress}
    style={styles.sellButtonContainer}
  >
    <View style={styles.sellButton}>
      <Icon name={'plus'} size={35} color={Colors.black} />
    </View>
    <Text style={[styles.label, { color: Colors.black, marginTop: 5 }]}>{'SELL'}</Text>
  </TouchableOpacity>
);

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tab.Screen
        name={'HOME'}
        component={HomeScreen}
        options={{
          tabBarButton: (props) => (
            <TabButton
              {...props}
              label={'HOME'}
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
              label={'CHATS'}
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
        component={SearchScreen}
        options={{
          tabBarButton: (props) => (
            <TabButton
              {...props}
              label={'MY ADS'}
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
              label={'ACCOUNT'}
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
