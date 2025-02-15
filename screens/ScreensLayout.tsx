import { View, Text } from "react-native";
import React from "react";
import { PaperProvider } from "react-native-paper";
import { StatusBar } from "expo-status-bar";

interface ScreensProps {
  children: React.ReactNode;
}

const Screens: React.FC<ScreensProps> = ({ children }) => {
  return (
    <PaperProvider>
      <View className="flex-1 bg-black" testID="paper-provider">
        <StatusBar style="auto" testID="status-bar" />
        {children}
      </View>
    </PaperProvider>
  );
};

export default Screens;
