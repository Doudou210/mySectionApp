import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { auth, db } from "../../../backend/firebase";

const DeleteAccount = ({navigation}) => {
  const [messages, setMessages] = useState("");

  const handleDeleteAccount = async () => {
    try {
      // Supprimer le compte de l'utilisateur actuel
      const user = auth.currentUser;
      await user.delete();
      // todo
      const userDocRef = db.collection("users").doc(user);
      await userDocRef.delete();

      navigation.replace("SettingHome")

      setMessages("Votre compte a été supprimé avec succès.");
    } catch (error) {
      console.error("Erreur lors de la suppression du compte :", error);
      setMessages("Erreur lors de la suppression du compte.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.headerText}>Supprimer le compte</Text>
        <TouchableOpacity onPress={handleDeleteAccount}>
          <Text style={styles.delete}>Delete Account</Text>
        </TouchableOpacity>
        <Text style={styles.messages}>{messages}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer:{
    padding: 20,
    backgroundColor: "white",
    width: "80%",
    borderRadius:10,
  },
  headerText: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "bold"
  },
  messages: {
    marginTop: 10,
    color: "red",
  },
  delete:{
    textAlign:"center",
    padding: 10,
    color: "white",
    fontWeight: "bold",
    width: "50%",
    borderRadius: 5,
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "red"
  },
});

export default DeleteAccount;
