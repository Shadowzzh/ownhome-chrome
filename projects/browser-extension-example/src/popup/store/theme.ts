import { ThemeOptions, createTheme } from '@mui/material'
import { themeOptions } from '../../styles/theme'
import { create } from 'zustand'
import { defaultThemeOptions } from '../../styles/theme'

type ThemeMode = 'dark' | 'light'

interface ThemeState {
    themeOptions: ThemeOptions
    setThemeOptions: (themeOptions: ThemeOptions) => void
    setThemeMode: (mode: ThemeMode) => void
}

export const useThemeStore = create<ThemeState>()((set) => ({
    themeOptions: themeOptions,
    setThemeOptions: () => set((state) => ({ themeOptions: state.themeOptions })),
    setThemeMode: (themeMode) => {
        set((state) => {
            state.themeOptions = createTheme({
                palette: {
                    ...defaultThemeOptions.palette,
                    mode: themeMode
                }
            })

            return { themeOptions: state.themeOptions }
        })
    }
}))
