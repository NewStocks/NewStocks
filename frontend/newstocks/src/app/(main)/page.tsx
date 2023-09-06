import Image from 'next/image'
import styles from './page.module.css'
import Chart from '@/components/chart/chart'
import MainTabsPage from './[tab]/page'


export default function Home() {

  const tab = '1'

  return (
    <div className='components'>
        <Chart />
        <MainTabsPage params={{ tab }} />
      <main className={styles.main}>여기가 메인페이지 입니다</main>
    </div>
  )
}
