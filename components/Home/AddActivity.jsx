import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { useState } from "react";
import { db, storage } from "../../backend/firebase";
import { addDoc, collection } from "firebase/firestore";
import * as ImagePicker from "expo-image-picker";

export default function AddActivity() {
  const [activityName, setActivityName] = useState("");
  const [activityDescription, setActivityDescription] = useState("");
  const [imageUpload, setImageUpload] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const handleImagePicker = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Sorry, we need camera roll permissions to make this work.");
        return;
      }
      const image = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        setImageUpload(result.uri);
      }
    } catch (error) {
      console.log('ImagePicker Error: ', error);
    }
  };    
  
  const handleSubmit = async () => {
    // Ajoutez la logique pour envoyer les données à Firebase ici
    // const storageRef = storage().ref();
    
    try {
      const activitiesCollectionRef = collection(db, "activities");
      // const imageRef = storageRef.child(`images/${activityName}`);
      // const snapshot = await imageRef.putFile(imageUpload.uri);
      // const imageURL = await snapshot.ref.getDownloadURL();
      await addDoc(activitiesCollectionRef, {
        activityName: activityName,
        imageUrl : imageURL,
        activityDescription: activityDescription,
      });

      // Réinitialisez les champs après l'envoi
      setActivityName("");
      setActivityDescription("");
      setImageUpload(null);
      setRefresh(!refresh)
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'activité :", error);
    }
  };
  return(
    <View>
      <View style={styles.activity}>
          <Text style={styles.activiteText} > Add the activity</Text>
          <TextInput
              placeholder="Activity Name"
              value={activityName}
              onChangeText={setActivityName}
              style={styles.textInput}
          />
          
          {/* image */}
          <Button onPress={handleImagePicker} title="Choose Image"/>
          {imageUpload && (
          <Image source={{ uri: imageUpload }} style={styles.image} />
          )}

          <TextInput
              multiline
              numberOfLines={5}
              placeholder="Activity Description"
              value={activityDescription}
              onChangeText={setActivityDescription}
              style={styles.textInput}
          />
          <Button title="Submit" onPress={handleSubmit} />
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  activity:{
    margin:10,
  },
    activiteText: {
      fontSize: 20,
      fontWeight: "bold",
      alignItems: 'center',
      justifyContent: 'center',
    },
  
    itemText:{
      padding:10,
    },
  
    textInput: {
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 8,
      padding: 10,
      marginTop: 10,
      textAlignVertical: 'top',
    },
    image: {
      width: 100,
      height: 100,
      marginTop: 10,
    },
  });