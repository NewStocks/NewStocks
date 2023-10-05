"use client";
import { useState, useEffect } from "react";
import { useRecoilState } from 'recoil';
import { useSearchParams, useRouter } from "next/navigation";

import SearchBox from "../SearchBox/SearchBox";
import StockProfile from "../StockProfile/StockProfile";
import { Stock, FavoriteStock } from "@/types/stock";
import { allFavoriteStocksState } from "@/recoil/favoriteStock";

import styles from "./LikeStocktab.module.css";
import { IoIosAddCircleOutline } from "react-icons/io";
import { BiXCircle } from "react-icons/bi";

import {
  getFavoriteStocks,
  postFavoriteStock,
  deleteFavoriteStock,
} from "@/services/favoriteStocks";
import { getAccessToken } from '@/utils/token';
import LoginModal from '../LoginModal/LoginModal';
import { Provider } from '@/utils/ChakraProvider';

export default function LikeStockTab() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [addtoggle, setAddtoggle] = useState(false);
  const [allFavoriteStocks, setAllFavoriteStocks] = useRecoilState<FavoriteStock[]>(
    allFavoriteStocksState
  );

  useEffect(() => {
    async function getData() {
      try {
        const response = await getFavoriteStocks();
        setAllFavoriteStocks(response.data);
      } catch (e) {
      }
    }
    getData();
  }, []);

  const handleSelectStock = (id: string) => {
    const tabName = searchParams?.get("tab");
    router.push(`/${id}?tab=${tabName}`);
  };

  const handleSearch = (stock: Stock) => {
    if (allFavoriteStocks.some((item) => item.stockId === stock.id)) {
      return;
    }

    const addFavoriteStock = async (stock: Stock) => {
      try {
        const response = await postFavoriteStock(stock);
        setAllFavoriteStocks((prev) => [
          ...prev,
          { stockId: stock.id, stockName: stock.name },
        ]);
      } catch (e) {
        alert("등록에 실패했습니다.");
      }
    };

    addFavoriteStock(stock);
  };

  const handleDelete = async (e: MouseEvent, stock: FavoriteStock) => {
    e.stopPropagation();

    try {
      const response = await deleteFavoriteStock(stock);

      const changedStockList = allFavoriteStocks.filter((eachStock) => {
        return eachStock.stockId !== stock.stockId;
      });
      setAllFavoriteStocks(changedStockList);
    } catch (e) {
      // console.error(e);
      alert("삭제에 실패했습니다.");
    }
  };


  const favoriteStocks = allFavoriteStocks.map((stock) => {
    return (
      <div
        key={stock.stockId}
        className={styles["like-content-stock"]}
        onClick={() => handleSelectStock(stock.stockId)}
      >
        <StockProfile
          stockName={stock.stockName}
          stockId={stock.stockId}
          stockImageUrl={`https://file.alphasquare.co.kr/media/images/stock_logo/kr/${stock.stockId}.png`}
          size="small"
        />
        <BiXCircle
          size="18"
          onClick={(e: MouseEvent) => handleDelete(e, stock)}
          id={styles["delete-button"]}
        />
      </div>
    );
  });

  const favoriteAddButton = () => (
    <div
      className={styles["like-button"]}
      onClick={() => setAddtoggle((prev) => !prev)}
    >
      종목 추가
      <IoIosAddCircleOutline id={styles["like-button-icon"]} />
    </div>
  );

  return (
    <div className={styles["container"]}>
      <div className={styles["like-header"]}>
        <div className={styles["like-title"]}>관심 종목</div>
        <Provider>
          { getAccessToken() ? favoriteAddButton() : <LoginModal>{favoriteAddButton()}</LoginModal>}
        </Provider>
        <div
          className={styles["like-search"]}
          style={{ display: addtoggle ? "block" : "none" }}
        >
          <SearchBox searchFunc={handleSearch} />
        </div>
      </div>
      <div className={styles["like-content"]}>{favoriteStocks}</div>
    </div>
  );
}
