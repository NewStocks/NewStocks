import { useState } from 'react';
import styles from './tab.module.css';
import Link from 'next/link';
import { LiaChartPieSolid } from "react-icons/lia";
import { IoDocumentTextOutline } from "react-icons/io5";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { IoMegaphoneOutline } from "react-icons/io5";

type Props = {
  params: {
    tab: string,
  }
}

export default function MainTabsPage({ params: { tab } }: Props) {
  const [selectedIconIndex, setSelectedIconIndex] = useState(0);

  const handleIconClick = (index: number) => {
    setSelectedIconIndex(index);
  };

  return (
    <div className={styles["main"]}>
      <div className={styles["header"]}>
        <div
          className={`${styles["header-item"]} ${selectedIconIndex === 0 ? styles["selected-item"] : ''}`}
          onClick={() => handleIconClick(0)}
        >
          <LiaChartPieSolid id={styles["item-icon"]} />
          <div className={styles["item-text"]}>기업 정보</div>
        </div>
        <div
          className={`${styles["header-item"]} ${selectedIconIndex === 1 ? styles["selected-item"] : ''}`}
          onClick={() => handleIconClick(1)}
        >
          <IoMegaphoneOutline id={styles["item-icon"]} />
          <div className={styles["item-text"]}>관련 정보</div>
        </div>
        <div
          className={`${styles["header-item"]} ${selectedIconIndex === 2 ? styles["selected-item"] : ''}`}
          onClick={() => handleIconClick(2)}
        >
          <IoDocumentTextOutline id={styles["item-icon"]} />
          <div className={styles["item-text"]}>오답 노트</div>
        </div>
        <Link href="/chat" passHref
          className={`${styles["header-item"]} ${selectedIconIndex === 3 ? styles["selected-item"] : ''}`}
          onClick={() => handleIconClick(3)}
        >
          <IoChatbubbleEllipsesOutline id={styles["item-icon"]} />
          <div className={styles["item-text"]}>AI 챗봇</div>
        </Link>
      </div>
      <p>{tab}</p>

    </div>

  );
}
