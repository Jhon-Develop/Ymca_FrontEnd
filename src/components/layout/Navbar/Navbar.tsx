import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ChevronDown, Settings, X, Menu } from "lucide-react";
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

const Navbar = () => {
    const [showConocenos, setShowConocenos] = useState(false);
    const [showProgramas, setShowProgramas] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [hasUserPreference, setHasUserPreference] = useState(false);
    const { t, i18n } = useTranslation('common');
    const router = useRouter();

    // Inicializar AOS para componentes dinámicos
    useEffect(() => {
        const initializeAOS = async () => {
            if (typeof window !== 'undefined') {
                const AOS = (await import('aos')).default;
                AOS.init({
                    duration: 400,
                    easing: 'ease-in-out',
                    once: false,
                    mirror: true,
                });
                
                // Refrescar AOS cuando cambian los estados
                AOS.refresh();
            }
        };

        initializeAOS();
    }, [showConocenos, showProgramas, mobileMenuOpen, settingsOpen]);

    // Modo oscuro
    useEffect(() => {
        const savedPreference = localStorage.getItem('darkMode');
        if (savedPreference !== null) {
            setDarkMode(savedPreference === 'true');
            setHasUserPreference(true);
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setDarkMode(true);
        }

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handler = (e: MediaQueryListEvent) => {
            if (!hasUserPreference) setDarkMode(e.matches);
        };
        mediaQuery.addEventListener('change', handler);
        return () => mediaQuery.removeEventListener('change', handler);
    }, [hasUserPreference]);

    useEffect(() => {
        document.documentElement.classList.toggle('dark', darkMode);
        if (hasUserPreference) {
            localStorage.setItem('darkMode', String(darkMode));
        }
    }, [darkMode, hasUserPreference]);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        setHasUserPreference(true);
    };

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        router.push(router.asPath, undefined, { locale: lng, scroll: false });
    };

    return (
        <nav className="bg-ymca-gray dark:bg-ymca-blue text-ymca-blue dark:text-ymca-white px-6 py-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <Image
                        src="/images/Ymca_blue.svg"
                        alt="Logo light"
                        width={100}
                        height={40}
                        className="block dark:hidden"
                    />
                    <Image
                        src="/images/Ymca_white.svg"
                        alt="Logo dark"
                        width={100}
                        height={40}
                        className="hidden dark:block"
                    />
                </Link>

                {/* Menú principal (desktop) */}
                <div className="hidden md:flex gap-14 items-center relative font-nunito font-semibold">
                    <div
                        className="relative group"
                        onMouseEnter={() => setShowConocenos(true)}
                        onMouseLeave={() => setShowConocenos(false)}
                    >
                        <button className="flex items-center gap-1">
                            {t('about')} <ChevronDown size={16} />
                        </button>
                        {showConocenos && (
                            <div 
                                className="absolute top-full left-0 bg-ymca-blue dark:bg-ymca-white rounded shadow-md p-5 space-y-2 z-10 text-ymca-white dark:text-ymca-blue flex flex-col w-fit min-w-max"
                                data-aos="fade-rigth"
                                data-aos-duration="400"
                                
                            >
                                <Link
                                    href="/about"
                                    className="whitespace-nowrap hover:bg-ymca-white/20 dark:hover:bg-ymca-blue/20 px-2 py-1 rounded transition-colors duration-200"
                                >
                                    {t('who_we_are')}
                                </Link>
                                <Link
                                    href="/history"
                                    className="whitespace-nowrap hover:bg-ymca-white/20 dark:hover:bg-ymca-blue/20 px-2 py-1 rounded transition-colors duration-200"
                                >
                                    {t('our_history')}
                                </Link>
                            </div>
                        )}
                    </div>

                    <div
                        className="relative group"
                        onMouseEnter={() => setShowProgramas(true)}
                        onMouseLeave={() => setShowProgramas(false)}
                    >
                        <button className="flex items-center gap-1">
                            {t('programs')} <ChevronDown size={16} />
                        </button>
                        {showProgramas && (
                            <div 
                                className="absolute top-full left-0 bg-ymca-blue dark:bg-ymca-white rounded shadow-md p-3 space-y-2 z-10 text-ymca-white dark:text-ymca-blue flex flex-col"
                                data-aos="fade-rigth"
                                data-aos-duration="250"
                            >
                                <Link
                                    href="/volunteer"
                                    className="whitespace-nowrap hover:bg-ymca-white/20 dark:hover:bg-ymca-blue/20 px-2 py-1 rounded transition-colors duration-200"
                                >
                                    {t('volunteering')}
                                </Link>
                                <Link
                                    href="/sustainability"
                                    className="whitespace-nowrap hover:bg-ymca-white/20 dark:hover:bg-ymca-blue/20 px-2 py-1 rounded transition-colors duration-200"
                                >
                                    {t('sustainability')}
                                </Link>
                            </div>
                        )}
                    </div>

                    <Link href="/partners" className="hover:text-ymca-orange transition-colors">
                        {t('partners')}
                    </Link>
                    <Link href="/donate" className="hover:text-ymca-orange transition-colors">
                        {t('donate')}
                    </Link>
                </div>

                {/* Configuración */}
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <button
                            onClick={() => setSettingsOpen(!settingsOpen)}
                            className="p-2 rounded-full hover:bg-ymca-blue/10 dark:hover:bg-ymca-white/20 transition-colors"
                        >
                            <Settings size={20} />
                        </button>

                        {settingsOpen && (
                            <div 
                                className="absolute top-full right-0 bg-ymca-white dark:bg-ymca-blue rounded shadow-lg p-4 w-64 z-50 border border-ymca-blue/10 dark:border-ymca-white/10"
                                data-aos="fade-rigth"
                                data-aos-duration="200"
                            >
                                <div className="flex justify-between items-center mb-3">
                                    <h3 className="font-semibold">{t('settings')}</h3>
                                    <button
                                        onClick={() => setSettingsOpen(false)}
                                        className="p-1 hover:bg-ymca-blue/10 dark:hover:bg-ymca-white/20 rounded"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span>{t('dark_mode')}</span>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                className="sr-only peer"
                                                checked={darkMode}
                                                onChange={toggleDarkMode}
                                            />
                                            <div className="w-11 h-6 bg-ymca-blue/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-ymca-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-ymca-white after:border-ymca-blue after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-ymca-white/20"></div>
                                        </label>
                                    </div>

                                    <div>
                                        <label className="block mb-2 text-sm font-medium">{t('language')}</label>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => changeLanguage('es')}
                                                className={`px-2 py-0.5 rounded ${i18n.language === 'es' ? 'bg-ymca-blue text-ymca-white dark:bg-ymca-white dark:text-ymca-blue' : 'bg-ymca-blue/10 dark:bg-ymca-white/10'}`}
                                            >
                                                🇪🇸
                                            </button>
                                            <button
                                                onClick={() => changeLanguage('en')}
                                                className={`px-2 py-0.5 rounded ${i18n.language === 'en' ? 'bg-ymca-blue text-ymca-white dark:bg-ymca-white dark:text-ymca-blue' : 'bg-ymca-blue/10 dark:bg-ymca-white/10'}`}
                                            >
                                                🇺🇸
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Menú móvil */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 rounded-full hover:bg-ymca-blue/10 dark:hover:bg-ymca-white/20 transition-colors"
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Menú móvil desplegable */}
            {mobileMenuOpen && (
                <div 
                    className="md:hidden bg-ymca-white dark:bg-ymca-blue shadow-lg mt-2 py-3 px-4"
                    data-aos="fade-down"
                    data-aos-duration="300"
                >
                    <div className="space-y-3 font-semibold">
                        <div className="relative">
                            <button
                                onClick={() => setShowConocenos(!showConocenos)}
                                className="flex items-center justify-between w-full py-2"
                            >
                                <span>{t('about')}</span>
                                <ChevronDown size={16} className={`transition-transform ${showConocenos ? 'rotate-180' : ''}`} />
                            </button>
                            {showConocenos && (
                                <div 
                                    className="pl-4 space-y-2 mt-2"
                                    data-aos="fade-down"
                                    data-aos-duration="200"
                                >
                                    <Link
                                        href="/about"
                                        className="block py-1 hover:bg-ymca-blue/10 dark:hover:bg-ymca-white/20 px-2 rounded transition-colors"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {t('who_we_are')}
                                    </Link>
                                    <Link
                                        href="/history"
                                        className="block py-1 hover:bg-ymca-blue/10 dark:hover:bg-ymca-white/20 px-2 rounded transition-colors"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {t('our_history')}
                                    </Link>
                                </div>
                            )}
                        </div>

                        <div className="relative">
                            <button
                                onClick={() => setShowProgramas(!showProgramas)}
                                className="flex items-center justify-between w-full py-2"
                            >
                                <span>{t('programs')}</span>
                                <ChevronDown size={16} className={`transition-transform ${showProgramas ? 'rotate-180' : ''}`} />
                            </button>
                            {showProgramas && (
                                <div 
                                    className="pl-4 space-y-2 mt-2"
                                    data-aos="fade-down"
                                    data-aos-duration="200"
                                >
                                    <Link
                                        href="/volunteer"
                                        className="block py-1 hover:bg-ymca-blue/10 dark:hover:bg-ymca-white/20 px-2 rounded transition-colors"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {t('volunteering')}
                                    </Link>
                                    <Link
                                        href="/sustainability"
                                        className="block py-1 hover:bg-ymca-blue/10 dark:hover:bg-ymca-white/20 px-2 rounded transition-colors"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {t('sustainability')}
                                    </Link>
                                </div>
                            )}
                        </div>

                        <Link
                            href="/partners"
                            className="block py-2 hover:bg-ymca-blue/10 dark:hover:bg-ymca-white/20 px-2 rounded transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {t('partners')}
                        </Link>
                        <Link
                            href="/donate"
                            className="block py-2 hover:bg-ymca-blue/10 dark:hover:bg-ymca-white/20 px-2 rounded transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {t('donate')}
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;