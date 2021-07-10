import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { Button, TextInput } from 'react-native-paper'

const BlogItem = props => {

    const [visible, setVisible] = useState(0);
    const [character, setCharacter] = useState('');
    const [correct, setCorrect] = useState(false);

    return (
        <KeyboardAvoidingView behavior="position">
            <TouchableOpacity onPress={props.onDelete.bind(this, props.id)}>
                {props.creator !== props.currentUser &&
                    <View style={styles.listItem}>
                        <Text>{props.description}</Text>
                        {visible === 0 && <Button
                            mode="contained"
                            style={styles.button}
                            onPress={() => setVisible(1)}
                            title="Guess me?">
                            Guess me?</Button>}
                        {visible === 1 && <TextInput
                            label='character'
                            mode="outlined"
                            value={character}
                            style={styles.input}
                            theme={{ colors: { primary: "#00BFFF" } }}
                            onChangeText={(value) => setCharacter(value)}
                        />}
                        {visible === 1 && <Button
                            mode="contained"
                            style={styles.button}
                            onPress={() => {
                                if (character === props.name) {
                                    setCorrect(true);
                                }
                                setVisible(2)
                            }}

                            title="Guess me?">
                            Guess me?</Button>

                        }
                        {visible === 2 && correct && <Text style={styles.correct}>Wow you're quite a fan</Text>}
                        {visible === 2 && !correct && <Text style={styles.wrong}>Wrong Answer, The character is {props.name}</Text>}
                    </View>
                }
            </TouchableOpacity>
        </KeyboardAvoidingView>

    );
};

const styles = StyleSheet.create({
    listItem: {
        padding: 10,
        marginVertical: 10,
        backgroundColor: '#E0E0E0',
        borderColor: 'black',
        borderWidth: 1
    },
    input: {
        marginLeft: 18,
        marginRight: 18,
        marginTop: 18
    },
    button: {
        marginLeft: 18,
        marginRight: 18,
        marginTop: 18,
        backgroundColor: "#00BFFF"
    },
    correct: {
        color: "#00BFFF"
    },
    wrong: {
        color: '#e91e63'
    }
});

export default BlogItem;