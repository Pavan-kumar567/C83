import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {AppTabNavigator} from './AppTabNavigator';
import CustomSideBarMenu from './CustomSideBarMenu'
import SettingScreen from '../screens/SettingScreen';
import MyDonationScreen from '../screens/MyDonationScreen';
import NotificationsScreen from '../screens/NotificationsScreen';

export const AppDrawerNavigator = createDrawerNavigator({
    Home: {
        screen: AppTabNavigator
    },
    Setting: {
        screen: SettingScreen
    },
    MyDonations:{
        screen: MyDonationScreen
    },
    Notification: {
        screen:NotificationsScreen
    }

},
{
    contentComponent: CustomSideBarMenu
},
{
  initialRouteName: 'Home'
})