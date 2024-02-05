import React,{ useState } from "react";
import { Button, FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { db } from "../../backend/firebase";
import { addDoc, collection } from "firebase/firestore";

export default function AddMessages({
    listMessages, 
    setListMessages,
    navigation
}) {
    const [messages, setMessages] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();

        const usersCollectionRef = collection(db, "community");
        
        try {
            await addDoc(usersCollectionRef, {
                messages: messages,
            });
        } catch (error) {
            console.error(error,"Erreur de communication avec la base de donnée");
        }
        const newMessages={
            messages
        }
        setListMessages([newMessages, ...listMessages]);
        handleReset();
        navigation.navigate("Community")
    };

    const handleReset = () => {
        setMessages("");
    }
    return(
        <View style={styles.community}>
            <TextInput
              multiline
              numberOfLines={5}
              placeholder="Activity Description"
              value={messages}
              onChangeText={setMessages}
              style={styles.input}
            />

            <Button title="Send" onPress={handleSubmit} ></Button>
            <Button title="Reset" onPress={handleReset} ></Button>
             
            <FlatList
                data={listMessages}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => <Text>{item}</Text>}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    community:{
        margin: 10,
        // alignItems: "center"
    },
    input:{
        borderWidth:1,
        padding: 10,
        borderRadius: 10
    },
    messageText: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5,
    },
})