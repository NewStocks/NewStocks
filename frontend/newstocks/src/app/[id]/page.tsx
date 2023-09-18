import styles from './stock.module.css'

import LikeStockTab from '@/components/LikeStockTab/LikeStockTab'
import Chart from '@/components/chart/chart'
import TabsView from '@/components/TabsView/TabsView'
import Newstab from '@/components/News/Newstab'

type Props = {
  params: {
    id: string,
  }
  searchParams: {
    [key: string]: string | string[] | undefined 
  }
  newsData: string;
}

export default function StockPage({ params, searchParams, newsData}: Props) {
  return (
    <div>
      <div className={styles["mainpage"]}>
          <div className={styles["like-container"]}>
            <div className={styles["like-tab"]}>
              <div className={styles["like-tab-sticky"]}>
                <LikeStockTab />
              </div>
            </div>
          </div>
          <div>
            <div className='components'>
              <Chart />
            </div>
            <div>
              <Newstab />
            </div>
          </div>
            <div> 
              <div id="portal"></div>
            </div>
            <div className={styles["Side-container"]}>
              <TabsView />
            </div>
        </div>
    </div>
  );
}