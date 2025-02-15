import { Image, ScrollView, Text, View } from "react-native";
import { Icons } from "../atoms/Icons";
import { theme } from "../../theme";
import { getDayName, getImageSource } from "../../utils/utils";
import React, { FC } from "react";

interface ForecastProps {
  forecast: any[];
}

const Forecast: FC<ForecastProps> = ({ forecast }) => {
  return (
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
              testID="forecast-item"
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
              <Text className="text-white font-semibold text-base tracking-widest">
                {day.condition}
              </Text>
              <Text className="text-white font-semibold text-base">
                {day.mintemp_c}°
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Forecast;
