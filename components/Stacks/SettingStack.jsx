import { createStackNavigator } from "@react-navigation/stack";
import DetailsProfil from "../Setting/Profil/DetailsProfil";
import DeleteAccount from "../connexion/updateDelete/DeleteAccount";
import UpdatePassword from "../connexion/updateDelete/UpdatePassword";
import SettingScreen from "../screens/SettingScreen";
import SignIn from "../connexion/SignIn";
import SignUp from "../connexion/SignUp";
import VerifMail from "../connexion/VerifMail";

const Stack = createStackNavigator();

const AccountStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SettingHome"
        component={SettingScreen}
        options={{ headerShown: false}}
      />
      <Stack.Screen 
        name="SignIn"
        component={SignIn}
        options={{ headerShown: false}}
      />
      <Stack.Screen 
        name="SignUp"
        component={SignUp}
        options={{headerShown: false}}
      />
      <Stack.Screen 
        name="VerifMail"
        component={VerifMail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Update"
        component={UpdatePassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Delete"
        component={DeleteAccount}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Details"
        component={DetailsProfil}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AccountStackNavigator;