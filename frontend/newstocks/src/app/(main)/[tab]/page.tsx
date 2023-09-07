import styles from './tab.module.css'
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

export default function MainTabsPage({ params: {tab} }: Props) {
  console.log(tab)
  return (
    <>
      <div className={styles["header"]}>
        <div className={styles["header-item"]}><LiaChartPieSolid id={styles["item-icon"]}/><div className={styles["item-text"]}>기업 정보</div></div>
        <div className={styles["header-item"]}><IoMegaphoneOutline id={styles["item-icon"]}/><div className={styles["item-text"]}>관련 정보</div></div>
        <div className={styles["header-item"]}><IoDocumentTextOutline id={styles["item-icon"]}/><div className={styles["item-text"]}>오답 노트</div></div>
        <div className={styles["header-item"]}><IoChatbubbleEllipsesOutline id={styles["item-icon"]}/><div className={styles["item-text"]}>AI 챗봇</div></div>
        {/* <Link href="/chat" className={styles["header-item"]}><IoChatbubbleEllipsesOutline id={styles["item-icon"]}/><div className={styles["item-text"]}>AI 챗봇</div><Link/> */}
      </div>
      <p>{tab}</p>
    </>
  )
}