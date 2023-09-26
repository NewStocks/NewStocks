import styles from "./stock.module.css";

import LikeStockTab from "@/components/LikeStockTab/LikeStockTab";
import Chart from "@/components/chart/chart.js";
import TabsView from "@/components/TabsView/TabsView";
import Newstab from "@/components/News/Newstab";
import { Provider } from "@/utils/ChakraProvider";

type Props = {
  params: {
    id: string;
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export default function StockPage({ params, searchParams }: Props) {
  return (
    <div className={styles["mainpage"]}>
      <div className={styles["like-container"]}>
        <LikeStockTab />
      </div>
      <div className={styles["mid-container"]}>
        <div>
          <Provider>
            <Chart />
          </Provider>
        </div>
        <div>
          <Newstab />
        </div>
      </div>
      <div className={styles["side-container"]}>
        <TabsView />
      </div>
    </div>
  );
}
