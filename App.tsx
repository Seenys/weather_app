import { StatusBar } from "expo-status-bar";
import { View } from "react-native";

import Home from "./app/index";

export default function App() {
  return (
    <View className="flex-1 items-center justify-center">
      <StatusBar style="auto" />
      <Home />
    </View>
  );
}
