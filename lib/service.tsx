// lib/service.tsx
import axios from "axios";
import { Weather, Forecast, Citys } from "../types/types";

const API_KEY = process.env.EXPO_PUBLIC_WEATHER_API_KEY;

const BASE_URL = "https://api.weatherapi.com/v1";

if (!API_KEY) {
  console.error("API_KEY is not set. Please check your environment variables.");
}

export const getCurrentWeather = async (city: string): Promise<Weather> => {
  try {
    const response = await axios.get(`${BASE_URL}/current.json`, {
      params: {
        key: API_KEY,
        q: city,
        aqi: "no",
      },
    });

    return response.data;
  } catch (error) {
    throw new Error("Error fetching current weather data");
  }
};

export const getWeatherForecast = async (city: string): Promise<Forecast> => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast.json`, {
      params: {
        key: API_KEY,
        q: city,
        days: 5,
        aqi: "no",
        alerts: "no",
      },
    });
    return response.data.forecast;
  } catch (error) {
    throw new Error("Error fetching weather forecast data");
  }
};

export const getAutocompleteSuggestions = async (
  query: string,
): Promise<Citys[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/search.json`, {
      params: {
        key: API_KEY,
        q: query,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error fetching autocomplete suggestions");
  }
};
