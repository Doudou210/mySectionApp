import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import ListCommunity from "../communauty/ListCommunity";


const CommunityScreen = ({ navigation }) => {
    const handleMessages = () => {
        navigation.navigate("Add")
    }
    return(
        <View style={styles.community}>
            <View style={styles.communityContainer}>
                <TouchableOpacity onPress={handleMessages}>
                    <Ionicons name="create-outline" style={{fontSize:25, color: "white"}} />
                </TouchableOpacity>
                <Text style={styles.communityText}>Community</Text>
                <ListCommunity/>
            </View>
        </View>
    )
}

export default CommunityScreen;

/////////////Style

const styles = StyleSheet.create({
    community:{
        flex:1,
        backgroundColor: "green",
    },
    communityContainer:{
        margin: 10,
    },
    communityText:{
        color: "white"
    }
})