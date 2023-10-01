'use client'

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 4
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2
  }
};

type Props = {
  children: React.ReactNode;
  // prop으로 받아오는 children의 타입을 지정할 때 
  // React의 ReactNode라고 지정해주면 된다.
};

export default function MultiCarousel({ children }: Props) {
  return (
    <Carousel 
    // 내가 지정하고 싶은 option들을 prop으로 지정
    infinite // 무한정
    autoPlay // 자동 play
    responsive={responsive} // 위에서 정의한 responsive
	itemClass="m-2" // 각 아이템 별로 class 지정 
	>
      {children}
    </Carousel>
  );
}