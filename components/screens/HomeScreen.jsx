import React, { useState } from "react";
import { View, StyleSheet, Button, Text, TouchableOpacity } from "react-native";
import { useAuth } from "../../auth/AuthContext";
import ListActivity from "../Home/ListActivity";
import Ionicons from 'react-native-vector-icons/Ionicons';
import AddActivity from "../Home/AddActivity";

const HomeScreen = ({navigation}) => {
  const { userRole } = useAuth();
  const [isActived, setIsActived] = useState(()=>false);
  const handleAddActivity = () => {
    setIsActived((prevState)=>!prevState)
  }
  
  return(
    <View style={styles.container}>
      {
        userRole=== "admin" &&
        (
          <Button onPress={handleAddActivity} title="Add Activity"/>
        )
      }
      <View>
        <TouchableOpacity onPress={handleAddActivity} >
          <Ionicons name="add-outline" style={{fontSize:25}} />
        </TouchableOpacity>
        {
          isActived &&
          <View>
            <AddActivity/>
          </View>
        }
        <ListActivity/>
      </View>
    </View>
  ) 
}
export default HomeScreen;

const styles = StyleSheet.create({
  container:{
    backgroundColor:"green",
    flex:1
  }
});