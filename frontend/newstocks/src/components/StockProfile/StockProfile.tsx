import styles from "./StockProfile.module.css";

interface Props {

  stockName: string;
  stockId: string;
  stockMarket?: string;
  stockImageUrl?: string;
  size?: 'middle' | 'small';      

}

export default function StockProfile({stockName, stockId, stockMarket, stockImageUrl, size='middle'}: Props) {
  
  const styleBySize = {
    middle: ["stock-img-box-mid", "stock-name-mid", "stock-info-mid"], 
    small: ["stock-img-box-small", "stock-name-small", "stock-info-small"]
  }

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.src = "/next.svg";
  };
  

  return (
    <>
    <div className={styles["stock-profile-wrapper"]}>
    <div className={`${styles["stock-img-box"]} ${styles[styleBySize[size][0]]}`}>
      {stockImageUrl ? <img src={stockImageUrl} alt={`${stockName}-profile-img`} onError={handleImageError} className={styles["stock-img"]} /> : ''}
    </div>
      <div className={styles["stock-info-wrapper"]}>
        <div className={styles[styleBySize[size][1]]}>{stockName}</div>
        <div className={styles[styleBySize[size][2]]}>{stockMarket? `${stockMarket} ${stockId}`: `${stockId}`}</div>
      </div>
    </div>
    </>
  );
}
