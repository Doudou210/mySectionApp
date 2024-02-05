import { Button, Text, View } from "react-native";
import { auth } from "../../backend/firebase";
import { useEffect, useState } from "react";

export default function VerifMail({navigation}) {
    const [emailVerified, setEmailVerified] = useState(false);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
          if (user) {
            await user.reload();
            setEmailVerified(user.emailVerified);
          }
        });
      
        return () => {
          unsubscribe(); // Nettoyez l'écouteur lors du démontage du composant
        };
    }, []);

    // unsubscribe();
    const continueSignIn = async () => {
        // Vérifiez si l'e-mail est vérifié avant de naviguer vers la deuxième page
        if (emailVerified) {
            await navigation.navigate('SignUp');
        } else {
            alert('Veuillez vérifier votre e-mail avant de passer à la deuxième étape.');
        }
    };

    return(
        <View>
            <Text>En attant de vérification</Text>
            <Button title="Passer à la deuxième page" onPress={continueSignIn} />
        </View>
    )
};
