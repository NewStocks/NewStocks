import { atom } from "recoil";
import { FavoriteStock } from "@/types/stock";

// TodoInput에서 입력하는 값을 atom으로 관리하는 방식
export const allFavoriteStocksState = atom<FavoriteStock[]>({
  key: 'allFavoriteStocksState',
  // key의 값은 항상 고유값이어야 합니다.
  default: [],
});