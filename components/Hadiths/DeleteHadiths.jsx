import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { auth, db } from "../../backend/firebase";
import Ionicons from "react-native-vector-icons/Ionicons";
import { collection, doc, updateDoc } from "firebase/firestore";


export default function DeleteHadiths() {
    const handleDeleteAccount = async () => {
        try {
            alert("Voulez vous supprimer l'hadiths?")
            // Supprimer l'hadiths
            const user = auth.currentUser;
            const userDocRef = db.collection("hadiths").doc(user);
            await userDocRef.delete();

        } catch (error) {
            console.error("Erreur lors de la suppression du compte :", error);
            setMessages("Erreur lors de la suppression du compte.");
        }
    };
    return(
        <View>
            <TouchableOpacity onPress={handleDeleteAccount}>
                <Ionicons name="trash-outline"style={styles.delete} />
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
  delete:{
    textAlign:"center",
    padding: 10,
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    borderRadius: 5,
    backgroundColor: "red"
  },
});