export interface IMarket {
  price: number;
  exchange: string;
  pair: string;
  volume: number;
}
export interface IMarketProps {
  key: string;
  price: number;
  exchange: string;
  pair: string;
  volume: number;
}
export interface ICoin {
  symbol: string;
  id: string;
}
export interface IExchange {
  id: string;
}
export interface IMarketHeaderProps {
  coins: never[];
  exchanges: never[];
  selectedExchange: string;
  selectedCoin: string;
  setSelectedExchange: (arg: string) => void;
  setSelectedCoin: (arg: string) => void;
}
