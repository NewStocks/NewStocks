import axios from "axios";
import { BASE_URL } from '../utils/url'
import { Stock, FavoriteStock } from "@/types/stock";
import { addAccessTokenToHeaders } from '@/utils/token';

export const getFavoriteStocks = async () => {
  return axios.get(`${BASE_URL}/stock/find-favorite-stock-by-member-id`, {
    headers: addAccessTokenToHeaders(),
  })
}

export const postFavoriteStock = async (stock: Stock) => {
  const data = {
    stockId: stock.id,
    stockName: stock.name,
  };

  return axios.post(`${BASE_URL}/stock/insert-favorite-stock`, data, {
    headers: addAccessTokenToHeaders(),
  });
};

export const deleteFavoriteStock = async (stock: FavoriteStock) => {

  const data = {
    stockId: stock.stockId,
    stockName: stock.stockName,
  };

  return axios.delete(`${BASE_URL}/stock/delete-favorite-stock`, {
    headers: addAccessTokenToHeaders(),
    data: data,
  });
};
