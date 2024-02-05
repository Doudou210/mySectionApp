import { sendPasswordResetEmail } from "firebase/auth";
import { Button, View } from "react-native";
import { auth } from "../../backend/firebase";

export default function ResetPassword({email}) {
    const handleForgot = () => {
        if (email != null) {
            sendPasswordResetEmail(auth, email);
            alert("Reset Password send")
        } else {
            alert("Please enter a valid email")
        }
      }
    return(
        <View>
            <Button title="Forgot Password ?" onPress={handleForgot}/>
        </View>
    )
};
