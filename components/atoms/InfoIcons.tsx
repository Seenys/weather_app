import { Image, Text, View } from "react-native";
import { FC } from "react";

interface InfoIconsProps {
  icon: string;
  info: string | number;
}

const InfoIcons: FC<InfoIconsProps> = ({ icon, info }) => {
  const getImageSource = (icon: string) => {
    switch (icon) {
      case "wind":
        return require("../../assets/icons/wind.png");
      case "sun":
        return require("../../assets/icons/sun.png");
      case "drop":
        return require("../../assets/icons/drop.png");
      default:
        return require("../../assets/icons/wind.png");
    }
  };

  return (
    <View className="flex-row gap-4 items-center">
      <Image source={getImageSource(icon)} className="w-6 h-6" />
      <Text className="text-white font-semibold text-base">{info}</Text>
    </View>
  );
};

export default InfoIcons;
