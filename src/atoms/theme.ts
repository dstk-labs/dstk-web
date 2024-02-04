import { atomWithStorage } from 'jotai/utils';

import type { ThemeState } from '@/types/Theme';

export const themeAtom = atomWithStorage<ThemeState['theme']>('theme', 'system');
