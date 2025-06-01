import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { theme } from "@/constants/theme";
import BackButton from "@/components/buttons/BackButton";
import { useRouter } from "expo-router";
import PrimaryTextInput from "@/components/inputs/PrimaryTextInput";
import { Envelope, LockSimple } from "phosphor-react-native";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import { signInUser } from "@/services/authService";
import { useDispatch } from "react-redux";
import { setLoading, setUser } from "@/actions/action";

const LoginScreen = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    dispatch(setLoading(true));
    const { user, error } = await signInUser(email, password);

    if (error) {
      Alert.alert("Login Failed", error.message);
      dispatch(setLoading(false));
      return;
    }

    if (user) {
      dispatch(setUser(user));
      dispatch(setLoading(true));
      router.replace("/HomeScreen");
    } else {
      dispatch(setLoading(false));
      console.warn("No user object found in login response.");
    }
  };
  return (
    <View style={styles.container}>
      <BackButton
        onPress={() => {
          router.navigate("/WelcomeScreen");
        }}
      />
      <Text style={styles.title}>Hey,{"\n"}Welcome Back</Text>

      <Text style={styles.captionText}>Please login to continue</Text>

      <View style={styles.middleContainer}>
        <PrimaryTextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          LeftIcon={Envelope}
        />

        <PrimaryTextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          keyboardType="default"
          LeftIcon={LockSimple}
          secureTextEntry
        />

        <PrimaryButton
          title="Getting Started"
          style={styles.primaryButton}
          onPress={handleLogin}
        />

        <Text style={styles.bottomText}>
          Don't have an account?{" "}
          <Text
            style={styles.bottomLoginText}
            onPress={() => {
              router.navigate("/SignUpScreen");
            }}
          >
            Sign up
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 20,
    backgroundColor: theme.backgrounds.white,
  },
  title: {
    fontSize: theme.fonts.size.title,
    color: theme.colors.text,
    fontWeight: theme.fonts.weight.semibold,
    marginTop: 40,
  },
  middleContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  captionText: {
    fontSize: theme.fonts.size.caption,
    color: theme.colors.text,
    marginVertical: 20,
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
  primaryButton: {
    marginTop: 20,
  },
});
