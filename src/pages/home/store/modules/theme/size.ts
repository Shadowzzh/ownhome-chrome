import { createTheme, Theme } from '@material-ui/core'
import { ThemeSizePreset, themeSizePreset } from './preset'
import createStore, { SetState } from 'zustand'
import { compose } from 'ramda'

interface ThemeState {
  theme: Theme
}

type Size = keyof ThemeSizePreset

function useTheme(set: SetState<ThemeState>) {
  const theme = createTheme({ props: {} })

  const setTheme = (theme: Theme) => set((state) => ({ ...state, theme }))

  const getSizeThemeByPreset = (size: Size) => ({
    props: themeSizePreset[size]
  })

  const setSizeThemeByPreset = compose(
    setTheme,
    createTheme,
    getSizeThemeByPreset
  )

  return { theme, setSizeThemeByPreset }
}

export default createStore(useTheme)
