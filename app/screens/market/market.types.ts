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
