import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

import HomeScreen from './HomeScreen';
import UserScreen from './User';
import BlogInput from './BlogInput';

const Footer = () => {
    return (
    <NavigationContainer>
    <Tab.Navigator>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Write" component={BlogInput} />
    <Tab.Screen name="User" component={UserScreen}/>
    
    </Tab.Navigator>
    </NavigationContainer>
    )
}

export default Footer
