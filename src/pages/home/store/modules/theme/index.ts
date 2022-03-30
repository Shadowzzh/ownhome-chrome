import createStore, { SetState } from 'zustand'
import { storageSync } from '@/utils/storage'
import { GLOHAL_THEME } from '@/utils/storage/constant'
import { createTheme, Theme, ThemeOptions } from '@material-ui/core'
import { ThemeSizePreset, themeSizePreset } from './preset'
import { compose } from 'ramda'

interface ThemeState {
  theme: Theme
}

type Size = keyof ThemeSizePreset

/** 保存主题到 storage 中 */
const saveThemeToStorage = (theme: ThemeOptions) => {
  storageSync.set({ [GLOHAL_THEME]: theme })
  return theme
}

/** 根据 Size 获取预设的主题配置 */
const getSizeThemeByPreset = (size: Size) => ({
  props: themeSizePreset[size]
})

function useTheme(set: SetState<ThemeState>) {
  let theme = createTheme({ props: {} })

  /** 设置主题 */
  const setTheme = (theme: Theme) => set((state) => ({ ...state, theme }))

  /** 使用预设中的主题大小，设置主题。 */
  const setSizeThemeByPreset = compose(
    setTheme,
    createTheme,
    saveThemeToStorage,
    getSizeThemeByPreset
  )

  /** 初始化时用 storage 中的数据 */
  storageSync.get(GLOHAL_THEME).then(({ GLOHAL_THEME: globalTheme }) => {
    let theme = createTheme({ props: globalTheme.props })
    globalTheme && setTheme(theme)
  })

  return {
    /** 主题 */
    theme,
    /** 使用预设中的主题大小，设置主题。 */
    setSizeThemeByPreset
  }
}

export default createStore(useTheme)
