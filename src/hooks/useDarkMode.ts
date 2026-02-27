import { useState, useEffect } from 'react';

export const useDarkMode = () => {
    // Initialize state based on localStorage, defaulting to light mode
    const [isDark, setIsDark] = useState(() => {
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('theme');
            // Check if savedTheme exists and is valid
            if (savedTheme === 'dark') return true;
            if (savedTheme === 'light') return false;

            // Default to light mode (false) if no valid theme is saved
            return false;
        }
        return false;
    });

    useEffect(() => {
        const root = window.document.documentElement;
        if (isDark) {
            root.classList.add('dark');
            root.style.colorScheme = 'dark';
            localStorage.setItem('theme', 'dark');
            console.log('DarkMode: Active');
        } else {
            root.classList.remove('dark');
            root.style.colorScheme = 'light';
            localStorage.setItem('theme', 'light');
            console.log('DarkMode: Inactive');
        }
    }, [isDark]);

    const toggleDarkMode = () => {
        console.log('Toggle called, previous state:', isDark);
        setIsDark((prev) => !prev);
    };

    return { isDark, toggleDarkMode };
};
