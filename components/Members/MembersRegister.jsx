import React, { useEffect, useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { auth, db } from "../../backend/firebase";
import { addDoc, collection } from "firebase/firestore";
import { useAuth } from "../../auth/AuthContext";

const RegisterMembers = () => {
  const {userRole} = useAuth();
  const[email,setEmail] =useState("");
  const[password,setPassword] =useState("");

  const[firstName,setFirstName] =useState("");
  const[lastName,setLastName] =useState("");
  const[contact,setContact] =useState(0);
  const[mail,setMail] =useState("");
  const[post,setPost] =useState("");
  const[section,setSection] =useState("");

  const [messages, setMessages] = useState(true);

  //Collection bd
  
  const handleSubmit = async () => {
    try {
      const usersCollectionRef = collection(db, "users")
      // Ajouter un membre
      const addMember = await addDoc(usersCollectionRef, {
        firstName: firstName,
        lastName: lastName,
        contact: contact,
        post: post,
        email: email,
        section: section,
        role:"user"
      });

      if (addMember.user) {
        setMessages("Enregistrez avec succès")
      } else {
        setMessages("Votre enregistrement a échoué!");
      }      
    } catch (error) {
      console.error("Erreur lors de la communication avec le serveur:", error);
    }
  };

  const handleChange = (name, value) => {
    // Update the state based on the input name
    if (name === "firstName") {
      setFirstName(value);
    } else if (name === "lastName") {
      setLastName(value);
    } else if (name === "contact") {
      setContact(value);
    } else if (name === "email") {
      setMail(value);
    } else if (name === "section") {
      setSection(value);
    } else if (name === "post") {
      setPost(value);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.headerText}>Register Members</Text>
        <View style={styles.inputContainer}>
          <Text>FirstName</Text>
          <TextInput
            placeholder="FirstName"
            name="firstName"
            onChangeText={(text) => handleChange("firstName", text)}
            style={styles.input}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text>LastName</Text>
          <TextInput
            placeholder="LastName"
            name="lastName"
            onChangeText={(text) => handleChange("LastName", text)}
            style={styles.input}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text>Post</Text>
          <TextInput
            placeholder="Post"
            name="post"
            onChangeText={(text) => handleChange("Post", text)}
            style={styles.input}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text>Contact</Text>
          <TextInput
            placeholder="Contact"
            name="contact"
            onChangeText={(text) => handleChange("Contact", text)}
            style={styles.input}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text>Email</Text>
          <TextInput
            placeholder="Email"
            name="email"
            onChangeText={(text) => handleChange("email", text)}
            style={styles.input}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text>Section</Text>
          <TextInput
            placeholder="Section"
            name="section"
            onChangeText={(text) => handleChange("section", text)}
            style={styles.input}
          />
        </View>
        
        <Button title="Add member" onPress={handleSubmit} />
        
        {messages && <Text>{messages}</Text>}

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems: "center",
    justifyContent :"center",
    backgroundColor:"green"
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

export default RegisterMembers;
