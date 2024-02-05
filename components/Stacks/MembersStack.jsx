import { createStackNavigator } from "@react-navigation/stack";
import RegisterMembers from "../Members/MembersRegister";
import MemberScreen from "../screens/MemberScreen";

const Stack = createStackNavigator();

const MemberStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Member"
        component={MemberScreen}
        options={{ headerShown: false}}
      />
      <Stack.Screen 
        name="Register"
        component={RegisterMembers}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default MemberStack;