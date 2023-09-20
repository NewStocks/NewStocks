// 'use client';
// 빠른 작업위해 CSR로 작업하고, 추후 SSG로 개선 예정

import styles from './minepage.module.css'

// searchParams 활용한 나의 노트 라우팅 (나의 노트/스크랩 노트/팔로잉 노트)
type Props = {
  searchParams: {
    [key: string]: string | string[] | undefined 
  }
}

import Button from '@/components/Button/Button'
import Card from '@/components/Card/Card'

export default function MynotesPage({ searchParams }: Props) {

  return (
    <div className={styles.main}>
      <div>
        <div className={styles["upper-title"]}>커뮤니티</div>
        {searchParams.page=='my' && (
          <>
          <div className={styles["page-title"]}>나의 노트</div>
          <div className={styles["my-button-box"]}>
            <div className={styles["sorted-Button-width"]}><Button text="종목별" kindof="sorted" highlight={false}></Button></div>
            <div className={styles["sorted-Button-width"]}><Button text="최신순" kindof="sorted" highlight={false}></Button></div>
          </div>
          </>
        )}
        {searchParams.page=='scrap' && (
          <>
          <div className={styles["page-title"]}>스크랩 노트</div>
          {/* <div className={styles["my-button-box"]}>
            <div className={styles["sorted-Button-width"]}><Button text="종목별" sorted={true}></Button></div>
            <div className={styles["sorted-Button-width"]}><Button text="최신순" sorted={true}></Button></div>
          </div> */}
          </>
        )}
        {searchParams.page=='following' && (
          <>
          <div className={styles["page-title"]}>팔로잉 노트</div>
          <div className={styles["my-button-box"]}>
            <div className={styles["sorted-Button-width"]} id={styles["following"]}><Button text="Anima Ag." kindof="sorted" highlight={false}></Button></div>
            <div className={styles["sorted-Button-width"]} id={styles["following"]}><Button text="오준석바보" kindof="sorted" highlight={false}></Button></div>
          </div>
          </>
        )}
        <div className={styles["cards-container"]}>
          <Card type=""/>
          <Card type=""/>
          <Card type=""/>
          <Card type=""/>
          <Card type=""/>
          <Card type=""/>
        </div>
      </div>

    </div>
  )
}