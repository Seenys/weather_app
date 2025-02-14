import { View } from "react-native";
import React from "react";
import { PaperProvider } from "react-native-paper";
import { StatusBar } from "expo-status-bar";

interface ScreensProps {
  children: React.ReactNode;
}

const Screens: React.FC<ScreensProps> = ({ children }) => {
  return (
    <PaperProvider>
      <View className="flex-1 bg-black">
        <StatusBar style="auto" />
        {children}
      </View>
    </PaperProvider>
  );
};

export default Screens;
