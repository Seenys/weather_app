import React from "react";
import { render, screen } from "@testing-library/react-native";
import WeatherActual from "../WeatherActual";

describe("WeatherActual Component", () => {
  const mockProps = {
    temperature: 25,
    condition: "Sunny",
    city: "Madrid",
    country: "Spain",
    humidity: 60,
    wind: 10,
    icon: "sunny",
    time: "10:00 AM",
  };

  it("renders the weather information correctly", () => {
    render(<WeatherActual {...mockProps} />);

    expect(screen.getByText("Madrid, Spain")).toBeTruthy();

    expect(screen.getByText("25°")).toBeTruthy();

    expect(screen.getByText("Sunny")).toBeTruthy();

    expect(screen.getByText("60%")).toBeTruthy();

    expect(screen.getByText("10 kph")).toBeTruthy();

    expect(screen.getByText("10:00 AM")).toBeTruthy();
  });

  it("renders the correct icon", () => {
    render(<WeatherActual {...mockProps} />);

    const image = screen.getByTestId("weather-icon");
    expect(image.props.source).toBeDefined();
  });

  it("renders empty string when icon is not provided", () => {
    render(<WeatherActual {...mockProps} icon="" />);

    const image = screen.getByTestId("weather-icon");
    expect(image.props.source).toBeDefined();
  });
});
