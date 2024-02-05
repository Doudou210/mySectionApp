import React, { useEffect, useState } from "react";
import { Button, FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { db } from "../../backend/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useAuth } from "../../auth/AuthContext";


const ListMembers = ({navigation}) => {
  const { userRole } = useAuth();
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    const getUsers = async () => {
      const usersCollectionRef = collection(db, "users")
      try {
        const data = await getDocs(usersCollectionRef);
        console.log("Data from Firestore:", data.docs);
        
        setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } catch (error) {
        console.error("Error getting users:", error);
      }
    };
    getUsers();
  
  }, []);
  
  const renderItem = ({ item }) => (
    <View 
      key={item.id}
      style={styles.itemContainer}
    >
      <Text style={styles.itemText}> {item.firstName} </Text>
      <Text style={styles.itemText}> {item.lastName} </Text>
      <Text style={styles.itemText}> {item.post} </Text>
      <Text style={styles.itemText}> {item.section} </Text>
      <Text style={styles.itemText}> {item.email} </Text>
      <Text style={styles.itemText}> {item.contact} </Text>   
    </View>
  );

  return(
    <View>
      {
        userRole === "admin" &&
        (
          <>
            {/* <RegisterMembers/> */}
          </>
        )
      }
      
      <FlatList
        numColumns={3}
        data={users}
        renderItem={renderItem}
        keyExtractor={(user) => user.id.toString()}
      />
    </View>
  )
}

export default ListMembers;

const styles = StyleSheet.create({
  itemContainer:{
    margin: 5,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3498db",
  },
  formContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  headerText: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
  },
  loginLink: {
    marginTop: 10,
    textAlign: "center",
    color: "#3498db", // or any other color you prefer
  },
})