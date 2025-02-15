import React from "react";
import { render } from "@testing-library/react-native";
import Page from "../index";

// Mock the necessary components and hooks
jest.mock("expo-location", () => ({
  requestForegroundPermissionsAsync: jest.fn(() =>
    Promise.resolve({ status: "granted" }),
  ),
  getCurrentPositionAsync: jest.fn(() =>
    Promise.resolve({ coords: { latitude: 40.4168, longitude: -3.7038 } }),
  ),
}));

jest.mock("../../lib/service", () => ({
  getAutocompleteSuggestions: jest.fn(() => Promise.resolve([])),
  getCurrentWeather: jest.fn(() => Promise.resolve({})),
  getWeatherForecast: jest.fn(() => Promise.resolve({})),
}));

jest.mock("../../components/molecules/WeatherActual", () => () => <></>);
jest.mock("../../components/molecules/Forecast", () => () => <></>);
jest.mock("../../components/atoms/SearchBar", () => () => <></>);
jest.mock("../../components/atoms/Suggestions", () => () => <></>);

describe("Page Component", () => {
  it("renders without crashing", () => {
    // Render the component
    const { getByTestId } = render(<Page />);

    // Check if the main container is rendered
    const container = getByTestId("page-container");
    expect(container).toBeTruthy();
  });
});
// Mock the getAutocompleteSuggestions function

describe("handleSearch Function", () => {
  it("sets suggestions to an empty array if query length is less than or equal to 2", async () => {
    // Render the component
    const { getByTestId } = render(<Page />);

    // Simulate user input with a short query
    const searchInput = getByTestId("search-bar-input");
    await act(async () => {
      fireEvent.changeText(searchInput, "ab");
    });

    // Verify that suggestions are empty
    const suggestionsContainer = getByTestId("suggestions-container");
    expect(suggestionsContainer.children.length).toBe(0);
  });

  it("fetches and sets suggestions if query length is greater than 2", async () => {
    // Mock the API response
    const mockData = [{ name: "Madrid" }, { name: "Barcelona" }];
    (getAutocompleteSuggestions as jest.Mock).mockResolvedValue(mockData);

    // Render the component
    const { getByTestId } = render(<Page />);

    // Simulate user input with a valid query
    const searchInput = getByTestId("search-bar-input");
    await act(async () => {
      fireEvent.changeText(searchInput, "Mad");
    });

    // Verify that suggestions are set correctly
    const suggestionsContainer = getByTestId("suggestions-container");
    expect(suggestionsContainer.children.length).toBe(2);
    expect(suggestionsContainer).toHaveTextContent("Madrid");
    expect(suggestionsContainer).toHaveTextContent("Barcelona");
  });

  it("sets suggestions to an empty array if the API call fails", async () => {
    // Mock a failed API call
    (getAutocompleteSuggestions as jest.Mock).mockRejectedValue(
      new Error("API Error"),
    );

    // Render the component
    const { getByTestId } = render(<Page />);

    // Simulate user input with a valid query
    const searchInput = getByTestId("search-bar-input");
    await act(async () => {
      fireEvent.changeText(searchInput, "Mad");
    });

    // Verify that suggestions are empty
    const suggestionsContainer = getByTestId("suggestions-container");
    expect(suggestionsContainer.children.length).toBe(0);
  });
});
