import { useState, useEffect } from 'react';

export const useSidebarCollapse = () => {
    // Initialize state based on localStorage, defaulting to expanded
    const [isCollapsed, setIsCollapsed] = useState(() => {
        if (typeof window !== 'undefined') {
            const savedState = localStorage.getItem('sidebarCollapsed');
            if (savedState !== null) {
                return savedState === 'true';
            }
            // Default to expanded (false)
            return false;
        }
        return false;
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('sidebarCollapsed', String(isCollapsed));
        }
    }, [isCollapsed]);

    const toggleSidebar = () => setIsCollapsed((prev) => !prev);

    return { isCollapsed, toggleSidebar, setIsCollapsed };
};
