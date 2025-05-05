// src/pages/index.tsx
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export default function Home() {
  return (
    <div className="container mx-auto h-screen px-4 py-8 bg-ymca-white dark:bg-ymca-blue/90">
      <h1 className="text-3xl font-bold dark:text-ymca-white text-ymca-black">Bienvenido</h1>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', ['common'])),
  },
})