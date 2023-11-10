export interface ICrypto {
  id: string;
  name: string;
  price: number;
  icon: string;
  symbol: string;
  priceChange1h: number;
}
export interface ICryptoProps {
  name: string;
  price: number;
  icon: string;
  symbol: string;
  priceChange1h: number;
}

export interface IFiat {
  name: string;
}
export interface ICryptoHeaderProps {
  fiats: never[];
  selectedFiat: string;
  setSelectedFiat: (arg: string) => void;
}
