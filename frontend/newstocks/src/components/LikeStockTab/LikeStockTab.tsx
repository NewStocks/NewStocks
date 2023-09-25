"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import SearchBox from "../SearchBox/SearchBox";
import StockProfile from "../StockProfile/StockProfile";
import { Stock, FavoriteStock } from "@/types/stock";

import styles from "./LikeStocktab.module.css";
import { IoIosAddCircleOutline } from "react-icons/io";
import { BiXCircle } from "react-icons/bi";

import { getFavoriteStocks, postFavoriteStock, deleteFavoriteStock } from "@/services/favoriteStocks";

export default function LikeStockTab() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [addtoggle, setAddtoggle] = useState(false);
  const [allFavoriteStocks, setAllFavoriteStocks] = useState<FavoriteStock[]>([]);

  useEffect(()=> {
    async function getData() {
      try {
        const response = await getFavoriteStocks();
        console.log(response);
        setAllFavoriteStocks(response.data);

      } catch (e) {
        console.error(e);
      }
    }
    getData(); 
  }, [])


  const handleSelectStock = (id: string) => {
    const tabName = searchParams?.get("tab");
    router.push(`/${id}?tab=${tabName}`);
  };

  const handleSearch = (stock: Stock) => {

    if (allFavoriteStocks.find(item => item.stockId === stock.id)) {
      return; 
    }

    const addFavoriteStock = async (stock: Stock) => {
      try {
        const response = await postFavoriteStock(stock); 
        // console.log(response);
        setAllFavoriteStocks((prev) => [...prev, {stockId: stock.id, stockName: stock.name}]);
      } catch (e) {
        console.error(e);
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
      console.error(e);
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
          onClick={(e: MouseEvent)=>handleDelete(e, stock)}
          id={styles["delete-button"]}
        />
      </div>
    );
  });

  return (
    <div className={styles["liketab-container"]}>
      <div className={styles["like-container"]}>
        <div className={styles["liketab-title"]}>관심 종목</div>
        <div
          className={styles["like-button"]}
          onClick={() => setAddtoggle((prev) => !prev)}
        >
          종목 추가
          <IoIosAddCircleOutline id={styles["like-button-icon"]} />
        </div>

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
