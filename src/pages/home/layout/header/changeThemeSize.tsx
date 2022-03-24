import React from 'react'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { createStyles, IconButton, makeStyles, Theme } from '@material-ui/core'
import { FormatSizeSharp } from '@material-ui/icons'
import { useTheme } from '../../store/modules'
import { compose } from 'ramda'

/** class */
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuButton: {
      marginRight: theme.spacing(2)
    }
  })
)

/** 改变主题（ui）大小的功能 */
export default function changeThemeSize() {
  /** 使用预设中的主题大小，设置主题。 */
  const setSizeThemeByPreset = useTheme((state) => state.setSizeThemeByPreset)

  /** 目标锚点，基于这个位置，设置生成的菜单位置 */
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const classes = useStyles()

  /** 打开菜单 */
  const onOpenMenu = compose(setAnchorEl, (e) => e.currentTarget)

  /** 关闭菜单 */
  const onCloseMunu = () => setAnchorEl(null)

  /** 选中菜单 设置大小主题 -> 关闭菜单*/
  const onSelectedItem = compose(onCloseMunu, setSizeThemeByPreset)

  return (
    <div>
      <IconButton
        aria-controls='simple-menu'
        aria-haspopup='true'
        onClick={onOpenMenu}
        edge='start'
        color='inherit'
        className={classes.menuButton}
        aria-label='palette'
      >
        <FormatSizeSharp />
      </IconButton>

      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={onCloseMunu}
      >
        <MenuItem onClick={() => onSelectedItem('large')}>大</MenuItem>
        <MenuItem onClick={() => onSelectedItem('medium')}>中</MenuItem>
        <MenuItem onClick={() => onSelectedItem('small')}>小</MenuItem>
      </Menu>
    </div>
  )
}
