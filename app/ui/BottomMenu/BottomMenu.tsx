import React, { FC } from "react";
import { View } from "react-native";
import { IBottomMenu } from "./menu.types";
import { menuData } from "./menu.data";
import { MenuItem } from "./MenuItem";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { gStyles } from "../../../style";

export const BottomMenu: FC<IBottomMenu> = (props) => {
  const { bottom } = useSafeAreaInsets();
  return (
    <View style={[{ marginBottom: bottom + 10 }, gStyles.bottomButtons]}>
      {menuData.map((item) => (
        <MenuItem item={item} key={item.path} {...props} />
      ))}
    </View>
  );
};
