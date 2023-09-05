import Image from 'next/image'
import styles from './page.module.css'
import Chart from '@/components/chart/chart'

export default function Home() {
  return (
    <div>
        <Chart />
      <main className={styles.main}>여기가 메인페이지 입니다</main>
    </div>
  )
}
