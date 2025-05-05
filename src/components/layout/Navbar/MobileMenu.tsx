import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useTranslation } from 'next-i18next'

interface MobileMenuProps {
    isOpen: boolean
    onClose: () => void
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
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

    if (!isOpen) return null

    return (
        <div className="md:hidden bg-ymca-white dark:bg-ymca-blue shadow-lg">
            <div className="container mx-auto px-4 py-3">
                {menuItems.map((item) => (
                    <div key={item.label} className="border-b border-ymca-gray dark:border-ymca-blue/20 last:border-0">
                        {item.submenu ? (
                            <>
                                <button
                                    className="w-full flex justify-between items-center py-3 px-2"
                                    onClick={() => 
                                        setOpenSubmenu(openSubmenu === item.label ? null : item.label)
                                    }
                                >
                                    <span>{item.label}</span>
                                    {openSubmenu === item.label ? (
                                        <ChevronUp className="w-5 h-5" />
                                    ) : (
                                        <ChevronDown className="w-5 h-5" />
                                    )}
                                </button>
                                
                                {openSubmenu === item.label && (
                                    <div className="pl-4 pb-2">
                                        {item.submenu.map((subItem) => (
                                            <Link
                                                key={subItem.label}
                                                href={subItem.href}
                                                className="block py-2 px-2 hover:bg-ymca-blue/10 dark:hover:bg-ymca-white/20 rounded transition-colors"
                                                onClick={onClose}
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
                                className="block py-3 px-2 hover:bg-ymca-blue/10 dark:hover:bg-ymca-white/20 rounded transition-colors"
                                onClick={onClose}
                            >
                                {item.label}
                            </Link>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MobileMenu