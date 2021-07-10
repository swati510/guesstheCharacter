import React,{useEffect,useState} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignupScreen from '../components/SignupScreen'
import LoginScreen from '../components/LoginScreen'
import LoadingScreen from '../components/LoadingScreen'
import HomeScreen from './app-navigator'
import{AsyncStorage} from 'react-native'
const Stack = createStackNavigator();

 const AuthNavigator = () => {
    const [isloggedin,setLogged] = useState(null)

    const detectLogin= async ()=>{
       const token = await AsyncStorage.getItem('token')
       if(token){
           setLogged(true)
       }else{
           setLogged(false)
       }
    }
   useEffect(()=>{
      detectLogin()
   },[])
  return (
    <Stack.Navigator headerMode="none">

          <Stack.Screen name="loading" component={LoadingScreen} />
          <Stack.Screen name="signup" component={SignupScreen} />
          <Stack.Screen name="login" component={LoginScreen} />
          <Stack.Screen name="home" component={HomeScreen} />
      
      
    </Stack.Navigator>
  );
};
export default AuthNavigator;