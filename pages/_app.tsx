import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import {Inter} from "next/font/google";
import { ChakraProvider } from '@chakra-ui/react';
import { getCurrentUser } from '@/aws/awsCognito';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
// Headers
import LoggedOutHeader from '@/component/LoggedOutHeader/LoggedOutHeader';
import LoggedInHeader from '@/component/LoggedInHeader/LoggedInHeader';

const inter = Inter({subsets: ['latin']});

export default function App({ Component, pageProps }: AppProps) {

  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    getCurrentUser()
      .then(() => {
        setIsLoggedIn(true);
      })
      .catch(() => {
        setIsLoggedIn(false);
      })
  }, [router.pathname])

  return ( 
    <ChakraProvider>
        <main className={`${inter.className}`}>
          {isLoggedIn && (router.pathname !== "/")  ? <LoggedInHeader /> : <LoggedOutHeader />}
          <Component {...pageProps} />
        </main>
    </ChakraProvider>
    )
}
