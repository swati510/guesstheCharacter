
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import axios from 'axios'
import BlogItem from './blogItem'
const HomeScreen = () => {
  const [loadedFeeds, setLoadedFeeds] = useState([{_id:"60df5e4905791d220fb17eb4",
  description:"A scientist grandpa takes grandson on cool Adventures",
  name:"Rick Sanchez",
  creator:"60df5dc305791d220fb17eb0"}
]);

  const ApiURL='http://localhost:5000/api/feed/'
  useEffect(() => {
  //getLaunchDataAxios();
  }, []);

  const getLaunchDataAxios = async () => {
    const response=await fetch(ApiURL);
    const data= await response.json();
    setLoadedFeeds(data.feed);
    console.log(data);
    
  };

  const removeTextHandler = deletedFeedId => {
    setLoadedFeeds(prevFeeds =>
      prevFeeds.filter(feed => feed.id !== deletedFeedId)
    );
  };

  return (
    
     <React.Fragment>
     <View style={styles.screen}>
    
     <FlatList 
     keyExtractor={(item, index) => item._id}
     data={loadedFeeds} 
     renderItem={itemData => (
       <BlogItem 
         id={itemData._id} 
         description={itemData.description} 
         name={itemData.name}
         creator={itemData.creator}
         onDelete={removeTextHandler} />
     )}
   />
  
 </View>
 
 </React.Fragment>
  );
};
const styles = StyleSheet.create({
	screen: {
		padding: 50
	}
});
export default HomeScreen;


/*import React,{useState} from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import BlogInput from './BlogInput'
import BlogItem from './blogItem'

const HomeScreen = () => {
  const [writeups, setWriteups] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);
  const [name,setName]=useState('');
  const addTextHandler=(enteredText)=>{
    if(enteredText.length === 0) {
			return;
		}
		setWriteups( [...writeups, {
			id: Math.random().toString(), 
			value: enteredText
		}]);
		setIsAddMode(false);

  }
  const cancelTextAddHandler=()=>{
    setIsAddMode(false);
  }
  const removeTextHandler=(id)=>{
    setWriteups(writeups.filter(function(curr){
      return curr.id!==id;
    }));

  }
    return (
       
    )
}
const styles = StyleSheet.create({
	screen: {
		padding: 50
	}
});

export default HomeScreen
*/