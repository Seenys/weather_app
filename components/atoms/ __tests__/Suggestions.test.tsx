import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Suggestions from "../Suggestions";

describe("Suggestions Component", () => {
  const mockSuggestions = ["New York", "Los Angeles", "Chicago"];
  const mockOnSelect = jest.fn();

  it("renders correctly with suggestions", () => {
    const { getByText } = render(
      <Suggestions suggestions={mockSuggestions} onSelect={mockOnSelect} />,
    );

    expect(getByText("New York")).toBeTruthy();
    expect(getByText("Los Angeles")).toBeTruthy();
    expect(getByText("Chicago")).toBeTruthy();
  });

  it("calls onSelect when a suggestion is pressed", () => {
    const { getByText } = render(
      <Suggestions suggestions={mockSuggestions} onSelect={mockOnSelect} />,
    );

    fireEvent.press(getByText("Los Angeles"));

    expect(mockOnSelect).toHaveBeenCalledWith("Los Angeles");
  });

  it("does not render when suggestions are empty", () => {
    const { queryByText } = render(
      <Suggestions suggestions={[]} onSelect={mockOnSelect} />,
    );

    expect(queryByText("New York")).toBeNull();
    expect(queryByText("Los Angeles")).toBeNull();
    expect(queryByText("Chicago")).toBeNull();
  });
});
