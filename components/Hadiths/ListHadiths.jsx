import React,{ useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { FlatList, StyleSheet, Text, View } from "react-native";
import DeleteHadiths from "./DeleteHadiths";
import EditHadiths from "./EditHadiths";
import { db } from "../../backend/firebase";


export default function ListHadiths({
    listHadiths, 
    setListHadiths
}) {
    // const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        
        const getHadiths = async () => {
            const hadithsCollectionRef = collection(db, "hadiths");
            const data = await getDocs(hadithsCollectionRef)
            setListHadiths(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
        }
        getHadiths();
    }, [])

    // if (loading) {
    //     return <Text>Chargement d'hadiths ...</Text>
    // }

    const renderItem = ({item}) => (
        <View 
            key={item.id}
            style={styles.itemContainer}
        >
            <Text> {item.numero} </Text>
            <Text> {item.hadiths} </Text>
            <Text> {item.hadithsArabe} </Text>
            <Text> Rapport par : {item.auteur} </Text>
            <View style={styles.editDel}>
                <EditHadiths/>
                {/* <DeleteHadiths onDelete={() => onDelete(item.id)}/> */}
            </View>
        </View>
    )
    return(
        <View style={styles.container}>
            <FlatList
                data={listHadiths}
                renderItem={renderItem} 
            />
        </View>
    )
};


const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    itemContainer:{
        backgroundColor:"white",
        margin: 10,
        padding:10,
        borderRadius:10,
    },
    editDel:{
        width: 100,
        justifyContent: "space-between",
        padding:5,
        flexDirection: "row",
    }
})