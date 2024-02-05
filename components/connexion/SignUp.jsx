import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { collection, doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../backend/firebase";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";

const SignUp = ({navigation}) => {
  const [step, setStep] = useState(1);

  // Première étape
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Deuxième étape
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contact, setContact] = useState("");
  const [section, setSection] = useState("");
  const [post, setPost] = useState("");
  const [messages, setMessages] = useState("");

  const Register = async () => {
    const usersCollectionRef = collection(db, "users");
    
    try {
      if (step === 1) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        sendEmailVerification(userCredential.user)
        const uid = auth.currentUser.uid
        // await setDoc(doc(usersCollectionRef, uid), {
        //   firstName: firstName,
        //   email: email,
        //   role: "user",
        // });
        setEmail("");
        setPassword("");
        setStep(2);
        // navigation.replace("VerifMail");
        // setMessages("Gérer le cas où l'e-mail n'a pas été vérifié avec succès")
        
      } else if (step === 2) {
        const uid = auth.currentUser.uid;
        await setDoc(doc(usersCollectionRef, uid), {
          firstName: firstName,
          lastName: lastName,
          contact: contact,
          post: post,
          email: email,
          section: section,
          role: "user",
        });
        setMessages("Vous êtes enregistré(es)");
      }
    } catch (error) {
      console.error("Erreur lors de la communication avec le serveur :", error);
      setMessages("Erreur lors de l'enregistrement !");
    }
  };

  const handleChange = (name, value) => {
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "firstName") {
      setFirstName(value);
    } else if (name === "lastName") {
      setLastName(value);
    } else if (name === "contact") {
      setContact(value);
    } else if (name === "section") {
      setSection(value);
    } else if (name === "post") {
      setPost(value);
    }
  };

  return (
    <View style={styles.container}>
      {step === 1 && (
        <View style={styles.formContainer}>
          <Text style={styles.headerText}>Step 1: Email and password</Text>
          <View style={styles.inputContainer}>
            <View style={styles.iconText} >
              {/* <Icon name="mail" style={styles.iconStyle}/> */}
              <Text>Email</Text>
            </View>
            <TextInput
              placeholder="Email"
              name="email"
              onChangeText={(text) => handleChange("email", text)}
              style={styles.input}
            />
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.iconText} >
              {/* <Icon name="key-outline" style={styles.iconStyle}></Icon> */}
              <Text>Password</Text>
            </View>
            <TextInput
              placeholder="Password"
              name="password"
              onChangeText={(text) => handleChange("password", text)}
              style={styles.input}
              secureTextEntry
            />
          </View>
          <Button title="Next step" onPress={Register} />
          <Text> {messages} </Text>
        </View>
      )}

      {step === 2 && (
        <View style={styles.formContainer}>
          <Text style={styles.headerText}>Étape 2: Informations supplémentaires</Text>
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
              onChangeText={(text) => handleChange("lastName", text)}
              style={styles.input}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text>Post</Text>
            <TextInput
              placeholder="Post"
              name="post"
              onChangeText={(text) => handleChange("post", text)}
              style={styles.input}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text>Contact</Text>
            <TextInput
              placeholder="Contact"
              name="contact"
              onChangeText={(text) => handleChange("contact", text)}
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
          <Button title="Suivant" onPress={Register} />
          <Text style={styles.messages}> {messages} </Text>
        </View>
      )}
    </View>
)}

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
  messages:{
    color: "green"
  },
});

export default SignUp;