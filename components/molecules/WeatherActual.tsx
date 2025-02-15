import { FC } from "react";
import { Image, Text, View } from "react-native";
import InfoIcons from "../atoms/InfoIcons";
import { getImageSource } from "../../utils/utils";

interface WeatherActualProps {
  temperature: number;
  condition: string;
  city: string;
  country: string;
  humidity: number;
  wind: number;
  icon: string;
  time: string;
}

const WeatherActual: FC<WeatherActualProps> = ({
  temperature,
  condition,
  city,
  country,
  humidity,
  wind,
  icon,
  time,
}) => {
  return (
    <>
      <Text className="text-white text-center text-2xl font-bold">
        {city},
        <Text className="text-gray-300 text-center text-lg font-semibold">
          {" "}
          {country}{" "}
        </Text>
      </Text>
      <View className="flex-row justify-center">
        <Image source={getImageSource(icon || "")} className="w-52 h-52" />
      </View>
      <View className="scroll-py-2">
        <Text className="text-center font-bold text-white text-6xl ml-5">
          {temperature}°
        </Text>
        <Text className="text-center font-bold text-white text-xl tracking-widest">
          {condition}
        </Text>
      </View>
      <View className="flex-row justify-between mx-4">
        <InfoIcons icon="wind" info={`${wind} kph`} />
        <InfoIcons icon="sun" info={time} />
        <InfoIcons icon="drop" info={`${humidity}%`} />
      </View>
    </>
  );
};

export default WeatherActual;
