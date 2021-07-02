import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import footer from './Footer';
const BlogItem = props => {
    return (
        <TouchableOpacity onPress={props.onDelete.bind(this, props.id)}>
            <View style={styles.listItem}>
                <Text>{props.description}</Text>
                <Text>{props.name}</Text>
            </View>
            
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    listItem: {
		padding: 10,
		marginVertical: 10,
		backgroundColor: '#ccc',
		borderColor: 'black',
		borderWidth: 1
	}
});

export default BlogItem;