import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { theme } from "@/constants/theme";
import { getUserById } from "@/services/dbService";
import type { User } from "@/models/User";
import dayjs from "dayjs";
import { setUserRecord } from "@/actions/action";

const ProfileScreen = () => {
  const authUser = useSelector((state: any) => state.sessionReducer.user);
  const userId: string | undefined = authUser?.id;

  const userRecord: User = useSelector(
    (state: any) => state.sessionReducer.userRecord
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const loadUser = async () => {
      if (!userId) {
        return;
      }

      const fetched = await getUserById(userId);
      if (fetched) {
        dispatch(setUserRecord(fetched));
      } else {
        Alert.alert("Error", "Could not load your profile.");
      }
    };

    loadUser();
  }, [userId]);

  const getInitialFromName = (name?: string): string => {
    return name && name.length > 0 ? name[0].toUpperCase() : "?";
  };

  if (!userRecord) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>No profile data available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {getInitialFromName(userRecord.name)}
        </Text>
      </View>
      <Text style={styles.label}>Name</Text>
      <Text style={styles.value}>{userRecord.name || "—"}</Text>

      <Text style={styles.label}>Email</Text>
      <Text style={styles.value}>{userRecord.email || "—"}</Text>

      <Text style={styles.label}>Joined On</Text>
      <Text style={styles.value}>
        {dayjs(userRecord.createdAt).format("MMM D, YYYY")}
      </Text>

      <Text style={styles.label}>Last Active</Text>
      <Text style={styles.value}>
        {dayjs(userRecord.updatedAt).format("MMM D, YYYY h:mm A")}
      </Text>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.backgrounds.white,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.backgrounds.white,
  },
  label: {
    textAlign: "center",
    fontSize: theme.fonts.size.caption,
    color: theme.colors.textLight,
    marginTop: 20,
  },
  value: {
    textAlign: "center",
    fontSize: theme.fonts.size.header,
    color: theme.colors.text,
    fontWeight: "500",
  },
  errorText: {
    fontSize: theme.fonts.size.subHeader,
    color: theme.colors.rose,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 36,
    backgroundColor: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    margin: 20,
  },
  avatarText: {
    color: theme.colors.textWhite,
    fontSize: theme.fonts.size.title,
    fontWeight: theme.fonts.weight.semibold,
  },
});
