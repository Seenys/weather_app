import { Stack } from "expo-router";
import "../global.css";
import { PaperProvider } from "react-native-paper";
export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
