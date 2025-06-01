import HomeScreen from "@/app/HomeScreen";
import LoginScreen from "@/app/LoginScreen";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "@/app/WelcomeScreen";
import ProfileScreen from "@/app/ProfileScreen";
import SignUpScreen from "@/app/SignUpScreen";
import { User } from "@/models";
import { Text, View } from "react-native";
import TaskCreationScreen from "@/app/TaskCreationScreen";
import TaskDetailsScreen from "@/app/TaskDetailsScreen";

const StackNavigator = () => {
  const user: User = useSelector((state: any) => state.sessionReducer.user);

  const Stack = createStackNavigator();

  const AuthStack = () => (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Welcome"
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  );

  const AppStack = () => (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Home"
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="TaskCreation" component={TaskCreationScreen} />
      <Stack.Screen name="TaskDetails" component={TaskDetailsScreen} />
    </Stack.Navigator>
  );

  return (
    <View style={{ flex: 1, width: "100%" }}>
      {user?.role === "authenticated" ? <AppStack /> : <AuthStack />}
    </View>
  );
};

export default StackNavigator;
