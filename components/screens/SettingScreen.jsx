import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DetailsProfil from "../Setting/Profil/DetailsProfil";
import { useAuth } from "../../auth/AuthContext";
import SignOut from "../connexion/updateDelete/SignOut";

const SettingScreen = ({navigation}) => {
  const {user} = useAuth();
    return(
        <View>
            <View style={styles.container}>
                {
                    user ? null
                    :(
                        <>
                            <Text style={styles.containerPre}>Sign in to access your community, members and activities</Text>
                            <View style={styles.button}>
                                <TouchableOpacity onPress={() =>navigation.navigate('SignIn')}>
                                    <Text style={styles.signInButton} >Sign In</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() =>navigation.navigate('SignUp')}>
                                    <Text style={styles.signUpButton} >Sign Up</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    )
                }
                {
                    user ? (
                        <>
                        <View style={styles.profilAccount}>
                            {/* <DetailsProfil/> */}
                            <View style={styles.profil}>
                                <TouchableOpacity onPress={() =>navigation.navigate('Details')}>
                                    <Text style={styles.profilStyle} >Profil</Text>
                                </TouchableOpacity>
                                <SignOut/>
                            </View>
                        </View>

                        <TouchableOpacity onPress={() =>navigation.navigate('Update')}>
                            <Text style={styles.profileButton} >Update Password</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() =>navigation.navigate('Delete')}>
                            <Text style={styles.profileButton} >Delete Account</Text>
                        </TouchableOpacity>
                        </>
                    ): null
                }
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        // padding: 5,
    },
    profileButton: {
        backgroundColor: "green",
        padding: 10,
        margin: 5,
        color: "white",
        textAlign: "center",
    },
    containerPre:{
        padding:10,
        textAlign:"center",
    },
    button:{
        flexDirection:"row",
        marginLeft:"auto",
        marginRight:"auto",
        marginBottom:10,
    },
    signInButton:{
        padding:10,
        textAlign:"center",
        backgroundColor:"gray",
        marginBottom:10,
        width:150,
    },
    signUpButton:{
        padding:10,
        textAlign:"center",
        backgroundColor:"green",
        color: "white",
        opacity: 100,
        width:150,
    },
    profilAccount:{
        flexDirection: "column",
        padding: 10,
    },
    profilButton:{
        backgroundColor: "gray",
        padding: 10,
        margin: 5,
        flex: 1,
    },
    profil:{
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
    },
    profilStyle: {
        backgroundColor: "gray",
        padding: 10,
        margin: 5,
        color: "white",
        textAlign: "center",
    },
})

export default SettingScreen;