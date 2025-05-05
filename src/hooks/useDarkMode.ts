// src/hooks/useDarkMode.ts
import { useEffect, useState } from 'react'

export default function useDarkMode() {
    const [darkMode, setDarkMode] = useState(false)
    const [hasUserPreference, setHasUserPreference] = useState(false)

    useEffect(() => {
        const savedPreference = localStorage.getItem('darkMode')
        if (savedPreference !== null) {
            setDarkMode(savedPreference === 'true')
            setHasUserPreference(true)
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setDarkMode(true)
        }
    }, [])

    useEffect(() => {
        document.documentElement.classList.toggle('dark', darkMode)
        if (hasUserPreference) {
            localStorage.setItem('darkMode', String(darkMode))
        }
    }, [darkMode, hasUserPreference])

    const toggleDarkMode = () => {
        setDarkMode(!darkMode)
        setHasUserPreference(true)
    }

    return { darkMode, toggleDarkMode }
}