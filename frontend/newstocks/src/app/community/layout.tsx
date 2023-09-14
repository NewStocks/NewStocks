import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google';
import '../globals.css';
import styles from './community.module.css'

import Header from '@/components/Header/Header'
import CommunityNav from '@/components/CommunityNav/CommunityNav'

const sans = Open_Sans({ subsets: ['latin']});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
        {/* <Header /> */}

        <div className={styles["community-container"]}>
          <div className={styles["community-nav"]}>
            <div className={styles["community-nav-sticky"]}>
              <CommunityNav />
            </div>
          </div>

          <div className={styles["community-content"]}>
            {children}
          </div>
        </div>

    </>
  )
}
