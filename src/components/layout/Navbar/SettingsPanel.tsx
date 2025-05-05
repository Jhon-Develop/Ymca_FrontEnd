import { X } from 'lucide-react'
import { useTranslation } from 'next-i18next'

interface SettingsPanelProps {
    isOpen: boolean
    onClose: () => void
    darkMode: boolean
    toggleDarkMode: () => void
    currentLanguage: string
    changeLanguage: (lang: string) => void
}

const SettingsPanel = ({
    isOpen,
    onClose,
    darkMode,
    toggleDarkMode,
    currentLanguage,
    changeLanguage
}: SettingsPanelProps) => {
    const { t } = useTranslation('common')

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
            <div className="bg-ymca-white dark:bg-ymca-blue w-full max-w-sm h-full p-6 shadow-xl">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold font-nunito">{t('settings')}</h3>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-full hover:bg-ymca-blue/10 dark:hover:bg-ymca-white/20"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="space-y-8">
                    <div className="flex items-center justify-between">
                        <span className="font-medium">{t('dark_mode')}</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={darkMode}
                                onChange={toggleDarkMode}
                            />
                            <div className="w-11 h-6 bg-ymca-gray rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-ymca-blue after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-ymca-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                        </label>
                    </div>

                    <div>
                        <label className="block mb-3 font-medium">{t('language')}</label>
                        <div className="flex gap-3">
                            <button
                                onClick={() => changeLanguage('es')}
                                className={`px-4 py-2 rounded-full transition-colors ${
                                    currentLanguage === 'es'
                                        ? 'bg-ymca-blue text-ymca-white'
                                        : 'bg-ymca-gray text-ymca-blue'
                                }`}
                            >
                                Español
                            </button>
                            <button
                                onClick={() => changeLanguage('en')}
                                className={`px-4 py-2 rounded-full transition-colors ${
                                    currentLanguage === 'en'
                                        ? 'bg-ymca-blue text-ymca-white'
                                        : 'bg-ymca-gray text-ymca-blue'
                                }`}
                            >
                                English
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SettingsPanel