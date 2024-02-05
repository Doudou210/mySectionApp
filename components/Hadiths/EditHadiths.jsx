import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons"
import { auth, db } from "../../backend/firebase";
import { collection, doc, updateDoc } from "firebase/firestore";

export default function EditHadiths() {
    const handleEditHadiths = async () => {
        const hadithsCollectionRef = collection(db, "hadiths");
        const user = auth.currentUser.uid;
        await updateDoc(doc(hadithsCollectionRef, user, {
            numero: numero,
            hadiths: hadiths,
            hadithsArabe: hadithsArabe,
            auteur: auteur,
        }))
    }
    return(
        <View>
            <TouchableOpacity onPress={handleEditHadiths}>
                <Ionicons name="create-outline"style={styles.edit} />
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    edit:{
      textAlign:"center",
      padding: 10,
      fontSize: 20,
      color: "white",
      fontWeight: "bold",
      borderRadius: 5,
      backgroundColor: "gray"
    },
});