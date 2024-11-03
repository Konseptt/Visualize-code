import { useState, useEffect } from 'react';

/**
 * Custom hook to check if the current window width is less than 768 pixels.
 * This hook listens for window resize events and updates the state accordingly.
 *
 * @returns {boolean} - Returns true if the window width is less than 768 pixels, otherwise false.
 */
export const useCheckMobile = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
    };

    useEffect(() => {
        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return isMobile;
};
