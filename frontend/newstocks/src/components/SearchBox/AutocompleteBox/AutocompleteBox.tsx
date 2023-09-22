"use client";

import { forwardRef } from "react";
import StockProfile from "@/components/StockProfile/StockProfile";
import styles from "./AutocompleteBox.module.css";
import { Stock } from "@/types/stock";

interface Props {
  stockSearchList: Stock[];
  selectedItem: number | null;
  handleItemClick: Function;
  handleItemHover: Function;
}

const AutocompleteBox = forwardRef<HTMLDivElement, Props>(
  (
    { stockSearchList, selectedItem, handleItemHover, handleItemClick },
    ref
  ) => {
    const stockSearchListBox = stockSearchList.map(({ name, id }, idx) => {
      return (
        <div
          key={id}
          ref={idx === selectedItem ? ref : null}
          className={`${styles["stock-item-box"]} ${
            idx === selectedItem ? styles["stock-item-box-selected"] : ""
          }`}
          onMouseEnter={() => handleItemHover(idx)}
          onClick={() => handleItemClick(idx)}
        >
          <StockProfile
            stockName={name}
            stockId={id}
            stockImageUrl={`https://file.alphasquare.co.kr/media/images/stock_logo/kr/${id}.png`}
            size="small"
          />
        </div>
      );
    });

    return (
      <>
        <div className={styles["container"]}>
          <div className={styles["scroll-container"]}>{stockSearchListBox}</div>
        </div>
      </>
    );
  }
);

export default AutocompleteBox;
