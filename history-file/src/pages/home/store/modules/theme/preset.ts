import { ComponentsProps } from '@material-ui/core/styles/props'

export interface ThemeSizePreset {
  small: ComponentsProps | undefined
  medium: ComponentsProps | undefined
  large: ComponentsProps | undefined
}

export const themeSizePreset: ThemeSizePreset = {
  // 小
  small: {
    MuiIconButton: {
      size: 'small'
    },
    MuiIcon: {
      fontSize: 'small'
    },
    MuiToolbar: {
      variant: 'dense'
    }
  },
  // 中
  medium: {
    MuiIconButton: {
      size: 'medium'
    },
    MuiIcon: {
      fontSize: 'medium'
    }
  },
  // 大
  large: {
    MuiIconButton: {
      size: 'medium'
    },
    MuiIcon: {
      fontSize: 'large'
    }
  }
}
