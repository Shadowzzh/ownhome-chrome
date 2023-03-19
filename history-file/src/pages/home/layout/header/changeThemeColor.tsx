import React, { useState } from 'react'
import {
  createStyles,
  IconButton,
  makeStyles,
  Menu,
  Theme
} from '@material-ui/core'
import { Palette } from '@material-ui/icons'
import { useTheme } from '../../store/modules'
import { compose } from 'ramda'
import { ColorBox, ColorValue, Color } from 'material-ui-color'

/** 默认调色板 */
const DEFAULT_PAlETTE = Object.freeze({
  ['深紫']: '#673ab7',
  ['紫']: '#d500f9',
  ['红']: '#ff1744',
  ['粉红']: '#f50057',
  ['靛蓝']: '#3d5afe',
  ['蓝色']: '#2979ff',
  ['淡蓝']: '#00b0ff',
  ['青色']: '#00e5ff',
  ['蓝绿']: '#009688',
  ['绿']: '#4caf50',
  ['淡绿']: '#8bc34a',
  ['绿黄']: '#cddc39',
  ['黄']: '#ffeb3b',
  ['黄褐']: '#ffc107',
  ['橙']: '#ff9800',
  ['深橙']: '#ff5722',
  ['黑']: '#000000',
  ['深灰']: '#4b4b4b'
})

/** class */
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuButton: {
      marginRight: theme.spacing(2)
    }
  })
)

/** 改变主题（ui）大小的功能 */
export default function changeThemeColor() {
  /** 使用预设中的主题大小，设置主题。 */
  const setSizeThemeByPreset = useTheme((state) => state.setSizeThemeByPreset)
  const [value, setValue] = useState<ColorValue | undefined>(undefined)

  /** 目标锚点，基于这个位置，设置生成的菜单位置 */
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const classes = useStyles()

  /** 打开菜单 */
  const onOpenMenu = compose(setAnchorEl, (e) => e.currentTarget)

  /** 关闭菜单 */
  const onCloseMunu = () => setAnchorEl(null)

  /** 选中菜单 设置大小主题 -> 关闭菜单*/
  const onSelectedColor = (e: Color) => {
    const { value } = e
    setValue(value)
  }

  return (
    <div>
      <IconButton
        onMouseEnter={onOpenMenu}
        color='inherit'
        className={classes.menuButton}
      >
        <Palette />
      </IconButton>

      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={onCloseMunu}
      >
        <div onMouseLeave={onCloseMunu}>
          <ColorBox
            defaultValue='transparent'
            value={value}
            palette={DEFAULT_PAlETTE}
            onChange={onSelectedColor}
          />
        </div>
      </Menu>
    </div>
  )
}
