import React, { useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { db } from "../../backend/firebase";

export default function SearchHadiths({isActive}) {
    const [research, setResearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const handleResearch = async () => {
        const hadithsCollectionSea = collection(db, "hadiths");
        
        try {
            const q = query(
                hadithsCollectionSea, 
                where("hadiths", "==", research)
                .where("numero", "==", research)
                .where("hadithsArabe", "==", research)
                .where("auteur", "==", research)
            );
            const querySnapshot = await getDocs(q);
            const results = querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id}))
            setSearchResults(results);
        } catch (error) {
            console.error(error);
        }
    }

    return(
        <View>
            <TextInput
                placeholder="Rechercher un Hadiths"
                value={research}
                onChangeText={setResearch}
                style={styles.searchInput}
            />
            <Button title="Rechercher" onPress={handleResearch}/>

            {searchResults.map((result) => (
                <View key={index}>
                    <Text>{result.hadiths}</Text>
                    <Text>{result.hadithsArabe}</Text>
                    <Text>Rapport par : {result.auteur}</Text>
                </View>
            ))}
        </View>
    )
};


const styles = StyleSheet.create({
    searchInput:{
        borderWidth: 1,
        margin: 5,
        padding:10,
        backgroundColor: "white"
    },
})