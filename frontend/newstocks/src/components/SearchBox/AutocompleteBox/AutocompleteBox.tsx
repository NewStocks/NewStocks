"use client";
import styles from "./AutocompleteBox.module.css";
import StockProfile from "@/components/StockProfile/StockProfile";
import { forwardRef } from "react";

type Stock = {
  stockName: string;
  stockId: string;
  stockMarket?: string;
  stockImageUrl?: string;
};

interface Props {
  stockSearchList: Stock[];
  selectedItem: number | null;
  handleItemClick: Function;
  handleItemHover: Function;
}

const AutocompleteBox = forwardRef<HTMLDivElement, Props>(
  ({
    stockSearchList,
    selectedItem,
    handleItemHover,
    handleItemClick,
  }, ref) => {
    const stockSearchListBox = stockSearchList.map(
      ({ stockName, stockId, stockMarket, stockImageUrl }, idx) => {
        return (
          <div
            key={stockId}
            ref={idx === selectedItem ? ref : null}
            className={`${styles["stock-item-box"]} ${
              idx === selectedItem ? styles["stock-item-box-selected"] : ""
            }`}
            onMouseEnter={() => handleItemHover(idx)}
            onClick={() => handleItemClick(idx)}
          >
            <StockProfile
              stockName={stockName}
              stockId={stockId}
              stockMarket={stockMarket}
              stockImageUrl={stockImageUrl}
              size="small"
            />
          </div>
        );
      }
    );

    return (
      <>
        <div className={styles["container"]}>
          <div className={styles["scroll-container"]}>{stockSearchListBox}</div>
          <div></div>
        </div>
      </>
    );
  }
);

export default AutocompleteBox;
