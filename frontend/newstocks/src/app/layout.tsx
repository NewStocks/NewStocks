
import './globals.css';
import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google';
import Script from 'next/script';
import Link from 'next/link'
import Head from 'next/head'
import NEWStocksSample from '../../../public/sample_image.png';

import RecoilRootWrapper from '@/recoil/wrapper/RecoilRootWrapper';
import Header from '@/components/Header/Header'

import { Provider } from '../utils/ChakraProvider'

const sans = Open_Sans({ subsets: ['latin']});
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
  const ogImageUrl = '/images/sample_image.png';

  return (
    <html lang="en">
      <Head>
        <title>NEWStocks | 주식 밸류체인 뉴스와 주식 복기를 한번에</title>
        <meta property="og:title" content="NEWStocks | 뉴스탁스" />
        <meta property="og:description" content="주식 밸류체인 뉴스와 주식 복기를 한번에" />
        <meta property="og:url" content="https://www.newstocks.kr/" />
        <meta property="og:image" content={ogImageUrl} />
      </Head>
      <body className={sans.className}>
        <RecoilRootWrapper>
          <Provider>
            <Header />
            {children}
          </Provider>
        </RecoilRootWrapper>

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-0JQQ2BY563"
          strategy="beforeInteractive"
        />

        <Script
          id="googleAnalytics"
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
