// src/pages/donate.tsx
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Donaciones from '@/features/Donations';

export default function DonatePage() {
    return (
        <div className="bg-ymca-white dark:bg-ymca-blue/90 py-12 min-h-[calc(100vh-80px)]">
            <div className="container mx-auto px-4">
                <Donaciones />
            </div>
        </div>
    );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale ?? 'es', ['common'])),
    },
});