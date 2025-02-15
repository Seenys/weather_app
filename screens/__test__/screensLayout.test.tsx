import React from "react";
import { render } from "@testing-library/react-native";
import Screens from "../ScreensLayout";
import { PaperProvider } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { Text } from "react-native";

describe("ScreensLayout", () => {
  it("renders children correctly", () => {
    const { getByText } = render(
      <Screens>
        <Text>Test Child</Text>
      </Screens>,
    );

    expect(getByText("Test Child")).toBeTruthy();
  });

  it("uses PaperProvider and StatusBar components", () => {
    const { getByTestId } = render(
      <Screens>
        <Text>Test Child</Text>
      </Screens>,
    );

    expect(getByTestId("paper-provider")).toBeTruthy();
    expect(getByTestId("status-bar")).toBeTruthy();
  });
});
