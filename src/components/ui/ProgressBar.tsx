// components/ui/ProgressBar.tsx
'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// Configuración global de NProgress (colores, tamaño, etc.)
// NProgress.configure({
//     minimum: 0.3,
//     easing: 'ease',
//     speed: 500,
//     showSpinner: false,
//     template: '<div class="bar" role="bar" style="background: var(--color-ymca-green); height: 3px;"></div>'
// });

export const ProgressBar = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        let timer: NodeJS.Timeout;

        const startProgress = () => {
            NProgress.start();
            // Forzar finalización si tarda demasiado
            timer = setTimeout(() => NProgress.done(), 5000);
        };

        const completeProgress = () => {
            clearTimeout(timer);
            NProgress.done();
        };

        // Iniciar progreso al cambiar de ruta
        startProgress();

        // Completar progreso después de un pequeño retraso
        const finishTimer = setTimeout(() => {
            completeProgress();
        }, 300);

        return () => {
            clearTimeout(finishTimer);
            completeProgress();
        };
    }, [pathname, searchParams]);

    return null;
};