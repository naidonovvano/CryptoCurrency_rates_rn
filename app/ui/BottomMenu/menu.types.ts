import { Ionicons } from "@expo/vector-icons";
import { TypeRootStackParamList } from "../../navigation/navigation.types";

export interface IMenuItem {
  iconName: keyof typeof Ionicons.glyphMap;
  path: keyof TypeRootStackParamList;
}
export interface IMenuItemProps {
  item: IMenuItem;
  navigation: TypeNav;
  currentRoute?: string;
}
export interface IBottomMenu {
  navigation: TypeNav;
  currentRoute?: string;
}

export type TypeNav = (name: keyof TypeRootStackParamList) => void;
