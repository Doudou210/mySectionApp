import React, { useEffect, useState } from "react";
import { View, Button, Text, StyleSheet, TextInput } from "react-native";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../../backend/firebase";
import { doc, getDoc } from "firebase/firestore";

const DetailsProfil = () => {
    const [current, setCurrent] = useState(null);
    
    // Écoute des changements d'état d'authentification
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                // Récupérer le document utilisateur à partir de Firestore
                const userDocRef = doc(db, "users", user.uid);
                const userDocSnap = await getDoc(userDocRef);

                if (userDocSnap.exists()) {
                    // Si le document existe, récupérer le(s)...
                    const userData = userDocSnap.data();
                    setCurrent({ ...user, lastName: userData.lastName, firstName: userData.firstName, email: userData.email, post: userData.post });
                } else {
                    setCurrent(user);
                }
            } else {
                setCurrent(null);
            }
        });

        // Nettoyer l'écouteur lors du démontage du composant
        return () => unsubscribe();
    }, []);

    // const updatePassword = async () => {
    //     try {
    //         if (newPassword.trim() === "") {
    //             setMessages("Veuillez entrer un nouveau mot de passe.");
    //             return;
    //         }

    //         const user = auth.currentUser;
            
    //         if (user) {
    //             await updatePassword(user, newPassword);
    //             setMessages("Mot de passe mis à jour avec succès.");
    //         } else {
    //             setMessages("Aucun utilisateur connecté.");
    //         }
    //     } catch (error) {
    //         console.error("Erreur lors de la mise à jour du mot de passe :", error);
    //         setMessages("Erreur lors de la mise à jour du mot de passe.");
    //     }
    // };

    return (
        <View  >
            <View style={styles.container}>
                <Text style={styles.detailHeader} >
                    {current ? `Bonjour ${current.firstName} ${current.lastName } ${current.email}` : "Aucun utilisateur connecté"}
                </Text>
                {/* <TextInput
                placeholder="Nouveau mot de passe"
                onChangeText={(text) => setNewPassword(text)}
                style={styles.input}
                secureTextEntry
                /> */}
                {/* <Button title="Mettre à jour le mot de passe" onPress={updatePassword} /> */}
                {/* <UpdatePassword/> */}
                {/* <AdminCode/> */}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        margin: 10,
        justifyContent: "center",
        alignItems:"center",
    },
    
    detailHeader:{
        fontSize:16,
        fontWeight: "bold",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        borderRadius: 5,
        width: 250,
        margin:10
    },
});

export default DetailsProfil;
