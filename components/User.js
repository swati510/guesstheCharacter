import React, { useState, useEffect, useContext, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import { AsyncStorage } from 'react-native'
import LoadingView from './LoadingView'
const User = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const getCredentials = async () => {
    const newName = await AsyncStorage.getItem('name')
    const newEmail = await AsyncStorage.getItem('email')
    setName(newName);
    setEmail(newEmail);
  }
  useEffect(() => {
    getCredentials();
  }, []);

  const logout = useCallback(() => {

    props.navigation.replace("login")

  }, []);

  return (

    <View style={styles.container}>
      <View style={styles.header}></View>
      <Image style={styles.avatar} source={{ uri: 'https://www.bootdey.com/img/Content/avatar/avatar3.png' }} onLoadStart={() => setLoading(true)}
        onLoadEnd={() => {
          setLoading(false)
        }} />

      {loading && <LoadingView />}
      <View style={styles.body}>
        <View style={styles.bodyContent}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.info}>Contact at: {email}</Text>
          <TouchableOpacity style={styles.buttonContainer} onPress={logout}>
            <Text>Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>

  )
}
const styles = StyleSheet.create({
  header: {
    backgroundColor: "#00BFFF",
    height: 200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 130
  },
  name: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: '600',
  },
  body: {
    marginTop: 40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
  },
  name: {
    fontSize: 28,
    color: "#696969",
    fontWeight: "600"
  },
  info: {
    fontSize: 16,
    color: "#00BFFF",
    marginTop: 10
  },
  description: {
    fontSize: 16,
    color: "#696969",
    marginTop: 10,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: "#00BFFF",
  },
});
export default User
