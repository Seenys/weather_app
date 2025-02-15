import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {
  getCurrentWeather,
  getWeatherForecast,
  getAutocompleteSuggestions,
} from "../service";

const mock = new MockAdapter(axios);
const API_KEY = process.env.EXPO_PUBLIC_WEATHER_API_KEY;
const BASE_URL = "https://api.weatherapi.com/v1";

describe("Weather Service", () => {
  afterEach(() => {
    mock.reset();
  });

  it("fetches current weather data successfully", async () => {
    const mockData = { current: { temp_c: 25, condition: { text: "Sunny" } } };
    mock.onGet(`${BASE_URL}/current.json`).reply(200, mockData);

    const result = await getCurrentWeather("Madrid");
    expect(result).toEqual(mockData);
  });

  it("fetches weather forecast data successfully", async () => {
    const mockData = {
      forecast: {
        forecastday: [
          {
            date: "2023-10-01",
            day: { maxtemp_c: 30, mintemp_c: 20, condition: { text: "Sunny" } },
          },
        ],
      },
    };
    mock.onGet(`${BASE_URL}/forecast.json`).reply(200, mockData);

    const result = await getWeatherForecast("Madrid");
    expect(result).toEqual(mockData.forecast);
  });

  it("fetches autocomplete suggestions successfully", async () => {
    const mockData = [{ name: "Madrid" }];
    mock.onGet(`${BASE_URL}/search.json`).reply(200, mockData);

    const result = await getAutocompleteSuggestions("Mad");
    expect(result).toEqual(mockData);
  });

  it("throws an error when fetching current weather data fails", async () => {
    mock.onGet(`${BASE_URL}/current.json`).reply(500);

    await expect(getCurrentWeather("Madrid")).rejects.toThrow(
      "Error fetching current weather data",
    );
  });

  it("throws an error when fetching weather forecast data fails", async () => {
    mock.onGet(`${BASE_URL}/forecast.json`).reply(500);

    await expect(getWeatherForecast("Madrid")).rejects.toThrow(
      "Error fetching weather forecast data",
    );
  });

  it("throws an error when fetching autocomplete suggestions fails", async () => {
    mock.onGet(`${BASE_URL}/search.json`).reply(500);

    await expect(getAutocompleteSuggestions("Mad")).rejects.toThrow(
      "Error fetching autocomplete suggestions",
    );
  });
});
