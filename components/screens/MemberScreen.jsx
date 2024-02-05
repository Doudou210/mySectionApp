import { Button, StyleSheet, View } from "react-native";
import ListMembers from "../Members/ListMembers";

export default function MemberScreen ({navigation}) {
    const handleAddMember = () => {
        navigation.navigate("Register")
    }

    return(
        <View style={styles.container}>
            <Button onPress={handleAddMember} title="Add Member"/>
            <ListMembers/>
        </View>
    )
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: "green"
    }
})