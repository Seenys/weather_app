import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import SearchBar from "../SearchBar";

// Mock de react-native-paper
jest.mock("react-native-paper", () => ({
  Searchbar: ({
    value,
    placeholder,
    onChangeText,
  }: {
    value: any;
    placeholder: any;
    onChangeText: any;
  }) => (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChangeText(e.target.value)}
      data-testid="searchbar"
    />
  ),
}));

describe("SearchBar Component", () => {
  it("renders correctly", () => {
    const { getByPlaceholderText } = render(
      <SearchBar onChangeSearch={() => {}} searchQuery="" />,
    );

    expect(getByPlaceholderText("Search")).toBeTruthy();
  });

  it("calls onChangeSearch when text is changed", () => {
    const mockOnChangeSearch = jest.fn();
    const { getByPlaceholderText } = render(
      <SearchBar onChangeSearch={mockOnChangeSearch} searchQuery="" />,
    );

    const searchInput = getByPlaceholderText("Search");
    fireEvent.changeText(searchInput, "test query");

    expect(mockOnChangeSearch).toHaveBeenCalledWith("test query");
  });

  it("displays the correct searchQuery value", () => {
    const { getByPlaceholderText } = render(
      <SearchBar onChangeSearch={() => {}} searchQuery="initial query" />,
    );

    const searchInput = getByPlaceholderText("Search");
    expect(searchInput.props.value).toBe("initial query");
  });
});
