import { collection, getDocs } from "firebase/firestore";
import React,{ useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native"
import { db } from "../../backend/firebase";

const ListCommunity = () => {
    const [listMessages, setListMessages] = useState([]);

    useEffect(() => {
        const msgCollection = collection(db, "community");
        const getCommunity = async () => {
            try {
                const data = await getDocs(msgCollection);
                console.log("Data from Firestore:", data.docs);
                setListMessages(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            } catch (error) {
                console.error("Error getting users:", error);
            }
        };
        getCommunity();
    }, []);

    const renderItem = ({ item }) => (
      <View 
          key={item.id}
          style={styles.itemContainer}
      >
          <Text style={styles.itemText}> {item.messages} </Text>
      </View>
    );
    
    return(
      <View style={styles.container}>
        <FlatList
          numColumns={1}
          data={listMessages}
          renderItem={renderItem}
          keyExtractor={(user) => user.id.toString()}
        />
      </View>
    )
}

export default ListCommunity;

const styles = StyleSheet.create({
  container:{
  },
  itemContainer:{
    flexDirection:"column",
    backgroundColor:"white",
    margin: 10,
    height: 100,
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