import React, { FC } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import type { IMenuItemProps } from "./menu.types";
import { AppConstants } from "../../app.constants";

export const MenuItem: FC<IMenuItemProps> = ({
  item,
  navigation,
  currentRoute,
}) => {
  const isActive = currentRoute === item.path;
  return (
    <Pressable onPress={() => navigation(item.path)}>
      <Ionicons
        name={item.iconName}
        size={26}
        color={isActive ? AppConstants.peach : AppConstants.white}
      />
    </Pressable>
  );
};
