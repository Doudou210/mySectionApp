import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { auth } from "../../../backend/firebase";
import { signOut } from "firebase/auth";

export default function SignOut({navigation}) {
    const handleLogout = async() => {
        try {
            await auth.signOut();
        } catch (error) {
            console.error("Error logout", error);
        }
    };
    return(
        <View>
            <TouchableOpacity onPress={(handleLogout)}>
                <Text style={styles.profileButton} >Log Out</Text>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    profileButton: {
        backgroundColor: "red",
        padding: 10,
        margin: 5,
        color: "white",
        textAlign: "center",
    },
})
