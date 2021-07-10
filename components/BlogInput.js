import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Button, Modal, Image, Text } from 'react-native';
import axios from 'axios';
import { AsyncStorage } from 'react-native'
import LoadingView from './LoadingView'


const BlogInput = () => {
    const CHARID = Math.floor(Math.random() * 671) + 1;
    const URL = `https://rickandmortyapi.com/api/character/${CHARID}`;
    const [enteredText, setEnteredText] = useState('');
    const [character, setCharacter] = useState({});
    const [refreshed, isRefreshed] = useState(false);
    const [userId, setUserId] = useState('');
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getData();
    }, [refreshed]);
    const getData = async () => {
        const response = await fetch(URL);
        const data = await response.json();
        const newId = await AsyncStorage.getItem('id');
        setUserId(newId);
        setCharacter(data);

    }
    const textInputHandler = (enteredText) => {
        setEnteredText(enteredText);
    }
    const addTextHandler = async () => {
        console.log(userId);
        await axios.post(`http://192.168.26.218:5000/api/feed/`, { description: enteredText, name: character.name, creator: userId })
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
        setEnteredText('');
        isRefreshed(!refreshed);
    }
    return (
        <>
            <View style={styles.header}></View>
            <View style={styles.inputContainer}>

                <Image source={{ uri: character.image }} style={styles.tinyLogo}
                    onLoadStart={() => setLoading(true)}
                    onLoadEnd={() => {
                        setLoading(false)
                    }} />
                {loading && <LoadingView />}
                <TextInput
                    placeholder="Write Something"
                    style={styles.input}
                    onChangeText={textInputHandler}
                    value={enteredText} />
                <View style={styles.buttonContainer}>

                    <View style={styles.button}>
                        <Button title="Refresh" color="red" onPress={() => {
                            isRefreshed(!refreshed);
                        }} />
                    </View>
                    <View style={styles.button}>
                        <Button title="ADD" onPress={addTextHandler} />
                    </View>
                </View>

            </View>
        </>
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
    },
    header: {
        backgroundColor: "#00BFFF",
        height: 100,
    },
});

export default BlogInput;