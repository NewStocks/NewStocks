'use client'
import styles from './TabsView.module.css'
import TabHeader from './TabHeader/TabHeader'
import TabNotes from './TabNotes/TabNotes'

import { usePathname, useSearchParams } from 'next/navigation';


export default function TabsView() {
  const tabName = useSearchParams();
  const tabcode: string | null = usePathname()
  const code = tabcode.split('/').filter(Boolean)[0];

  console.log(tabName?.get('tab'))

  return (
    <div>
    <TabHeader />
    {tabName?.get('tab') === 'notes' && 
     <TabNotes code={code}/>}

    {tabName?.get('tab') === 'chat' && 
     '여기에 chatbot'}
    </div>
  )
}