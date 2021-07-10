
import React, { useEffect, useState ,useContext} from 'react';
import { StyleSheet, Text, View, Button, FlatList , ScrollView,AsyncStorage} from 'react-native';
import axios from 'axios'
import BlogItem from './blogItem'

const HomeScreen = () => {
  const[userId,setUserID]=useState('');
  const [loadedFeeds, setLoadedFeeds] = useState([      {
          _id: "60df5e4905791d220fb17eb4",
          description: "A scientist grandpa takes grandson on cool Adventures",
          name: "Rick Sanchez",
          creator: "60df5dc305791d220fb17eb0"
          
      },
      {
        _id:  "60df5e6f05791d220fb17ebb",
        description: "The gullible Grandson",
        name: "Morty Smith",
       creator: "60df5dc305791d220fb17eb0"
         
      }
  ]);
  const URL=`http://192.168.26.218:5000/api/feed/`;
  useEffect(() => {
  getLaunchDataAxios();
  }, []);

  const getLaunchDataAxios = async () => {
    const response=await fetch(URL);
         const data= await response.json();
         const newID=await AsyncStorage.getItem('id');
         setUserID(newID);
         setLoadedFeeds(data.feeds)
         console.log(data);
        
  };

  const removeTextHandler = deletedFeedId => {
    setLoadedFeeds(prevFeeds =>
      prevFeeds.filter(feed => feed.id !== deletedFeedId)
    );
  };
const data=loadedFeeds;

  return (
     <View >
      <View style={styles.header}></View>
      <View style ={styles.screen}>
  <FlatList
        data={loadedFeeds}
        keyExtractor={(item) => item._id}
        renderItem={({item}) => <BlogItem id={item._id} 
        description={item.description} 
        name={item.name}
        creator={item.creator}
        currentUser={userId}
        onDelete={removeTextHandler}/>}
      />
 </View>
 </View>
 
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
});
export default HomeScreen;
