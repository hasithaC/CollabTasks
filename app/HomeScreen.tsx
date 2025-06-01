import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import BottomTabNavigator from "@/navigations/BottomTabNavigator";
import { theme } from "@/constants/theme";
import { PlusCircle, User, UserCircle } from "phosphor-react-native";
import { signOutUser } from "@/services/authService";
import { useDispatch } from "react-redux";
import { setUser } from "@/actions/action";
import { useRouter } from "expo-router";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const handleSignOut = async () => {
    const { error } = await signOutUser();
    if (error) {
      console.error("Sign-out error:", error);
      Alert.alert("Error", "Failed to sign out. Please try again.");
    } else {
      dispatch(setUser(null));
      Alert.alert("Success", "Signed out successfully.");
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Collab Task</Text>

        <TouchableOpacity
          style={styles.headerTouchable}
          onPress={() => {
            router.navigate("/TaskCreationScreen");
          }}
        >
          <PlusCircle size={32} color={theme.colors.dark} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.headerTouchable}
          onPress={handleSignOut}
        >
          <UserCircle size={32} color={theme.colors.dark} />
        </TouchableOpacity>
      </View>
      <BottomTabNavigator />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 20,
    backgroundColor: theme.backgrounds.white,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    flex: 1,
    fontSize: theme.fonts.size.title,
    color: theme.colors.text,
    fontWeight: theme.fonts.weight.semibold,
  },
  headerTouchable: {
    paddingHorizontal: 4,
  },
});
