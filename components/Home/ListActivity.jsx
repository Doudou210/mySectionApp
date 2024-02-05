import { collection, getDocs } from "firebase/firestore";
import React,{ useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native"
import { db } from "../../backend/firebase";

const ListActivity = () => {
  const [activity, setActivity] = useState([]);
  
  useEffect(() => {
    const getActivities = async () => {
      const activitiesCollectionRef = collection(db, "activities");
      const data = await getDocs(activitiesCollectionRef);
      console.log("Data from Firestore:", data.docs);
      setActivity(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getActivities();
  }, []);

  const renderItem = ({ item }) => (
    <View 
      key={item.id}
      style={styles.itemContainer}
    >
      <Text style={styles.itemText}> {item.activityName} </Text>
      <Text style={styles.itemText}> {item.activityDescription} </Text>
      <Image source={{ uri: item.img }} style={styles.image} />
    </View>
  );
  return(
    <View style={styles.container}>
      <FlatList
          numColumns={1}
          data={activity}
          renderItem={renderItem}
          keyExtractor={(user) => user.id.toString()}
      />
    </View>
  )
}

export default ListActivity;

const styles = StyleSheet.create({
  container:{
  },
  itemContainer:{
    flexDirection:"column",
    backgroundColor:"white",
    margin: 10,
    borderRadius:10,
  },

  activiteText: {
    fontSize: 20,
    fontWeight: "bold",
    alignItems: 'center',
    justifyContent: 'center',
  },

  itemText:{
    padding:10,
  },

  image:{
    width:100,
    height:100,
  },
});