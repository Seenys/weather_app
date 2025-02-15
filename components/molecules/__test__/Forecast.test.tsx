import React from "react";
import { render, screen } from "@testing-library/react-native";
import Forecast from "../Forecast";

describe("Forecast Component", () => {
  const mockForecast = [
    {
      date: "2023-10-01",
      condition: "Sunny",
      mintemp_c: 20,
    },
    {
      date: "2023-10-02",
      condition: "Cloudy",
      mintemp_c: 18,
    },
  ];

  it("renders the forecast correctly", () => {
    render(<Forecast forecast={mockForecast} />);

    expect(screen.getByText("Daily forecast")).toBeTruthy();

    expect(screen.getByText("Sunny")).toBeTruthy();
    expect(screen.getByText("Cloudy")).toBeTruthy();

    expect(screen.getByText("20°")).toBeTruthy();
    expect(screen.getByText("18°")).toBeTruthy();
  });

  it("renders the correct number of forecast items", () => {
    render(<Forecast forecast={mockForecast} />);

    const forecastItems = screen.getAllByTestId("forecast-item");
    expect(forecastItems.length).toBe(2);
  });
});
