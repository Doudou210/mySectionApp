import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { auth } from "../../backend/firebase";
import { 
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import ResetPassword from "./ResetPassword";

const SignIn = () => {
  const navigation = useNavigation();
  const[email,setEmail] =useState("");
  const[password,setPassword] =useState("");

  const [messages, setMessages] = useState("");

  const handleSubmit = async () => {
    try {

      const response = await signInWithEmailAndPassword(auth, email, password);
  
      if (response.user) {
        setMessages("Vous vous êtes connecté avec succès!");
        navigation.replace("SettingHome")
      } else {
        console.log("Échec de la connexion");
        setMessages("La connexion a échoué. Veuillez vérifier vos informations.");
      }
    } catch (error) {
      console.error("Erreur lors de la communication avec le serveur:", error);
    }
  };

  const handleChange = (name, value) => {
    // Mettre a jour l'état des inputs
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.headerText}>Sign In</Text>
        
        <View style={styles.inputContainer}>
          <Text>Email</Text>
          <TextInput
            placeholder="Email"
            name="email"
            onChangeText={(text) => handleChange("email", text)}
            // secureTextEntry
            style={styles.input}
          />
        </View>
       
        <View style={styles.inputContainer}>
          <Text>Password</Text>
          <TextInput
            placeholder="Password"
            name="password"
            onChangeText={(text) => handleChange("password", text)}
            style={styles.input}
          />
        </View>

        <Button title="Sign In" onPress={handleSubmit} />
        <ResetPassword email={email} setEmail={setEmail}/>
        {messages && <Text>{messages}</Text>}
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
    color: "#3498db",
  },
});

export default SignIn;
