import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { useState } from "react";
import { auth, db } from "../../backend/firebase";
import { addDoc, collection } from "firebase/firestore";

export default function AddHadiths({
    listHadiths, setListHadiths, setIsActivedAdd
}) {
  const [hadiths, setHadiths] = useState("");
  const [hadithsArabe, setHadithsArabe] = useState("");
  const [auteur, setAuteur] = useState("");
  const [numero, setNumero] = useState("")
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Pour envoyer les données à Firebase ici
    
    try {
        const hadithsCollectionRef = collection(db, "hadiths");
        const uid = auth.currentUser.uid;
        await addDoc(doc(hadithsCollectionRef, uid, {
            Numero: numero,
            Hadiths: hadiths,
            HadithsArabe: hadithsArabe,
            Auteur: auteur,
        }));

        const newHadiths = {
            numero,
            hadiths,
            hadithsArabe,
            auteur
        };
        setListHadiths([newHadiths, ...listHadiths])
        setIsActivedAdd(false)

        // Réinitialisez les champs après l'envoi
        setNumero("");
        setHadiths("");
        setHadithsArabe("");
        setAuteur("");

        // setRefresh(!refresh)
        } catch (error) {
            console.error("Erreur lors de l'ajout de l'hadiths :", error);
        }
    };
    return(
        <View>
            <View style={styles.hadiths}>
                <Text style={styles.hadithsText} > Add the Hadiths</Text>
                <TextInput
                    placeholder="N°"
                    value={numero}
                    onChangeText={setNumero}
                    style={styles.textInput}
                />
                <TextInput
                    placeholder="Hadiths"
                    value={hadiths}
                    onChangeText={setHadiths}
                    style={styles.textInput}
                />

                <TextInput
                    multiline
                    numberOfLines={5}
                    placeholder="Hadiths Arabe"
                    value={hadithsArabe}
                    onChangeText={setHadithsArabe}
                    style={styles.textInput}
                />
                <TextInput
                    numberOfLines={5}
                    placeholder="Auteur ( Rapporter par:)"
                    value={auteur}
                    onChangeText={setAuteur}
                    style={styles.textInput}
                />
                <Button title="Submit" onPress={handleSubmit} />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    hadiths:{
        margin:10,
        backgroundColor:"white",
        padding:10,
        borderRadius:10
    },
    hadithsText: {
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
  });