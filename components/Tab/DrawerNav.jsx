import { createDrawerNavigator } from "@react-navigation/drawer";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TabNavigator } from "./AppNavigator";

const Drawer = createDrawerNavigator();

export default function DrawerNav() {
    return(
        <Drawer.Navigator>
            <Drawer.Screen 
                name="Home"
                component={TabNavigator}
                options={{
                    drawerLabel: "Home",
                    headerShown:false,
                    // drawerIcon: ({ color, size }) => {
                    //     <Ionicons name="chatbubbles-outline" style={{fontSize:size, color:color}} />
                    // }
                }}
            />
            {/* <Drawer.Screen 
                name="Game"
                component={Test}
                options={{
                    drawerLabel: "Game",
                    headerShown:true,
                    // drawerIcon: ({ color, size }) => {
                    //     <Ionicons name="chatbubbles-outline" style={{fontSize:size, color:color}} />
                    // }
                }}
            /> */}
        </Drawer.Navigator>
    )
};