import type { ThemeOptions } from '@mui/material'
import { themeOptions } from '../../styles/theme'
import { create } from 'zustand'
import { produce } from 'immer'

type ThemeMode = 'dark' | 'light'

interface ThemeState {
    themeOptions: ThemeOptions
    setThemeOptions: (themeOptions: ThemeOptions) => void
    setThemeMode: (mode: ThemeMode) => void
}

export const useThemeStore = create<ThemeState>()((set) => ({
    themeOptions: themeOptions,
    setThemeOptions: () => set((state) => ({ themeOptions: state.themeOptions })),
    setThemeMode: (themeMode) =>
        set(
            produce((state: ThemeState) => {
                if (!state.themeOptions.palette) return
                state.themeOptions.palette.mode = themeMode
            })
        )
}))
