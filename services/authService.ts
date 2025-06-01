import { supabase } from "@/lib/supabase";
import { User } from "@/models";
import { Alert } from "react-native";

export const signUpUser = async (
  email: string,
  password: string,
  name: string
) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name },
    },
  });
  return { data, error };
};

export const signInUser = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  const user = data?.user

  return { user, session: data?.session, error };
};

export const listenToAuthChanges = (
  callback: (user: User | null) => void
): (() => void) => {
  const { data: listener } = supabase.auth.onAuthStateChange(
    (_event, session) => {
      console.log("Auth state changed in service:", session);
      callback(session?.user ?? null);
    }
  );

  return () => {
    listener?.subscription.unsubscribe();
  };
};

export const signOutUser = async (): Promise<{ error: any }> => {
  const { error } = await supabase.auth.signOut();
  return { error };
};
