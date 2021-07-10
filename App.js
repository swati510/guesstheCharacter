
import React, { useState, useCallback } from 'react';

import AuthNavigator from './navigators/auth-navigator'
import { NavigationContainer } from '@react-navigation/native';


export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState('');
  const [refreshed, setrefreshed] = useState(false);
  const login = useCallback(uid => {
    setIsLoggedIn(true);
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
  }, []);

  return (
    <NavigationContainer>
     
   <AuthNavigator/>
      
    </NavigationContainer>
  );
}
