
import './globals.css';
import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google';

const sans = Open_Sans({ subsets: ['latin']});

import Header from '@/components/Header/Header'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className={sans.className}>
        <Header />
        {children}
      </body>
    </html>
  )
}
