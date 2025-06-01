import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { theme } from "@/constants/theme";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import { Pressable } from "react-native";
import { useRouter } from "expo-router";

const WelcomeScreen = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}></View>

      <PrimaryButton
        title="Getting Started"
        onPress={() => {
          router.navigate("/SignUpScreen");
        }}
      />
      <Text style={styles.bottomText}>
        Already have an account!{" "}
        <Text
          onPress={() => {
            router.navigate("/LoginScreen");
          }}
          style={styles.bottomLoginText}
        >
          Login
        </Text>
      </Text>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: theme.backgrounds.white,
  },
  bottomText: {
    fontSize: theme.fonts.size.caption,
    color: theme.colors.text,
    marginTop: 20,
  },
  bottomLoginText: {
    color: theme.colors.primary,
    fontWeight: theme.fonts.weight.semibold,
  },
});
