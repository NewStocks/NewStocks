import axios from "axios";
import { Stock, FavoriteStock } from "@/types/stock";

const BASE_URL = "http://localhost:8200"; // 기본 URL

export const getFavoriteStocks = async () => {
  return axios.get(`${BASE_URL}/stock/find-favorite-stock-by-member-id/1`)
}

export const postFavoriteStock = async (stock: Stock) => {
  const data = {
    stockId: stock.id,
    stockName: stock.name,
  };
  const headers = {
    "access-token": "1",
    "Content-Type": "application/json",
  };
  return axios.post(`${BASE_URL}/stock/insert-favorite-stock`, data, {
    headers: headers,
  });
};

export const deleteFavoriteStock = async (stock: FavoriteStock) => {
  const headers = {
    "access-token": "1",
    "Content-Type": "application/json",
  };

  const data = {
    stockId: stock.stockId,
    stockName: stock.stockName,
  };

  return axios.delete(`${BASE_URL}/stock/delete-favorite-stock`, {
    headers: headers,
    data: data,
  });
};
