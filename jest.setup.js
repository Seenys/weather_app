import { useFonts } from "expo-font";

jest.mock("expo-font", () => ({
  useFonts: jest.fn(() => [true, null]),
}));
