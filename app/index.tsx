// app/index.tsx
import { View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCallback, useEffect, useState } from "react";
import Screens from "../screens/ScreensLayout";

import {
  getAutocompleteSuggestions,
  getCurrentWeather,
  getWeatherForecast,
} from "../lib/service";

import Suggestions from "../components/Suggestions";
import { Citys, Weather, Forecast as ForecastType } from "../types/types";

import * as Location from "expo-location";
import debounce from "lodash.debounce";
import SearchBar from "../components/atoms/SearchBar";

import WeatherActual from "../components/molecules/WeatherActual";
import Forecast from "../components/molecules/Forecast";

export default function Page() {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [weather, setWeather] = useState<Weather | null>(null);
  const [cityTime, setCityTime] = useState<string>("");
  const [forecastData, setForecastData] = useState<any>([]);
  const [location, setLocation] = useState<string>("Bogota");

  useEffect(() => {
    handleSelectSuggestion(location).then();
  }, []);

  useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setLocation(`${latitude},${longitude}`);
    }
    getCurrentLocation();
  }, []);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.length <= 2) {
      setSuggestions([]);
      return;
    }

    try {
      const data: Citys[] = await getAutocompleteSuggestions(query);
      const listOfCities = data.map((city) => city.name);
      setSuggestions(listOfCities);
    } catch (error) {
      console.error("Error fetching autocomplete suggestions:", error);
      setSuggestions([]);
    }
  };

  const handleSelectSuggestion = async (city: string) => {
    setSearchQuery(city);
    setSuggestions([]);

    try {
      const forecastData = await getWeatherForecast(city);
      const weatherData = await getCurrentWeather(city);
      setWeather(weatherData);
      setForecastData(extractForecastData(forecastData));

      setCityTime((prev) => {
        const hour = new Date(weatherData.location.localtime);
        return hour.toLocaleTimeString();
      });
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const handleDebounce = useCallback(debounce(handleSearch, 300), []);

  const extractForecastData = (forecast: ForecastType): any[] => {
    if (!forecast.forecastday) {
      return [];
    }
    return forecast.forecastday.map((day: any) => ({
      date: day.date,
      maxtemp_c: day.day.maxtemp_c,
      mintemp_c: day.day.mintemp_c,
      condition: day.day.condition.text,
      icon: day.day.condition.icon,
    }));
  };

  return (
    <Screens>
      <View className="flex-1">
        <Image
          source={require("../assets/images/bg.png")}
          blurRadius={70}
          className="absolute w-full h-full"
        />
        <SafeAreaView className="flex-1">
          <View className="m-4 z-50">
            <View className="flex-col items-center justify-end rounded-full">
              <SearchBar
                onChangeSearch={handleDebounce}
                searchQuery={searchQuery}
              />
              {suggestions.length > 0 && (
                <Suggestions
                  suggestions={suggestions}
                  onSelect={handleSelectSuggestion}
                />
              )}
            </View>
          </View>
          <View className="mx-4 justify-around flex-1 my-4">
            <WeatherActual
              temperature={weather?.current.temp_c!}
              condition={weather?.current.condition.text!}
              city={weather?.location.name!}
              country={weather?.location.country!}
              humidity={weather?.current.humidity!}
              wind={weather?.current.wind_kph!}
              icon={weather?.current.condition.text!}
              time={cityTime}
            />
            <Forecast forecast={forecastData} />
          </View>
        </SafeAreaView>
      </View>
    </Screens>
  );
}
