import { FunctionComponent } from "react";
import { IMain } from "../screens/main/main.types";

export type TypeRootStackParamList = {
  Main: undefined;
  News: undefined;
  Currency: undefined;
  Crypto: undefined;
  Market: undefined;
  Converter: undefined;
};

export interface IRoute {
  name: keyof TypeRootStackParamList;
  component: FunctionComponent<IMain>;
  description: string;
}
