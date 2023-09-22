
import './globals.css';
import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google';

const sans = Open_Sans({ subsets: ['latin']});

import Header from '@/components/Header/Header'

import { Provider } from '../utils/ChakraProvider'

export const metadata: Metadata = {
  title: 'NEWStocks',
  description: '주식 밸류체인 뉴스와 주식 복기를 한번에',
  icons: {
    icon: '../public/favicon.ico'
  }
}

export default function RootLayout({
  
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className={sans.className}>
        <Provider>
          <Header />
        </Provider>
          {children}
      </body>
    </html>
  )
}
