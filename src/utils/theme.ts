/**
 * Theme utility functions for managing dark/light mode
 */

export type Theme = 'dark' | 'light';

/**
 * Get the current theme from the document
 */
export const getTheme = (): Theme => {
    const theme = document.documentElement.getAttribute('data-theme');
    return (theme as Theme) || 'light'; // Default to light
};

/**
 * Set the theme on the document
 */
export const setTheme = (theme: Theme): void => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
};

/**
 * Toggle between dark and light themes
 */
export const toggleTheme = (): Theme => {
    const currentTheme = getTheme();
    const newTheme: Theme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    return newTheme;
};

/**
 * Initialize theme from localStorage or system preference
 */
export const initializeTheme = (): void => {
    // Check localStorage first
    const savedTheme = localStorage.getItem('theme') as Theme | null;

    if (savedTheme) {
        setTheme(savedTheme);
        return;
    }

    // Check system preference, default to light
    const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
    ).matches;
    setTheme(prefersDark ? 'dark' : 'light');
};

