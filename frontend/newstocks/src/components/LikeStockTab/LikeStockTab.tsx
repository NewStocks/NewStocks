"use client";
import styles from "./LikeStocktab.module.css";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

import SearchBox from "../SearchBox/SearchBox";
import StockProfile from "../StockProfile/StockProfile";
import { Stock } from "@/types/stock";

import { IoIosAddCircleOutline } from "react-icons/io";
import { LiaStar } from "react-icons/lia";
import { BiXCircle } from "react-icons/bi";

import axios from "axios";

export default function LikeStockTab() {
  const router = useRouter();
  const searchParams = useSearchParams(); 
  const [addtoggle, setAddtoggle] = useState(false);
  const [allFavoriteStocks, setAllFavoriteStocks] = useState<Stock[]>([]);

  const handleSelectStock = (id: string) => {

    const tabName = searchParams?.get("tab");
    router.push(`/${id}?tab=${tabName}`);

  }

  const handleSearch = (stock: Stock) => {
    setAllFavoriteStocks((prev) => [...prev, stock]);

    // const addFavoriteStock = async (stock: Stock) => {
    //   try {
    //     const response = await axios.post(
    //       "http://localhost:8200/stock/insert-favorite-stock",
    //       {
    //         stockId: stock.id,
    //         stockName: stock.name,
    //       },
    //       {
    //         headers: {
    //           Authorization: "",
    //         },
    //       }
    //     );
    //     console.log(response);
    //   } catch (e) {
    //     console.error(e);
    //   }
    // };

    // addFavoriteStock(stock);
  };

  const handleDelete = async (id: string, name: string) => {
    console.log("delete");
    try {
      const response = await axios.delete(
        "http://localhost:8200/stock/delete-favorite-stock",
        {
          headers: {
            Authorization: "",
          },
          data: {
            stockId: id,
            stockName: name,
          },
        }
      );
    } catch (e) {
      console.error(e);
    }
  };

  const favoriteStocks = allFavoriteStocks.map(({ name, id }) => {
    return (
      <div key={id} className={styles["like-content-stock"]} onClick={()=>handleSelectStock(id)}>
        <StockProfile
          stockName={name}
          stockId={id}
          stockImageUrl={`https://file.alphasquare.co.kr/media/images/stock_logo/kr/${id}.png`}
          size="small"
        />
        <BiXCircle size="18" onClick={handleDelete} id={styles["delete-button"]} />
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
