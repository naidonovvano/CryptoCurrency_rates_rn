import { Converter } from "../screens/converter/Converter";
import { Crypto } from "../screens/crypto/Crypro";
import { Currency } from "../screens/currency/Currency";
import { Main } from "../screens/main/Main";
import { News } from "../screens/news/News";
import { Market } from "../screens/market/Market";
import { IRoute } from "./navigation.types";

export const routes: IRoute[] = [
  {
    name: "Main",
    component: Main,
    description: "Overview",
  },
  {
    name: "News",
    component: News,
    description: "Latest crypto news from verified 40+ news sources",
  },
  {
    name: "Currency",
    component: Currency,
    description: "The most widely used fiat currencies in the world",
  },
  {
    name: "Crypto",
    component: Crypto,
    description: "Coin List with global average prices order with market cap",
  },
  {
    name: "Market",
    component: Market,
    description:
      "Market prices across all exchanges specified coin is trading in",
  },
  {
    name: "Converter",
    component: Converter,
    description: "Сash-to-cryptocurrency converter",
  },
];
