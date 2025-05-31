import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AssignedTasksView from "@/components/Views/AssignedTasksView";
import CreatedTasksView from "@/components/Views/CreatedTasksView";
import AllTasksView from "@/components/Views/AllTasksView";
import {
  ClipboardText,
  PencilSimple,
  ListChecks,
} from "phosphor-react-native";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size, focused }) => {
          const iconSize = focused ? 26 : 22;
          switch (route.name) {
            case "Assigned":
              return <ClipboardText size={iconSize} color={color} weight={focused ? "fill" : "regular"} />;
            case "Created":
              return <PencilSimple size={iconSize} color={color} weight={focused ? "fill" : "regular"} />;
            case "All":
              return <ListChecks size={iconSize} color={color} weight={focused ? "fill" : "regular"} />;
            default:
              return null;
          }
        },
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "#8E8E93",
        tabBarStyle: styles.tabBar,
        headerShown: false,
      })}
    >
      <Tab.Screen name="Assigned" component={AssignedTasksView} />
      <Tab.Screen name="Created" component={CreatedTasksView} />
      <Tab.Screen name="All" component={AllTasksView} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#fff",
    borderTopWidth: 0.5,
    borderTopColor: "#ddd",
    height: 60,
    paddingBottom: 8,
    paddingTop: 8,
  },
});
