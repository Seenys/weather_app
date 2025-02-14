// app/index.tsx
import { View, Text, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Searchbar } from "react-native-paper";
import { useCallback, useEffect, useState } from "react";
import Screens from "../screens/ScreensLayout";
import { Icons } from "../components/Icons";
import {
  getAutocompleteSuggestions,
  getCurrentWeather,
  getWeatherForecast,
} from "../lib/service";
import { debounce } from "lodash";
import Suggestions from "../components/Suggestions";
import { Citys, Forecast, Weather } from "../types/types";
import { theme } from "../theme";

export default function Page() {
  const [searchQuery, setSearchQuery] = useState("Bogota");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [weather, setWeather] = useState<Weather | null>(null);
  const [cityTime, setCityTime] = useState<string>("");
  const [forecast, setForecast] = useState<any>([]);

  useEffect(() => {
    handleSelectSuggestion("Bogota");
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
      setForecast(extractForecastData(forecastData));

      setCityTime((prev) => {
        const hour = new Date(weatherData.location.localtime);
        return hour.toLocaleTimeString();
      });

      console.log(weatherData, "weatherData");
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const handleDebounce = useCallback(debounce(handleSearch, 100), []);

  const getImageSource = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "sunny":
        return require("../assets/images/sun.png");
      case "rain":
        return require("../assets/images/heavyrain.png");
      case "cloudy":
        return require("../assets/images/cloud.png");
      case "partly cloudy":
        return require("../assets/images/partlycloudy.png");
      case "mist":
        return require("../assets/images/mist.png");
      case "overcast":
        return require("../assets/images/moderaterain.png");
      default:
        return require("../assets/images/sun.png");
    }
  };

  const extractForecastData = (forecast: Forecast): any[] => {
    if (!forecast.forecastday) {
      return [];
    }
    return forecast.forecastday.map((day) => ({
      date: day.date,
      maxtemp_c: day.day.maxtemp_c,
      mintemp_c: day.day.mintemp_c,
      condition: day.day.condition.text,
      icon: day.day.condition.icon,
    }));
  };

  const getDayName = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { weekday: "long" });
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
              <Searchbar
                placeholder="Search"
                onChangeText={handleDebounce}
                value={searchQuery}
                className="rounded-full"
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
            <Text className="text-white text-center text-2xl font-bold">
              {weather?.location.name},
              <Text className="text-gray-300 text-center text-lg font-semibold">
                {" "}
                {weather?.location.country}{" "}
              </Text>
            </Text>
            <View className="flex-row justify-center">
              <Image
                source={getImageSource(weather?.current.condition.text || "")}
                className="w-52 h-52"
              />
            </View>
            <View className="scroll-py-2">
              <Text className="text-center font-bold text-white text-6xl ml-5">
                {weather?.current.temp_c}°
              </Text>
              <Text className="text-center font-bold text-white text-xl tracking-widest">
                {weather?.current.condition.text}
              </Text>
            </View>
            <View className="flex-row justify-between mx-4">
              <View className="flex-row gap-4 items-center">
                <Image
                  source={require("../assets/icons/wind.png")}
                  className="w-6 h-6"
                />
                <Text className="text-white font-semibold text-base">
                  {weather?.current.wind_kph} kph
                </Text>
              </View>
              <View className="flex-row gap-4 items-center">
                <Image
                  source={require("../assets/icons/sun.png")}
                  className="w-6 h-6"
                />
                <Text className="text-white font-semibold text-base">
                  {cityTime}
                </Text>
              </View>
              <View className="flex-row gap-4 items-center">
                <Image
                  source={require("../assets/icons/drop.png")}
                  className="w-6 h-6"
                />
                <Text className="text-white font-semibold text-base">
                  {weather?.current.humidity}%
                </Text>
              </View>
            </View>
            <View className="mb-4 space-x-3">
              <View className="flex-row items-center mx-5 mb-3 gap-4">
                <Icons name="calendar" size={22} color="white" />
                <Text className="text-white text-base">Daily forecast</Text>
              </View>
              <ScrollView
                horizontal
                contentContainerStyle={{ paddingHorizontal: 15 }}
                showsHorizontalScrollIndicator={false}
              >
                {forecast?.map((day: any) => {
                  return (
                    <View
                      key={day.date}
                      className="justify-center items-center w-24 rounded-3xl ml-2 py-3 gap-1"
                      style={{ backgroundColor: theme.bgWhite(0.15) }}
                    >
                      <Text className="text-white font-semibold text-base">
                        {getDayName(day.date)}
                      </Text>
                      <Image
                        source={getImageSource(day.condition)}
                        className="w-12 h-12"
                      />
                      <Text className="text-white font-semibold text-base">
                        {day.maxtemp_c}°
                      </Text>
                      <Text className="text-white font-semibold text-base">
                        {day.mintemp_c}°
                      </Text>
                    </View>
                  );
                })}
              </ScrollView>
            </View>
          </View>
        </SafeAreaView>
      </View>
    </Screens>
  );
}
