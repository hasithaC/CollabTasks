import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { persistor, store } from "@/store/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Content from "./content";

const index = () => {
  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      console.log("session user", session?.user);
    });
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Pressable
            onPress={async () => {
              const { data, error } = await supabase.auth.signUp({
                email: "chamupathihasitha@gmail.com",
                password: "123456",
                options: {
                  data: {
                    name: "Hasitha Chamupathi",
                  },
                },
              });

              console.log("LOgin Response", data, "Error", error?.message);
            }}
          >
            <Text>Reg</Text>
          </Pressable>

          <Pressable
            onPress={async () => {
              const { error } = await supabase.auth.signOut();
              console.log("Error", error);
            }}
          >
            <Text>Log Out</Text>
          </Pressable>

          <Pressable
            onPress={async () => {
              const { data, error } = await supabase.auth.signInWithPassword({
                email: "chamupathihasitha@gmail.com",
                password: "123456",
              });
              console.log("Data", data, "Error", error);
            }}
          >
            <Text>Log In</Text>
          </Pressable>

          <Pressable
            onPress={async () => {
              const { data, error } = await supabase
                .from("users")
                .select()
                .eq("id", "f4aa84a6-ad19-4bd9-b9f0-3be47b53a2f7")
                .single();

              console.log("Data", data, "Error", error);
            }}
          >
            <Text>Get User Data</Text>
          </Pressable>
          <Content/>
        </View>
      </PersistGate>
    </Provider>
  );
};

export default index;

const styles = StyleSheet.create({});
