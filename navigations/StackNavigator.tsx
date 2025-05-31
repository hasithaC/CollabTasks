import HomeScreen from "@/app/HomeScreen";
import ProfileScreen from "@/app/ProfileScreen";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

const StackNavigator = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
