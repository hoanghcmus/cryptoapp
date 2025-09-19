export type KeyValue = {
  [key: string]: any;
};

export type Currency = {
  id: string;
  name: string;
  symbol: string;
  code?: string; // Only for fiat currencies
};