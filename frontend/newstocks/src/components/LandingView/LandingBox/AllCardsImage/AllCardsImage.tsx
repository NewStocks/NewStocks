import styles from './allcardsimage.module.css'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import CardSample from '../CardSample/CardSample'
import { FaSortAmountDown } from 'react-icons/fa'

interface CardData {
  title: string;
  content: string;
  author: string;
  stock: string;
}

export default function AllCardsImage() {

  const cardData: CardData[] = [
    { title: '제목 1', content: '내용 1', author: '작성자 1', stock: '카카오' },
    { title: '제목 2', content: '내용 2', author: '작성자 2', stock: '삼성전자' },
    { title: '제목 3', content: '내용 3', author: '작성자 3', stock: 'Naver' },
    { title: '제목 4', content: '내용 4', author: '작성자 4', stock: '카카오' },
    { title: '제목 5', content: '내용 5', author: '작성자 5', stock: 'LG전자' }
  ];

  return (
    <div className={styles["image-container"]}>

      <div className={styles["sort-button-box"]}>
        <div>
          <div className={styles["button"]}>🔥인기노트</div>
          <div className={styles["button"]}>🔎 종목선택</div>
        </div>

        <div className={styles["button"]}>최신순<FaSortAmountDown id={styles["button-icon"]}/></div>
      </div>
      <Carousel
        additionalTransfrom={0}
        arrows={false}
        autoPlay
        autoPlaySpeed={2500}
        centerMode={false}
        className=""
        containerClass="container-with-dots"
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite
        itemClass=""
        keyBoardControl
        minimumTouchDrag={80}
        pauseOnHover
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        responsive={{
          desktop: {
            breakpoint: {
              max: 3000,
              min: 1600
            },
            items: 4,
            partialVisibilityGutter: 25
          },
          mobile: {
            breakpoint: {
              max: 1080,
              min: 0
            },
            items: 2,
            partialVisibilityGutter: 25
          },
          tablet: {
            breakpoint: {
              max: 1600,
              min: 1080
            },
            items: 3,
            partialVisibilityGutter: 25
          }
        }}
        rewind={false}
        rewindWithAnimation={false}
        rtl={false}
        shouldResetAutoplay
        showDots={false}
        sliderClass=""
        slidesToSlide={2}
        swipeable
      >
        {cardData.map(({ title, content, author, stock }, index) => (
          <CardSample
            key={index}
            title={title}
            content={content}
            author={author}
            stock={stock}
          />
        ))}
      </Carousel>
    </div>
  )
}