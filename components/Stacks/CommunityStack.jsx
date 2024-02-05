import { createStackNavigator } from "@react-navigation/stack"
import CommunityScreen from "../screens/CommunautyScreen"
import AddMessages from "../communauty/AddMessages"
import { createDrawerNavigator } from "@react-navigation/drawer"

const Stack = createStackNavigator()

export default function CommunityStack() {
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="Community"
                component={CommunityScreen}
                options={{ headerShown: false}}
            />
            <Stack.Screen
                name="Add"
                component={AddMessages}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
};