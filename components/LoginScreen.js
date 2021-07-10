
import React,{useState} from 'react';
import{Button,TextInput} from 'react-native-paper'
import {
  
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
  StyleSheet,
  AsyncStorage
} from 'react-native';


const LoginScreen = (props) => {
  const [email,setEmail] = useState('');
  const [password,setPassword]=useState('')
  
  
  const sendCred = async (props)=>{
    fetch("http://192.168.26.218:5000/api/users/login",{
      method:"POST",
      headers: {
       'Content-Type': 'application/json'
     },
     body:JSON.stringify({
       "email":email,
       "password":password
     })
    })
    .then(res=>res.json())
    .then(async (data)=>{
           try {
             await AsyncStorage.setItem('token',data.token);
             await AsyncStorage.setItem('name',data.name);
             await AsyncStorage.setItem('email',data.email);
             await AsyncStorage.setItem('id',data.id);
             props.navigation.replace("home")
           } catch (e) {
             console.log("error hai",e)
              Alert(e)
           }
    })
 }

  return (
   <> 
   <KeyboardAvoidingView behavior="position">
     
     <View style={styles.header}></View>
      <Text 
      style={styles.heading}
      >Guess the Character?</Text>
      <View
      style={styles.conatainer}
       />
      <Text
      style={styles.text}
      
      >Login with email</Text>
      <TextInput
        label='Email'
        mode="outlined"
        value={email}
        style={styles.input}
        theme={{colors:{primary:"#00BFFF"}}}
        onChangeText={(text)=>setEmail(text)}
     
      />
      <TextInput
        label='password'
        mode="outlined"
        secureTextEntry={true}
        value={password}
        onChangeText={(text)=>{setPassword(text)}}
        style={styles.input}
        theme={{colors:{primary:"#00BFFF"}}}
     
      />
      <Button 
        mode="contained"
        style={styles.button}
       onPress={() => sendCred(props)}
       title="Login">
        Login
      </Button>
      <TouchableOpacity>
        <Text
      style={styles.input}
      onPress={()=>props.navigation.replace("signup")}
      >Dont have an account ?</Text>
      </TouchableOpacity>
      
      </KeyboardAvoidingView>
   </>
  );
};

const styles = StyleSheet.create({
	screen: {
		padding: 50
  },
  header:{
    backgroundColor: "#00BFFF",
    height:100,
  },
  heading:{
    fontSize:30,
    marginLeft:18,
    color:"#00BFFF"},
    conatainer:{
      borderBottomColor:"#00BFFF",
      borderBottomWidth:4,
      borderRadius:10,
      marginLeft:20,
      marginRight:150,
      marginTop:4
    },
    input:{marginLeft:18,
      marginRight:18,
      marginTop:18},
    button:{
      marginLeft:18,
      marginRight:18,
      marginTop:18,
      backgroundColor: "#00BFFF"
      },
    text:{
        fontSize:18,marginLeft:18,marginTop:20
        
    }
    
});

export default LoginScreen;