import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { useTranslation } from 'next-i18next'

const DesktopMenu = () => {
    const { t } = useTranslation('common')
    const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)

    const menuItems = [
        {
            label: t('about'),
            submenu: [
                { label: t('who_we_are'), href: '/about' },
                { label: t('our_history'), href: '/history' }
            ]
        },
        {
            label: t('programs'),
            submenu: [
                { label: t('volunteering'), href: '/volunteer' },
                { label: t('sustainability'), href: '/sustainability' }
            ]
        },
        { label: t('partners'), href: '/partners' },
        { label: t('donate'), href: '/donate' }
    ]

    return (
        <div className="hidden md:flex gap-8 items-center font-nunito">
            {menuItems.map((item) => (
                <div key={item.label} className="relative group">
                    {item.submenu ? (
                        <>
                            <button
                                className="flex items-center gap-1 hover:text-ymca-orange transition-colors"
                                onMouseEnter={() => setOpenSubmenu(item.label)}
                                onMouseLeave={() => setOpenSubmenu(null)}
                            >
                                {item.label}
                                <ChevronDown className="w-4 h-4" />
                            </button>
                            
                            {openSubmenu === item.label && (
                                <div 
                                    className="absolute top-full left-0 bg-ymca-white dark:bg-ymca-blue shadow-lg rounded-md py-2 min-w-[200px] z-10"
                                    onMouseEnter={() => setOpenSubmenu(item.label)}
                                    onMouseLeave={() => setOpenSubmenu(null)}
                                >
                                    {item.submenu.map((subItem) => (
                                        <Link
                                            key={subItem.label}
                                            href={subItem.href}
                                            className="block px-4 py-2 hover:bg-ymca-blue/10 dark:hover:bg-ymca-white/20 transition-colors"
                                        >
                                            {subItem.label}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </>
                    ) : (
                        <Link
                            href={item.href || '#'}
                            className="hover:text-ymca-orange transition-colors"
                        >
                            {item.label}
                        </Link>
                    )}
                </div>
            ))}
        </div>
    )
}

export default DesktopMenu