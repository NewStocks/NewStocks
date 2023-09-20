import styles from './allcardsimage.module.css'

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import CardSample from '../CardSample/CardSample'

import { FaSortAmountDown } from 'react-icons/fa'

export default function AllCardsImage() {
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
        arrows
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
              min: 1024
            },
            items: 3,
            partialVisibilityGutter: 40
          },
          mobile: {
            breakpoint: {
              max: 464,
              min: 0
            },
            items: 1,
            partialVisibilityGutter: 30
          },
          tablet: {
            breakpoint: {
              max: 1024,
              min: 464
            },
            items: 2,
            partialVisibilityGutter: 30
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
        <CardSample />
        <CardSample />
        <CardSample />
        <CardSample />
        <CardSample />
      </Carousel>
    </div>
  )
}