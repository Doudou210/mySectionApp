import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Easing, Animated } from "react-native";
import HomeStack from "../Stacks/HomeStack";
import MemberStack from "../Stacks/MembersStack";
import CommunityStack from "../Stacks/CommunityStack";
import AccountStackNavigator from "../Stacks/SettingStack";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
    return(
        <NavigationContainer>
            <Tab.Navigator screenOptions={({route}) => ({
                headerShown:false,
                tabBarInactiveTintColor:"#fff",
                tabBarActiveTintColor:"green",
                tabBarIcon:({color, size, focused}) => {
                    let iconName;
                    if (route.name == "Activities") {
                    iconName = "home-outline"
                    } else if (route.name == "Members") {
                    iconName = "people-outline"
                    }else if (route.name == "Messages") {
                    iconName = "chatbubbles-outline"
                    } else if (route.name == "Setting") {
                    iconName = "settings-outline"
                    }
                    
                    // pour modifier le style du tabs et ajouter une animation
                    const translateY = new Animated.Value(0);
                    
                    const IconStyle={
                        position: "absolute",
                        fontSize: size ? 50:15,
                        borderRadius: focused ? 100 : 0,
                        backgroundColor: focused ? "green": "transparent",
                        color: focused ? "white": color,
                        padding: focused ? 15:0,
                        transform: [{translateY}],
                    };

                    Animated.timing(translateY,{
                        toValue: focused ? -15:0,
                        duration: 200,
                        easing: Easing.ease,
                        useNativeDriver: true,
                    }).start();

                    return(
                        <Animated.View style={IconStyle}>
                            <Ionicons name={iconName} style={{fontSize:size}} />
                        </Animated.View>
                    )
                }
            })}>
                <Tab.Screen 
                    name="Activities" 
                    component={HomeStack} 
                />
                <Tab.Screen name="Members" component={MemberStack}/>
                <Tab.Screen name="Messages" component={CommunityStack}/>
                <Tab.Screen name="Setting" component={AccountStackNavigator}/>
            </Tab.Navigator>
        </NavigationContainer>
    )
};

export default AppNavigator;