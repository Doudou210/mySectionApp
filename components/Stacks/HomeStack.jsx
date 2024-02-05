import HomeScreen from "../screens/HomeScreen";
import Hadiths from "../screens/HadithsScreen";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Stack = createMaterialTopTabNavigator()

export default function HomeStack() {
    return( 
        <Stack.Navigator>
            <Stack.Screen
                name="Activity"
                component={HomeScreen}
                options={{ headerShown: false}}
            />
            <Stack.Screen
                name="Hadiths"
                component={Hadiths}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
};
