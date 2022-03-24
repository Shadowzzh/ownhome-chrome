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

  /** 设置主题 */
  const setTheme = (theme: Theme) => set((state) => ({ ...state, theme }))

  /** 根据 Size 获取预设的主题配置 */
  const getSizeThemeByPreset = (size: Size) => ({
    props: themeSizePreset[size]
  })

  const setSizeThemeByPreset = compose(
    setTheme,
    createTheme,
    getSizeThemeByPreset
  )

  return {
    /** 主题 */
    theme,
    /** 使用预设中的主题大小，设置主题。 */
    setSizeThemeByPreset
  }
}

export default createStore(useTheme)
