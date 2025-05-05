// src/pages/_app.tsx
import { appWithTranslation } from 'next-i18next'
import type { AppProps } from 'next/app'
import 'aos/dist/aos.css';
import AOS from 'aos';
import { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar/Navbar'
import '../styles/globals.css'
import { ProgressBar } from '@/components/ui/ProgressBar';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    AOS.init({
      duration: 300,
      easing: 'ease-out-quad',
      once: false,
      mirror: true,
      offset: 10
    });
    AOS.refresh();
  }, []);
  return (
    <div className="min-h-screen flex flex-col">
      <ProgressBar/>
      <Navbar />
      <main className="flex-grow">
        <Component {...pageProps} />
      </main>
    </div>
  )
}

export default appWithTranslation(MyApp)