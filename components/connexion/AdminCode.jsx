import { doc, setDoc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { auth, db } from "../../backend/firebase";

const AdminCode = () => {
  const [adminCode, setAdminCode] = useState("");
  const [messages, setMessages] = useState("");

  const handleUpdateBtn = async ()=>{
    try {
      const user = auth.currentUser;
      if (!user) return;
      if (adminCode.length < 3) {
        setMessages("Code administrateur incorrect !");
        setTimeout(()=>{
          setMessages("")
        },2000);
        return;
      };
      const docRef = doc(db, "admins",user.uid)
      await updateDoc(docRef, {
        adminCode
      });
      
      const userRef = doc(db, "users",user.uid)
      await update(userRef, {
        adminCode:adminCode,
        role: "admin"
      });
      
    } catch (error) {
      console.error(error);
    }
  }
  return(
      <View>
        <View style={styles.inputContainer}>
          <Text style={styles.code}>Code</Text>
          <TextInput
            placeholder="Admin Code"
            name="adminCode"
            onChangeText={setAdminCode}
            style={styles.input}
          />
          {/* <TextInput
            placeholder="Admin Code"
            name="adminCode"
            onChangeText={handleChange}
            style={styles.input}
          /> */}
          <Button title="Update Role" onPress={handleUpdateBtn} />
        </View>
        {messages && <Text style={styles.messages}>{messages}</Text>}  
      </View>
  )
}
const styles = StyleSheet.create({
  // inputContainer:{
    
  // },
  code:{
    fontWeight: "bold",
    fontSize: 20
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
  },
  messages:{
    color: "red",
  },
})

export default AdminCode;