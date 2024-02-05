import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AddHadiths from "../Hadiths/AddHadiths";
import ListHadiths from "../Hadiths/ListHadiths";
import Ionicons from "react-native-vector-icons/Ionicons"
import { useAuth } from "../../auth/AuthContext";
import SearchHadiths from "../Hadiths/SearchHadiths";

export default function HadithsScreen() {
    const {userRole} = useAuth();
    const [listHadiths, setListHadiths] = useState([]);
    const [isActivedAdd, setIsActivedAdd] = useState(false)
    const [isActiveSearch, setIsActiveSearch] = useState(false)

    const handleAddHadiths = ()  => {
        setIsActivedAdd((prevState) => !prevState)
        if (isActiveSearch) {
            setIsActiveSearch(false)
        }
    }
    const btnSearch = ()  => {
        setIsActiveSearch((prevState) => !prevState);
        if (isActivedAdd) {
            setIsActivedAdd(false)
        }
    }
    return(
        <View style={styles.container}>
            <View style={styles.containerIconRole}>
                {
                    userRole === "user" &&
                    (
                        <TouchableOpacity onPress={btnSearch} >
                            <Ionicons name="search-outline" style={styles.icon} />
                        </TouchableOpacity>
                    )
                }
                {
                    userRole === "user" &&
                    (
                        <TouchableOpacity onPress={handleAddHadiths} >
                            <Ionicons name="add-outline" style={styles.icon} />
                        </TouchableOpacity>
                    )
                }
            </View>
            {
                isActiveSearch &&
                <View>
                    {/* <SearchHadiths 
                        isActiveSearch={isActiveSearch} 
                        setIsActiveSearch={setIsActiveSearch} 
                        listHadiths={listHadiths} 
                        setListHadiths={setListHadiths}
                    /> */}
                </View>
            }
            {
                isActivedAdd &&
                <View>
                    <AddHadiths 
                        isActivedAdd={isActivedAdd} 
                        setIsActivedAdd={setIsActivedAdd} 
                        listHadiths={listHadiths} 
                        setListHadiths={setListHadiths}
                    />
                </View>
            }
            <ListHadiths listHadiths={listHadiths}/>
        </View>
    )
};

const styles = StyleSheet.create({
    container:{
        backgroundColor:"green",
        flex:1
    },
    icon:{
        margin:10,
        padding:5,
        fontSize:25,
        fontWeight: "bold",
        borderRadius: 10,
        backgroundColor:"white",
    },
    containerIconRole:{
        flexDirection: "row",
        justifyContent:"center",
        alignItems: "center",
    },
})