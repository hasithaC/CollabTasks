import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AssignedTasksView from "@/components/views/AssignedTasksView";
import CreatedTasksView from "@/components/views/CreatedTasksView";
import AllTasksView from "@/components/views/AllTasksView";
import { User, List } from "phosphor-react-native";
import { theme } from "@/constants/theme";
import ProfileScreen from "@/app/ProfileScreen";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size, focused }) => {
          const iconSize = focused ? 32 : 24;
          switch (route.name) {
            case "Profile":
              return (
                <User
                  size={iconSize}
                  color={color}
                  weight={focused ? "fill" : "regular"}
                />
              );
            case "All":
              return (
                <List
                  size={iconSize}
                  color={color}
                  weight={focused ? "fill" : "regular"}
                />
              );
            default:
              return null;
          }
        },
        sceneStyle: {
          backgroundColor: theme.backgrounds.white,
          paddingTop: 20,
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.gray,
        tabBarStyle: styles.tabBar,
        headerShown: false,
      })}
    >
      <Tab.Screen name="All" component={AllTasksView} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: theme.backgrounds.white,
    borderTopWidth: 0.5,
    borderTopColor: "#ddd",
    height: 60,
    paddingBottom: 8,
    paddingTop: 8,
  },
});
