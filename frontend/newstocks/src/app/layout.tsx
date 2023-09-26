
import './globals.css';
import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google';
import Script from 'next/script';

import Link from 'next/link'

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
          <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-0JQQ2BY563"
          strategy="beforeInteractive"
        />

        <Script
          strategy="afterInteractive"
        >
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-0JQQ2BY563');
          `}
        </Script>

      </body>
    </html>
  )
}
