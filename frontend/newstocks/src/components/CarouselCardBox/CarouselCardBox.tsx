import MultiCarousel from '@/components/MultiCarousel/MultiCarousel'
import CarouselCard from '@/components/MultiCarousel/CarouselCard/CarouselCard'

import { Post } from '@/services/posts'

type Props = {
  posts: Post[]
}

export default function CarouselCardBox({posts}: Props) {
  return(
    <MultiCarousel>
      {posts.map((post, index) => {
        return <CarouselCard key={index} post={post}/>
      })}
    </MultiCarousel>
  );

}