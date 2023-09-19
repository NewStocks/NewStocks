'use client';
import styles from "./AutocompleteBox.module.css";
import StockProfile from "@/components/StockProfile/StockProfile";

type Stock = {
  stockName: string; 
  stockId: string;
  stockMarket?: string;
  stockImageUrl?: string; 
}

interface Props {
  stockSearchList: Stock[];
  selectedItem: number | null;
  handleItemClick: Function;
  handleItemHover: Function;
}

export default function AutocompleteBox({ stockSearchList, selectedItem, handleItemHover, handleItemClick }: Props) {

  console.log("자식컴포넌트: "+selectedItem)


  const stockSearchListBox = stockSearchList.map(
    ({ stockName, stockId, stockMarket, stockImageUrl }, idx) => {
      return (
        <div key={stockId} className={`${styles["stock-item-box"]} ${idx === selectedItem ? styles["stock-item-box-selected"] : ""}`} onMouseEnter={()=> handleItemHover(idx)} onClick={()=>handleItemClick(idx)}>
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
      </div>
    </>
  );
}
