import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import {Inter} from "next/font/google"
import { ChakraProvider } from '@chakra-ui/react'

const inter = Inter({subsets: ['latin']});

export default function App({ Component, pageProps }: AppProps) {
  return ( 
    <ChakraProvider>
      <main className={`${inter.className}`}>
        <Component {...pageProps} />
      </main>
    </ChakraProvider>
    )
}
