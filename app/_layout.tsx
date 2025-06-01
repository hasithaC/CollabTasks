import { Slot } from "expo-router";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/store/store";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView, StyleSheet } from "react-native";

export default function Layout() {
  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaView style={styles.root}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Slot />
          </PersistGate>
        </Provider>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
