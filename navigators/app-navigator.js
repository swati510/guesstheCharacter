import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

import HomeScreen from '../components/HomeScreen';
import UserScreen from '../components/User';
import BlogInput from '../components/BlogInput';

const AppNavigator= () => {
    return (
   
    <Tab.Navigator style={{justifyContent: 'center'}}tabBarOptions={{
        inactiveTintColor:"#FFFFFF",
        activeTintColor: '#e91e63',
        activeBackgroundColor:"#00BFFF",
        inactiveBackgroundColor:"#00BFFF",
        labelStyle: { fontSize:15,
            
            padding:9
             }
      }}
      >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Write" component={BlogInput} />
    <Tab.Screen name="User" component={UserScreen}/>
    </Tab.Navigator>
    )
}

export default AppNavigator;
