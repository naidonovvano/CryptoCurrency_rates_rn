export interface ICurrency {
  id: string;
  name: string;
  rate: number;
  imageUrl: string;
  symbol: string;
}

export interface ICurrencyProps {
  key: string;
  name: string;
  rate: number;
  imageUrl: string;
  symbol: string;
}

export interface ICurrencyHeaderProps {
  handleSort: () => void;
  buttonTitle: string;
  buttonColor: string;
}
