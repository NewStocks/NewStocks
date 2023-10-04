'use client'
import styles from './noticedetail.module.css'
import { useRouter } from 'next/navigation' 
import Image from 'next/image'

import { IoIosArrowBack } from "react-icons/io";

type Props = {
  params: {
    id: string;
  };
};

export default function NoticeDetailPage({ params: {id} }: Props) {
  const router = useRouter()

  const handleGoBack = () => {
    router.back();
  };
  return (
    <div className={styles["main"]}>
      <div className={styles["detail-back"]}>
        <button>
          <div style={{ display: "flex"}} onClick={handleGoBack}>
            <IoIosArrowBack size="23" />뒤로가기
          </div>
        </button>
      </div>

      <div className={styles["head-title"]}>
        <div className={styles["date"]}>2023-10-04</div>
        <div className={styles["title"]}>환영합니다! 뉴스와 차트를 한번에, <span>NEWStocks</span>!</div>
      </div>

      {/* <Image /> */}

      <div className={styles["paragraph"]}>
        <div>주식 투자, 잘 하고 계신가요?</div>
        <div>성공적인 주식 투자를 위해서는 오답노트 작성이 필수!:</div>

        <div>주식정보, 뉴스, 오답노트 기록일지를 한데 모은</div>
        <div>NEWStocks에서 좋은 주식투자 습관을 길러보세요!</div>
      </div>

      <div className={styles["paragraph"]}>
        <div style={{ fontSize: "20px", fontWeight: "550"}}>NEWStocks를 사용하면?</div>

        <div>
          <div>
            <span>01</span>
            <div>주식 오답 노트 기록을 통해 나의 매매 복기 후 투자 실력 향상!</div>  
          </div>

          <div>
            <span>02</span>
            <div>삼성 주가, 갑자기 왜 올랐을까? 주식 관련 뉴스를 차트에서 바로 확인해보세요! 비슷한 이슈를 다루는 뉴스의 수를 제공해 해당 이슈의 영향력도 확인해 볼 수 있습니다.</div>  
          </div>

          <div>
            <span>03</span>
            <div>이 기업과 관련 있는 해외 기업은 어떤 게 있을까? 국내 금융 투자자들이 분석한 해외 밸류 체인 기업 정보 얻어가기</div>  
          </div>

        </div>
      </div>


      <div className={styles["paragraph"]}>
        <div>
          <div>서비스를 이용하시면서 게시물을 작성하시거나, 관심 종목을 등록하시고 아래의 간단한 설문에 참여해주시면 랜덤으로 10분께 스타벅스 아메리카노 기프티콘을 드립니다!</div>
          <a href='https://forms.gle/7vjF5fRJEExfTLZg9'>폼 작성 바로가기</a>
        </div>

        <div>
          <div>이용 중 문의 사항은 아래의 1대1 오픈 카카오톡을 통해 문의하실 수 있습니다.
응답이 늦어질수도 있는 점 양해 부탁 드립니다!</div>
          <a href='https://open.kakao.com/o/sYsFZsKf'></a>
        </div>
      </div>
    </div>
  )
}
