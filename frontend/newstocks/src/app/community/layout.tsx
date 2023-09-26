import '../globals.css';
import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google';
import styles from './community.module.css'

import Header from '@/components/Header/Header'
import CommunityNav from '@/components/CommunityNav/CommunityNav'
import Footer from '@/components/Footer/Footer'

import { Provider } from '@/utils/ChakraProvider'

const sans = Open_Sans({ subsets: ['latin']});

export const metadata: Metadata = {
  title: '오답노트 커뮤니티 | NEWStocks',
  description: '주식 오답노트를 저장하고 공유하세요',
}

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className={styles["community-container"]}>
        <div className={styles["community-nav"]}>
          <div className={styles["community-nav-sticky"]}>
            <Provider>
              <CommunityNav />
            </Provider>
          </div>
        </div>

        <div className={styles["community-content"]}>
          {children}
        </div>
      </div>

      <Footer />
    </>
  )
}
