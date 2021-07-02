import React, { useState , useEffect} from 'react';
import {StyleSheet, View, TextInput, Button, Modal, Image,Text } from 'react-native';
import axios from 'axios';

const BlogInput = () => {
    const CHARID=Math.floor(Math.random() * 671)+1;
    const URL=`https://rickandmortyapi.com/api/character/${CHARID}`;
    const [enteredText, setEnteredText] = useState('');
    const [character,setCharacter]=useState({});
    const [refreshed,isRefreshed]=useState(false);
    useEffect(()=>{
        getData();
    },[refreshed]);
    const getData=async()=>{
         const response=await fetch(URL);
         const data= await response.json();
         setCharacter(data);
         console.log(data);

    }
    const textInputHandler=(enteredText)=>{
        setEnteredText(enteredText);

    }
    const addTextHandler=async()=>{
        await axios.post(`https://localhost:5000/api/feed/`, { "description":enteredText,"name":"rick babe","creator":creatorId })
        .then(res => {
          console.log(res);
          console.log(res.data);
        })
        //props.onAddText(enteredText,character.name);
        setEnteredText('');
        isRefreshed(!refreshed);
    }
    const creatorId='60df5dc305791d220fb17eb0';
    return (
        
            <View style={styles.inputContainer}>
                
                <Image  style={styles.tinyLogo} source={{uri:character.image}}></Image>
                <TextInput 
                    placeholder="Write Something" 
                    style={styles.input}
                    onChangeText={textInputHandler}
                    value={enteredText} />
                <View style={styles.buttonContainer}>
                   
                    <View style={styles.button}>
                        <Button title="Refresh" color="red" onPress={()=>{
                            isRefreshed(!refreshed)
                        }} />
                    </View>
                    <View style={styles.button}>
                        <Button title="ADD" onPress={addTextHandler} />
                    </View>
                </View>
                
            </View>
            
        
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
		justifyContent: 'center', 
		alignItems: 'center'
	},
	input: {
		width: '80%', 
		borderColor: 'black', 
		borderWidth: 1, 
        padding: 10,
        marginBottom: 10
    },
    tinyLogo: {
        width: '80%',
        height: '40%',
      },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '60%'
    },
    button: {
        width: '40%'
    }
});

export default BlogInput;