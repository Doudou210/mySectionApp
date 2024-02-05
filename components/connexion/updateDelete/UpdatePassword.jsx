import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
// import "@react-native-firebase/auth";
import { auth } from "../../../backend/firebase";

const UpdatePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  // const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [messages, setMessages] = useState("");

  const updatePassword = async () => {
    try {
      // Vérifier si le nouveau mot de passe et la confirmation sont les mêmes
      // if (newPassword !== confirmNewPassword) {
      //   setMessages("Les nouveaux mots de passe ne correspondent pas.");
      //   return;
      // }

      if (newPassword.trim() === "") {
        setMessages("Veuillez entrer un nouveau mot de passe.");
        return;
      }
      const user = auth.currentUser.uid;

      if(user){
        // Mettre à jour le mot de passe
        await auth.updatePassword(user, newPassword);
        setMessages("Password update success")
      } else {
        setMessages("Utilisateur non trouver veuillez vous reconnecter!")
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour du mot de passe :", error);
      setMessages("Erreur lors de la mise à jour du mot de passe.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer} >
        <Text style={styles.headerText}>Modifier le mot de passe</Text>
        <View style={styles.inputContainer}>
          <Text>Nouveau mot de passe</Text>
          <TextInput
            placeholder="Nouveau mot de passe"
            secureTextEntry
            onChangeText={(text) => setNewPassword(text)}
            style={styles.input}
          />
        </View>
        <Button title="Modifier le mot de passe" onPress={updatePassword} />
        <Text style={styles.messages}>{messages}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  formContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  headerText: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: "bold",
  },
  inputContainer: {
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    width: 250,
  },
  messages: {
    marginTop: 10,
    color: "red",
  },
});

export default UpdatePassword;
