import { Stack } from "expo-router";
import "../global.css";

export default function Layout() {
  return (
    <Stack
      testID="stack-component"
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
