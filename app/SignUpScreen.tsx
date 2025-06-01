import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { theme } from "@/constants/theme";
import BackButton from "@/components/buttons/BackButton";
import { useRouter } from "expo-router";
import PrimaryTextInput from "@/components/inputs/PrimaryTextInput";
import { Envelope, LockSimple, User } from "phosphor-react-native";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import { supabase } from "@/lib/supabase";
import { useDispatch } from "react-redux";
import { setUser } from "@/actions/action";

const SignUpScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <BackButton
        onPress={() => {
          router.navigate("/WelcomeScreen");
        }}
      />
      <Text style={styles.title}>Let's,{"\n"}Get Started</Text>

      <Text style={styles.captionText}>
        Please fill the details to create account
      </Text>

      <View style={styles.middleContainer}>
        <PrimaryTextInput
          placeholder="Name"
          value={name}
          onChangeText={setName}
          keyboardType="default"
          LeftIcon={User}
        />

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
          title="Sign up"
          style={styles.primaryButton}
          onPress={async () => {
            const { data, error } = await supabase.auth.signUp({
              email,
              password,
              options: {
                data: { name },
              },
            });

            dispatch(setUser(data.user));
          }}
        />

        <Text style={styles.bottomText}>
          Already have an account?{" "}
          <Text
            style={styles.bottomLoginText}
            onPress={() => {
              router.navigate("/LoginScreen");
            }}
          >
            Login
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default SignUpScreen;

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
