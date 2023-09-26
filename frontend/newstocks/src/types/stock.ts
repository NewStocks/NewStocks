export type Stock = {
  id: string;
  name: string;
  stockMarket?: string;
};

export type FavoriteStock = {
  stockId: string; 
  stockName: string; 
}