'use client'
import styles from './TabsView.module.css'
import TabHeader from './TabHeader/TabHeader'

import { usePathname, useSearchParams } from 'next/navigation';
import Chat from './Chat/Chat';

export default function TabsView() {
  const tabName = useSearchParams();

  console.log(tabName?.get('tab'))

  return (
    <div className={styles['tab-container']}>
    <TabHeader />
    {tabName?.get('tab') === 'chat' && 
     <Chat />}
    </div>
  )
}
