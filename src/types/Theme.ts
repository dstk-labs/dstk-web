export type Theme = 'dark' | 'light' | 'system';

export type ThemeState = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
};
