import Feather from "@expo/vector-icons/Feather";
import React, { FC } from "react";

interface IconsProps {
  name: string | any;
  size: number;
  color: string;
}

export const Icons: FC<IconsProps> = ({ name, size, color }) => {
  return <Feather testID="icon" size={size} color={color} name={name} />;
};
