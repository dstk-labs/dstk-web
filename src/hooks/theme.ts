import { useEffect } from 'react';
import { useAtom } from 'jotai';

import { themeAtom } from '@/atoms';
import type { Theme } from '@/types/Theme';

export const useTheme = () => {
    const [theme, setTheme] = useAtom(themeAtom);

    useEffect(() => {
        const root = window.document.documentElement;

        root.classList.remove('light', 'dark');

        if (theme === 'system') {
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
                ? 'dark'
                : 'light';

            root.classList.add(systemTheme);
            return;
        }

        root.classList.add(theme);
    }, [theme]);

    return {
        theme,
        setTheme: (theme: Theme) => setTheme(theme),
    };
};
